import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from 'crypto'

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Name is required"],
      minLength: [2, "Name must be at least 5 characters"],
      maxLength: [50, "Name must be less than 50 characters"],
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      unique: true,
      match: [
        /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm,
        "Please provide valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [8, "Password must be at least of 8 characters"],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
      },
      secure_url: {
        type: String,
      },
    },
    role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User",
    },
    forgetPasswordToken: String,
    forgetPasswordExpiry: Date,
    subscription: {
      id: String,
      status: String,
    }
  },
  {
    timestamps: true,
  }
);

//hashing/encrypting password for security
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//writing generic methods for generating JWT token, comparing password and much more..
userSchema.methods = {
  generateJWTToken: async function () {
    return await jwt.sign(
      {
        id: this._id,
        email: this.email,
        subscription: this.subscription,
        role: this.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRY,
      }
    );
  },

  // function for comparing normal password to hashed password
  comparePassword: async function (plainTextPassword) {
    return await bcrypt.compare(plainTextPassword, this.password);
  },

  //function for generatePasswordResetToken using CRYPTO
  //this function generates token with its expiry
  generatePasswordResetToken: async function () {
    const resetToken = crypto.randomBytes(20).toString("hex");

    //setting these values to userModel which is already defined in this model
    this.forgetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    this.forgetPasswordExpiry = Date.now() + 15 * 60 * 1000; //15 min from now

    return resetToken;
  },
};

const User = model("User", userSchema);
export default User;
