import User from "../models/user.model.js";
import AppError from "../utils/error.utils.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";
import { resetPassTemplate } from "../htmlTemplates/resetPassTemplate.js";
import userSignupTemplate from "../htmlTemplates/userSignupTemplate.js";

const cookieOptions = {
  maxAge: 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: true,
  // sameSite: "None",
};

//*****register Controller *****
const register = async (req, res, next) => {
  try {
    const { fullName, email, password, role } = req.body;

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
      role,
      avatar: {
        public_id: email,
        secure_url: `https://api.dicebear.com/5.x/initials/svg?seed=${fullName}`,
      },
    });

    if (!user) {
      return next(
        new AppError("User registration failed, Please try again!", 400)
      );
    }

    //here if we get file from req.file then upload it on cloudinary
    console.log("fileDetails-->>", JSON.stringify(req.file));
    if (req.file) {
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "lms",
          width: 250,
          height: 250,
          gravity: "faces",
          crop: "fill",
        });

        //after getting result modify the user.avatar.public_id to result.public_id
        if (result) {
          user.avatar.public_id = result.public_id;
          user.avatar.secure_url = result.secure_url;

          //removing file from server after uploaded on cloudinary
          fs.rm(`uploads/${req.file.filename}`);
        }
      } catch (error) {
        return next(
          new AppError(error || "File not uploaded, try again!", 500)
        );
      }
    }

    await user.save();

    user.password = undefined;

    //this line generates JWTToken for the user then pass this token in token variable
    const token = await user.generateJWTToken();

    // setting token to cookie
    res.cookie("token", token, cookieOptions);

    //sending mail after user successfully registered
    const loginUrl = `${process.env.FRONTEND_URL}/login`;
    const signupEmail = userSignupTemplate(user.fullName, loginUrl);
    const subject = "Registration Successful || Tech. Edu.";
    await sendEmail(user.email, subject, signupEmail);

    res.status(200).json({
      success: true,
      message: "User registered successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return next(new AppError(error.message, 500));
  }
};

//***** login Controller *****
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("All fields are required!", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    //FALSE--->comparing password like this
    // if (!user || !user.comparePassword(password)) {
    //   return next(new AppError("Email or Password does not matched!", 400));
    // }

    //TRUE--->comparing password like this
    if (!user || !(await user.comparePassword(password))) {
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

//***** logout Controller *****
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

//***** getProfile Controller *****
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    res.status(200).json({
      success: true,
      message: "User details",
      user,
    });
  } catch (error) {
    return next(new AppError("Failed to fetch user details!", 500));
  }
};

//***** forgetPassword Controller *****
const forgetPassword = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new AppError("Email is required!", 400));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next(
      new AppError("Provided Email is not registered with us!!", 400)
    );
  }

  //generating token if user registered
  const resetToken = await user.generatePasswordResetToken();
  await user.save();

  //generating url/link for reset password
  const resetPasswordURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  console.log("Printing resetPasswordUrl--> ", resetPasswordURL);

  const messageEmailTemplate = resetPassTemplate(resetPasswordURL);

  //sending email to user
  const subject = `Tech. Edu. || Reset Password`;

  try {
    //this sendEmail() is in utils folder
    await sendEmail(email, subject, messageEmailTemplate);

    console.log("URL sended successfully for forget password...");

    res.status(200).json({
      success: true,
      message: `Reset password token has been sent to ${email}`,
      resetToken,
    });
  } catch (error) {
    console.log("Error while sending forget password URL...");
    //if email not send successfully the reset the values to undefined for security purpose
    user.forgetPasswordToken = undefined;
    user.forgetPasswordExpiry = undefined;

    return next(new AppError(error.message, 500));
  }
};

//***** resetPassword Controller *****
const resetPassword = async (req, res, next) => {
  const { resetToken } = req.params;
  const { password, confirmPassword } = req.body;

  if (!password || !confirmPassword) {
    return next(new AppError("All fields are required!"));
  }

  if (password !== confirmPassword) {
    return next(new AppError("Password and confirm password should be same!"));
  }

  const forgetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await User.findOne({
    forgetPasswordToken,
    forgetPasswordExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new AppError("Token is invalid or expired, please try again!", 400)
    );
  }

  //if user is valid--> resetting the old password from new password
  user.password = password;

  //setting undefined after password updated
  user.forgetPasswordToken = undefined;
  user.forgetPasswordExpiry = undefined;

  //and save successfully in database
  user.save();

  res.status(200).json({
    success: true,
    message: "Your password updated successfully",
  });
};

//**** CHANGE PASSWORD CONTROLLER*****
const changePassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const { id } = req.user;

  if (!oldPassword || !newPassword) {
    return next(new AppError("All fields are required!", 400));
  }

  const user = await User.findById(id).select("+password");

  if (!user) {
    return next(new AppError("User does not exist!", 400));
  }

  const isPasswordValid = await user.comparePassword(oldPassword);

  if (!isPasswordValid) {
    return next(new AppError("Invalid old password!", 400));
  }

  //setting new password over old password and save it into DB
  user.password = newPassword;
  await user.save();
  user.password = undefined;

  res.status(200).json({
    success: true,
    message: "Your password updated successfully",
  });
};

// *****UPDATE USER CONTROLLER*****
const updateUser = async (req, res, next) => {
  const { fullName } = req.body;
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return next(new AppError("User does not exist", 400));
  }

  if (fullName) {
    user.fullName = fullName;
  }

  if (req.file) {
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    //after deleting already uploaded file upload again
    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "lms",
        width: 250,
        height: 250,
        gravity: "faces",
        crop: "fill",
      });

      //after getting result modify the user.avatar.public_id to result.public_id
      if (result) {
        user.avatar.public_id = result.public_id;
        user.avatar.secure_url = result.secure_url;

        //removing file from server after uploaded on cloudinary
        fs.rm(`uploads/${req.file.filename}`);
      }
    } catch (error) {
      return next(new AppError(error || "File not uploaded, try again!", 500));
    }
  }

  //save to DB
  await user.save();

  res.status(200).json({
    success: true,
    message: "User Details Updated Successfully",
  });
};

export {
  register,
  login,
  logout,
  getProfile,
  forgetPassword,
  resetPassword,
  changePassword,
  updateUser,
};
