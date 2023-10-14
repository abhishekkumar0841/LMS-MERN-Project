import User from "../models/user.model.js";
import AppError from "../utils/error.utils.js";
import cloudinary from 'cloudinary'
import fs from 'fs/promises'

const cookieOptions = {
  maxAge: 24 * 60 * 60 * 1000,
  httpOnly: true,
  // secure: true,
};

const register = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return next(new AppError("All fields are required", 400));
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return next(new AppError("Email already exists!", 400));
    }

    const user = new User({
      fullName,
      email,
      password,
      avatar: {
        public_id: email,
        secure_url:
          "https://res.cloudinary.com/dzfftge5f/image/upload/v1695289023/abhishek/irg9aow0hs7qkzatgytw.png",
      },
    });

    if (!user) {
      return next(
        new AppError("User registration failed, Please try again!", 400)
      );
    }

    //here if we get file from req.file then upload it on cloudinary 
    console.log("fileDetails-->>",req.file)
    if(req.file){
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: 'lms',
          width: 250,
          height: 250,
          gravity: 'faces',
          crop: 'fill'
        });

        //after getting result modify the user.avatar.public_id to result.public_id
        if(result){
          user.avatar.public_id = result.public_id;
          user.avatar.secure_url = result.secure_url;

          //removing file from server after uploaded on cloudinary
          fs.rm(`uploads/${req.file.filename}`)
        }

      } catch (error) {
        return next(
          new AppError(error || 'File not uploaded, try again!', 500)
        );
      }
    }
    
    await user.save();

    user.password = undefined;

    const token = await user.generateJWTToken();

    // setting token to cookie
    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      success: true,
      message: "User registered successfully",
      user,
      token
    });
  } catch (error) {
    console.log(error);
    return next(new AppError(error.message, 500));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("All fields are required!", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !user.comparePassword(password)) {
      return next(new AppError("Email or Password does not matched!", 400));
    }

    const token = await user.generateJWTToken();
    user.password = undefined;

    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return next(new AppError(error.message, 500));
  }
};

const logout = (req, res) => {
  res.cookie("token", null, {
    secure: true,
    maxAge: 0,
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
};

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    res.status(200).json({
        success: true,
        message: "User details",
        user
    })
  } catch (error) {
    return next(new AppError("Failed to fetch user details!", 500))
  }
};

export { register, login, logout, getProfile };
