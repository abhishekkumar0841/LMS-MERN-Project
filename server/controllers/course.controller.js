import Course from "../models/course.model.js";
import AppError from "../utils/error.utils.js";

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

    if(!course){
        return next(
            new AppError("Invalid Course Id", 400)
        )
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

export { getAllCourses, getLecturesByCourseId };
