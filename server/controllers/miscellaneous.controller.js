import User from "../models/user.model.js";
import AppError from "../utils/error.utils.js";
import sendEmail from "../utils/sendEmail.js";

export const contactUs = async (req, res, next) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return next(new AppError("All fields are required!", 404));
  }

  try {
    const subject = "Contact Us Form";
    const textMessage = `${name} - ${email} <br/> ${message}`;

    await sendEmail(process.env.CONTACT_US_EMAIL, subject, textMessage);
  } catch (error) {
    console.log(error);
    return next(new AppError(error.message, 500));
  }

  res.status(200).json({
    success: true,
    message: "Your request has been submitted successfully",
  });
};

export const userStats = async (req, res, next) => {
  const allUsersCount = await User.countDocuments();
  console.log("All users Count-->", allUsersCount);

  const subscribedUsersCount = await User.countDocuments({
    "subscription.status": "active",
  });

  console.log("All subscribed users Count-->", subscribedUsersCount);

  res.status(200).json({
    success: true,
    message: "All registered users count",
    allUsersCount,
    subscribedUsersCount,
  });
};
