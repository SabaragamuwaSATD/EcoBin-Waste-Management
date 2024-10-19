import Staff from '../models/Staff.js';
import Attendance from '../models/Attendance.js';
import User from '../models/User.js';

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

// Fetch all users with the role of "staff"
export const getStaffUsers = async (req, res) => {
  try {
    const staffUsers = await User.find({ role: "staff" }); // Fetch users with role 'staff'
    res.status(200).json(staffUsers);
  } catch (error) {
    res.status(500).send("Error fetching staff users");
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