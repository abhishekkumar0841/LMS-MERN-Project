import { Router } from "express";
import { register, login, logout, getProfile } from "../controllers/user.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

//upload.single("avatar") used for uploading single file and avatar is the name of data which are going to upload
router.post('/register', upload.single("avatar"), register)
router.post('/login', login)
router.get('/logout', logout)
router.get('/me', isLoggedIn, getProfile)

export default router;