import { Router } from "express";
import { allPayments, bySubscription, cancelSubscription, getRazorpayApiKey, verifySubscription } from "../controllers/payment.controller.js";
import { authorizedRoles, authorizedSubscriber, isLoggedIn } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/razorpay-key").get(isLoggedIn, getRazorpayApiKey);

router.route("/subscribe").post(isLoggedIn, bySubscription);

router.route("/verify").post(isLoggedIn, verifySubscription);

router.route("/unsubscribe").post(isLoggedIn, authorizedSubscriber, cancelSubscription);

router.route("/").get(isLoggedIn, authorizedRoles('Admin'), allPayments);

export default router;
