import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    role: String || "user",
    phone: Number,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
