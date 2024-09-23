import Payment from '../models/Payment.js';

export const processPayment = async (req, res) => {
  const { amount, cardDetails } = req.body;

  try {
    // In a real-world scenario, you would integrate with a payment gateway here
    const payment = new Payment({ amount, status: 'completed' });
    await payment.save();
    res.status(200).json({ message: 'Payment processed successfully', payment });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getPaymentHistory = async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });
    res.status(200).json(payments);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};