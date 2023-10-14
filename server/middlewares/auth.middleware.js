import jwt from "jsonwebtoken";
import AppError from "../utils/error.utils.js";

const isLoggedIn = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new AppError("Unauthenticated, please login again", 400));
  }

  const userDetails = await jwt.verify(token, process.env.JWT_SECRET);
  console.log("Printing userDetails from auth-->", userDetails)

  req.user = userDetails;

  next();
};

export { isLoggedIn };
