import Schedule from '../models/Schedule.js';

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