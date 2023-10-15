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
      }
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
const updateCourse = async function (req, res, next) {};

// *******REMOVE COURSE CONTROLLER******
const removeCourse = async function (req, res, next) {};

export {
  getAllCourses,
  getLecturesByCourseId,
  createCourse,
  updateCourse,
  removeCourse,
};
