import mongoose from 'mongoose';

const staffSchema = mongoose.Schema({
  name: String,
  role: String,
  joinDate: Date,
  phone: String,
}, { timestamps: true });

const Staff = mongoose.model('Staff', staffSchema);

export default Staff;