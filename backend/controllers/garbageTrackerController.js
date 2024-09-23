import GarbageLocation from '../models/GarbageLocation.js';

export const getGarbageLocations = async (req, res) => {
  try {
    const locations = await GarbageLocation.find();
    res.status(200).json(locations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateGarbageLocation = async (req, res) => {
  const { id } = req.params;
  const { latitude, longitude, garbageType, fillLevel } = req.body;

  try {
    const updatedLocation = await GarbageLocation.findByIdAndUpdate(
      id,
      { latitude, longitude, garbageType, fillLevel },
      { new: true }
    );
    res.status(200).json(updatedLocation);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};