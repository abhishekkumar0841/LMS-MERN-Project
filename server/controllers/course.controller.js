import Course from "../models/course.model.js";
import AppError from "../utils/error.utils.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";

// *****GET_ALL_COURSES CONTROLLER******
const getAllCourses = async function (req, res, next) {
  try {
    const courses = await Course.find({}).select("-lectures");

    res.status(200).json({
      success: true,
      message: "All courses fetch successfully",
      courses,
    });
  } catch (error) {
    return next(new AppError(error.message), 500);
  }
};

// *****GET_LECTURES_BY_ID CONTROLLER******
const getLecturesByCourseId = async function (req, res, next) {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);

    if (!course) {
      return next(new AppError("Invalid Course Id", 400));
    }

    res.status(200).json({
      success: true,
      message: "Course lectures fetched successfully",
      lectures: course.lectures,
    });
  } catch (error) {
    return next(new AppError(error.message), 500);
  }
};

// *******CREATE COURSE CONTROLLER******
const createCourse = async function (req, res, next) {
  const { title, description, category, createdBy } = req.body;

  if (!title || !description || !category || !createdBy) {
    return next(new AppError("All fields are required", 400));
  }

  try {
    const course = await Course.create({
      title,
      category,
      description,
      createdBy,
      thumbnail: {
        public_id: "Thumbnail Public Id",
        secure_url: "Thumbnail Secure URL",
      },
    });

    if (!course) {
      return next(
        new AppError("Course Could Not Be Created, Please Try Again", 400)
      );
    }

    try {
      if (req.file) {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "lms",
        });

        if (result) {
          (course.thumbnail.public_id = result.public_id),
            (course.thumbnail.secure_url = result.secure_url);

          //removing file from server after uploaded on cloudinary
          fs.rm(`uploads/${req.file.filename}`);
        }

        await course.save();

        res.status(200).json({
          success: true,
          message: "Course created successfully",
          course,
        });
      }
    } catch (error) {
      return next(new AppError(error.message, 500));
    }
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

// *******UPDATE COURSE CONTROLLER******
const updateCourse = async function (req, res, next) {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndUpdate(
      id,
      { $set: req.body }, //properties in req.body will replace the existing properties in the document
      { runValidators: true } //it validate the data with comparing to courseSchema
    );

    if (!course) {
      return next(new AppError("Course with existing Id does not exist", 400));
    }

    res.status(200).json({
      success: true,
      message: "Course is updated successfully",
      course,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

// *******REMOVE COURSE CONTROLLER******
const removeCourse = async function (req, res, next) {
  try {
    const { id } = req.params;

    const course = await Course.findByIdAndDelete(id);

    if (!course) {
      return next(new AppError("This course does not exist", 400));
    }

    res.status(200).json({
      success: true,
      message: "This Course deleted successfully",
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

// *******ADD LECTURES BY COURSE ID CONTROLLER******
const addLectureByCourseId = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const { id } = req.params;

    if (!title || !description) {
      return next(new AppError("All fields are required!"));
    }

    const course = await Course.findById(id);

    if (!course) {
      return next(
        new AppError("This course does't exist, try with other", 400)
      );
    }

    //TODO try with--> Course.create({})

    const lectureData = {
      title,
      description,
      lecture: {},
    };

    if (req.file) {
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "lms",
        });
        console.log("Printing Cloudinary upload result->", result);
        if (result) {
          lectureData.lecture.public_id = result.public_id;
          lectureData.lecture.secure_url = result.secure_url;
        }

        fs.rm(`uploads/${req.file.filename}`);
      } catch (error) {
        return next(new AppError(error.message, 500));
      }
    }

    //pushing the lectureData into course.lectures
    course.lectures.push(lectureData)

    //updating the number of lectures with course lectures length
    course.numbersOfLectures = course.lectures.length

    await course.save();

    res.status(200).json({
      success: true,
      message: "Lectures successfully added to the course",
      course,
    })

  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export {
  getAllCourses,
  getLecturesByCourseId,
  createCourse,
  updateCourse,
  removeCourse,
  addLectureByCourseId,
};
