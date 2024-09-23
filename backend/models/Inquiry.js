import mongoose from 'mongoose';

const inquirySchema = mongoose.Schema({
  message: String,
  status: { type: String, default: 'pending' },
}, { timestamps: true });

const Inquiry = mongoose.model('Inquiry', inquirySchema);

export default Inquiry;