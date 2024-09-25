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
