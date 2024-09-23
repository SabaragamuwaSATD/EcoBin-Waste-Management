import Staff from '../models/Staff.js';
import Attendance from '../models/Attendance.js';

export const getStaff = async (req, res) => {
  try {
    const staff = await Staff.find();
    res.status(200).json(staff);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addStaff = async (req, res) => {
  const staff = req.body;
  const newStaff = new Staff(staff);

  try {
    await newStaff.save();
    res.status(201).json(newStaff);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateAttendance = async (req, res) => {
  const { staffId, date, status } = req.body;

  try {
    const attendance = await Attendance.findOneAndUpdate(
      { staffId, date },
      { status },
      { upsert: true, new: true }
    );
    res.status(200).json(attendance);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};