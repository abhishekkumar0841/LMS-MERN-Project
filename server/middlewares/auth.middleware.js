import jwt from "jsonwebtoken";
import AppError from "../utils/error.utils.js";
import User from "../models/user.model.js";
import asyncHandler from 'express-async-handler'

// ********AUTHENTICATION MIDDLEWARE************
const isLoggedIn = async (req, res, next) => {
  const token  = req.cookies.token || req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    return next(new AppError("Unauthenticated, please login again", 400));
  }

  const userDetails = await jwt.verify(token, process.env.JWT_SECRET);
  console.log("Printing userDetails from auth-->", userDetails);

  req.user = userDetails;

  next();
};

// ********AUTHORIZED ROLES MIDDLEWARE************
//here i use CLOSERS by which i get all the roles of the users first and then allow the users with authorized paths
const authorizedRoles =
  (...roles) =>
  async (req, res, next) => {
    const currentRoles = req.user.role;
    if (!roles.includes(currentRoles)) {
      return next(
        new AppError("You do not have permission to access this route", 403)
      );
    }
    next();
  };

// ********AUTHORIZED SUBSCRIBER MIDDLEWARE************
// const authorizedSubscriber = async (req, res, next) => {
//   // const subscription = req.user.subscription;
//   // const currentUserRole = req.user.role;

//   try {
//     const user = await User.findById(req.user.id);

//     console.log("user from authorizedSubscriber midW", user)

//     if (user.role !== "Admin" && user.subscription.status !== "active") {
//       return next(new AppError("Please subscribe to access this route", 403));
//     }

//     next();
//   } catch (error) {
//     return next(new AppError(error.message, 500));
//   }
// };

export const authorizedSubscriber = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  console.log("user from authorizedSubscriber midW", user);

  if (user.role !== "Admin" && user.subscription.status !== "active") {
    return next(new AppError("Please subscribe to access this route", 403));
  }

  next();
});

export { isLoggedIn, authorizedRoles };
