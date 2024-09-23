import Inquiry from '../models/Inquiry.js';

export const submitInquiry = async (req, res) => {
  const { message } = req.body;

  try {
    const newInquiry = new Inquiry({ message });
    await newInquiry.save();
    res.status(201).json(newInquiry);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.status(200).json(inquiries);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};