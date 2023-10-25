import Payment from "../models/payment.model.js";
import User from "../models/user.model.js";
// import { razorpay } from "../server.js";
import { razorpay } from "../server.js";
import AppError from "../utils/error.utils.js";
import crypto from "crypto";
import asyncHandler from "express-async-handler";
import sendEmail from "../utils/sendEmail.js";
import subscribeTemplate from "../htmlTemplates/subscribeTemplate.js";
import cancelSubscriptionTemplate from "../htmlTemplates/cancelSubscriptionTemplate.js";

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
      total_count: 12, //total_count is required to allow customer how many times they can buy subscription within a time duration of 1 year. INITIALLY I MISS THIS OPTION SO I CANNOT GET THE RAZORPAY SDK ON CLIENT INTERFACE.
    });

    console.log("Printing subscription in payment controller->", subscription);

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
    // return next(new AppError(error.message, 500));
    return res.status(500).json({
      success: false,
      message: error,
    });
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
      .update(`${razorpay_payment_id}|${subscriptionId}`)
      .digest("hex"); //i also forget to use .digest('hex') so, it takes a lot of time to debug😒

    //comparing generated signature with received signature
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

    //sending email to user after subscription is verified
    const coursePageUrl = `${process.env.FRONTEND_URL}/courses`
    const subject = "Subscription Successful || Tech. Edu."
    const subscribeEmail = subscribeTemplate(user.fullName, user.subscription.id, coursePageUrl)
    await sendEmail(user.email, subject, subscribeEmail)

    res.status(200).json({
      success: true,
      message: "Payment created or verified successfully",
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const cancelSubscription = asyncHandler(async (req, res, next) => {
  const { id } = req.user;

  // Finding the user
  const user = await User.findById(id);

  // Checking the user role
  if (user.role === "ADMIN") {
    return next(
      new AppError("Admin does not need to cancel subscription", 400)
    );
  }

  // Finding subscription ID from subscription
  const subscriptionId = user.subscription.id;

  // Creating a subscription using razorpay that we imported from the server
  try {
    const subscription = await razorpay.subscriptions.cancel(
      subscriptionId // subscription id
    );

    // Adding the subscription status to the user account
    user.subscription.status = subscription.status;

    //sending mail after user cancelled the subscription
    const url = `${process.env.FRONTEND_URL}/course/description`
    const subject = "Subscription Cancelled || Tech. Edu."
    const cancelSubEmail = cancelSubscriptionTemplate(user.fullName, subscriptionId, url)
    await sendEmail(user.email, subject, cancelSubEmail)

    // Saving the user object
    await user.save();
  } catch (error) {
    console.error("Error while canceling subscription:", error);
    // Returning error if any, and this error is from razorpay so we have statusCode and message built in
    return next(new AppError(error.error.description, error.statusCode));
  }

  // Send the response
  res.status(200).json({
    success: true,
    message: "Subscription canceled successfully",
  });
});

export const allPayments = asyncHandler(async (req, res, _next) => {
  const { count, skip } = req.query;

  // Find all subscriptions from razorpay
  const allPayments = await razorpay.subscriptions.all({
    count: count ? count : 10, // If count is sent then use that else default to 10
    skip: skip ? skip : 0, // // If skip is sent then use that else default to 0
  });

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const finalMonths = {
    January: 0,
    February: 0,
    March: 0,
    April: 0,
    May: 0,
    June: 0,
    July: 0,
    August: 0,
    September: 0,
    October: 0,
    November: 0,
    December: 0,
  };

  const monthlyWisePayments = allPayments.items.map((payment) => {
    // We are using payment.start_at which is in unix time, so we are converting it to Human readable format using Date()
    const monthsInNumbers = new Date(payment.start_at * 1000);

    return monthNames[monthsInNumbers.getMonth()];
  });

  monthlyWisePayments.map((month) => {
    Object.keys(finalMonths).forEach((objMonth) => {
      if (month === objMonth) {
        finalMonths[month] += 1;
      }
    });
  });

  const monthlySalesRecord = [];

  Object.keys(finalMonths).forEach((monthName) => {
    monthlySalesRecord.push(finalMonths[monthName]);
  });

  res.status(200).json({
    success: true,
    message: "All payments",
    allPayments,
    finalMonths,
    monthlySalesRecord,
  });
});
