import { Router } from "express";
import { authorizedRoles, isLoggedIn } from "../middlewares/auth.middleware.js";
import {contactUs} from "../controllers/contactedUsers.controller.js";

const router = Router();

router.route("/contact").post(contactUs);

// router
//   .route("/admin/stats/users")
//   .get(isLoggedIn, authorizedRoles("Admin", userStats));

export default router;
