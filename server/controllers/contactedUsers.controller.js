import Contacted_Users from "../models/contactedUsers.model.js";
import AppError from "../utils/error.utils.js";

const contactUs = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return next(new AppError("All Fields are required!"));
    }

    const newUser = {
      name,
      email,
      message,
    };

    const contactedUsers = await Contacted_Users.findOneAndUpdate(
      {},
      { $push: { totalUsers: newUser } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Message send successfully, we contact with you ASAP",
      contactedUsers,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export { contactUs };
