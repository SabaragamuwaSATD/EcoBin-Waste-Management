import mongoose from "mongoose";

const requestSchema = mongoose.Schema(
  {
    wasteType: String,
    weight: Number,
    location: String,
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

const Request = mongoose.model("Request", requestSchema);

export default Request;
