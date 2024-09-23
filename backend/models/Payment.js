import mongoose from 'mongoose';

const paymentSchema = mongoose.Schema({
  amount: Number,
  status: String,
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;