import { Router } from "express";
import {
  addLectureByCourseId,
  createCourse,
  getAllCourses,
  getLecturesByCourseId,
  removeAllLecturesByCourseId,
  removeCourse,
  updateCourse,
} from "../controllers/course.controller.js";
import { authorizedRoles, isLoggedIn } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

// router.get('/', getAllCourses)
// router.get('/:id', isLoggedIn, getLecturesByCourseId)

//with below syntax we can define multiple type of requests like get, post, etc on same path ('/')
router
  .route("/")
  .get(getAllCourses)
  .post(
    isLoggedIn,
    authorizedRoles("Admin"),
    upload.single("thumbnail"),
    createCourse
  );

router
  .route("/:id")
  .get(isLoggedIn, getLecturesByCourseId)
  .put(isLoggedIn, authorizedRoles("Admin"), updateCourse)
  .delete(isLoggedIn, authorizedRoles("Admin"), removeCourse)
  .post(
    isLoggedIn,
    authorizedRoles("Admin"),
    upload.single("lecture"),
    addLectureByCourseId
  ).patch(isLoggedIn, authorizedRoles("Admin"), removeAllLecturesByCourseId);

export default router;
