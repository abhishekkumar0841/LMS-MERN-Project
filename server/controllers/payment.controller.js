import Payment from "../models/payment.model.js";
import User from "../models/user.model.js";
import { razorpay } from "../server.js";
import AppError from "../utils/error.utils.js";
import crypto from "crypto";

export const getRazorpayApiKey = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "Razorpay Api Key",
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const bySubscription = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);

    if (!user) {
      return next(new AppError("Unauthorized, please login!", 400));
    }

    if (user.role === "Admin") {
      return next(new AppError("Admin cannot purchase our subscription!", 400));
    }

    const subscription = await razorpay.subscriptions.create({
      plan_id: process.env.RAZORPAY_PLAN_ID,
      customer_notify: 1, //used for notifying to customer
    });

    //storing subscriptionId and subscriptionStatus at user level
    user.subscription.id = subscription.id;
    user.subscription.status = subscription.status;

    //then save it
    await user.save();

    res.status(200).json({
      success: true,
      message: "Subscribed Successfully",
      subscription_id: subscription.id,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const verifySubscription = async (req, res, next) => {
  try {
    const { id } = req.user;
    const {
      razorpay_payment_id,
      razorpay_signature,
      razorpay_subscription_id,
    } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return next(new AppError("Unauthorized, please login!", 400));
    }

    const subscriptionId = user.subscription.id;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${razorpay_payment_id}|${subscriptionId}`);

    if (generatedSignature !== razorpay_signature) {
      return next(new AppError("Payment not verified, please try again!", 400));
    }

    await Payment.create({
      razorpay_payment_id,
      razorpay_signature,
      razorpay_subscription_id,
    });

    user.subscription.status = "active";
    await user.save();

    res.status(200).json({
      success: true,
      message: "Payment created or verified successfully",
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const cancelSubscription = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);

    if (!user) {
      return next("Unauthorized, please login", 400);
    }

    if (user.role === "Admin") {
      return next(new AppError("Admin cannot cancel the subscription", 400));
    }

    const subscriptionId = user.subscription.id;

    const subscription = await razorpay.subscriptions.cancel(subscriptionId);

    user.subscription.status = subscription.status;

    await user.save();
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const allPayments = async (req, res, next) => {
  try {
    const { count } = req.query;

    const subscriptions = await razorpay.subscriptions.all({
      count: count || 10,
    });

    res.status(200).json({
      success: true,
      message: "All payments",
      subscriptions,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
