import mongoose from 'mongoose';

const garbageLocationSchema = mongoose.Schema({
  latitude: Number,
  longitude: Number,
  garbageType: String,
  fillLevel: Number,
}, { timestamps: true });

const GarbageLocation = mongoose.model('GarbageLocation', garbageLocationSchema);

export default GarbageLocation;