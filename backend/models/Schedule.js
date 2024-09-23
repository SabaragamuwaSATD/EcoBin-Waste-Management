import mongoose from "mongoose";

const scheduleSchema = mongoose.Schema(
  {
    wasteType: String,
    weight: Number,
    date: String,
    time: String,
    location: String,
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

const Schedule = mongoose.model("Schedule", scheduleSchema);

export default Schedule;
