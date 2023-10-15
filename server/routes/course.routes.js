import { Router } from "express";
import {
  createCourse,
  getAllCourses,
  getLecturesByCourseId,
  removeCourse,
  updateCourse,
} from "../controllers/course.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

// router.get('/', getAllCourses)
// router.get('/:id', isLoggedIn, getLecturesByCourseId)

//with below syntax we can define multiple type of requests like get, post, etc on same path ('/')
router
  .route("/")
  .get(getAllCourses)
  .post(upload.single("thumbnail"), createCourse);

router
  .route("/:id")
  .get(isLoggedIn, getLecturesByCourseId)
  .put(updateCourse)
  .delete(removeCourse);

export default router;
