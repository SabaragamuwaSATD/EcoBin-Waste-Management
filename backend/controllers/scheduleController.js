import mongoose from "mongoose";
import Schedule from "../models/Schedule.js";

export const getSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find();
    res.status(200).json(schedules);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createSchedule = async (req, res) => {
  const schedule = req.body;
  const newSchedule = new Schedule(schedule);
  console.log(schedule);

  try {
    await newSchedule.save();
    console.log(schedule);
    res.status(201).json(newSchedule);
  } catch (error) {
    res.status(409).json({ message: error.message });
    console.log(schedule);
  }
};

export const deleteSchedule = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No request with id: ${id}`);

    await Schedule.findByIdAndRemove(id);

    res.json({ message: "Schedule deleted successfully." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateSchedule = async (req, res) => {
  const { id } = req.params;
  const { wasteType, weight, location, date, time, latitude, longitude } =
    req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No request with id: ${id}`);

  const updatedSchedule = {
    wasteType,
    weight,
    location,
    date,
    time,
    latitude,
    longitude,
    _id: id,
    driver,
  };
  await Schedule.findByIdAndUpdate(id, updatedSchedule, { new: true });

  res.json(updatedSchedule);
};
