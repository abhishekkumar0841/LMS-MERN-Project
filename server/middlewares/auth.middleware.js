import jwt from "jsonwebtoken";
import AppError from "../utils/error.utils.js";

// ********AUTHENTICATION MIDDLEWARE************
const isLoggedIn = async (req, res, next) => {
  const { token } = req.cookies;

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
  const authorizedSubscriber = (req, res, next)=>{
    const subscription = req.user.subscription;
    const currentUserRole = req.user.role;

    if(currentUserRole !== 'Admin' && subscription.status !== 'active'){
      return next(new AppError("Please subscribe to access this route", 403))
    }

    next();
  }

export { isLoggedIn, authorizedRoles, authorizedSubscriber };
