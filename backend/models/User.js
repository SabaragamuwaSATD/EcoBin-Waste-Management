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
    role: String || "user",
    phone: Number,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
