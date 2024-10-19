import mongoose from "mongoose";
import Request from "../models/request.js";

export const getRequests = async (req, res) => {
  try {
    const requests = await Request.find();
    res.status(200).json(requests);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createRequest = async (req, res) => {
  const request = req.body;
  const newRequest = new Request(request);
  console.log(request);

  try {
    await newRequest.save();
    console.log(request);
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(409).json({ message: error.message });
    console.log(request);
  }
};

export const deleteRequest = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No request with id: ${id}`);

    await Request.findByIdAndRemove(id);

    res.json({ message: "Request deleted successfully." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateRequest = async (req, res) => {
  const { id } = req.params;
  const { wasteType, weight, location, status } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No request with id: ${id}`);

  const updatedRequest = { wasteType, weight, location, status, _id: id };
  await Request.findByIdAndUpdate(id, updatedRequest, { new: true });

  res.json(updatedRequest);
};
