import e from "express";
import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    profileImage: {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin", "staff", "driver"],
    },
    phone: Number,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
