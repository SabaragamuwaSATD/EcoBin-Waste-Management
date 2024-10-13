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
  const { wasteType, weight, location, date, time, latitude, longitude,status } =
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
    status
  };
  await Schedule.findByIdAndUpdate(id, updatedSchedule, { new: true });

  res.json(updatedSchedule);
};

// Update only the status of a collection
export const updateCollectionStatus = async (req, res) => {
  const { id } = req.params; // Get the collection ID from the request parameters
  const { status } = req.body; // Get the status from the request body

  // Validate ID
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No collection with id: ${id}`);

  try {
    // Find collection by ID and update the status only
    const updatedSchedule = await Schedule.findByIdAndUpdate(
      id,
      { status }, // Update only the status field
      { new: true } // Return the updated document
    );

    if (!updatedSchedule) {
      return res.status(404).json({ message: "Collection not found" });
    }

    res.status(200).json({
      message: "Collection status updated successfully",
      updatedSchedule,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
