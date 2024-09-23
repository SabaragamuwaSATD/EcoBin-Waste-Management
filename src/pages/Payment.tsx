import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';

const Payment = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle payment submission
    console.log({ cardNumber, expiryDate, cvv });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Payment</h1>
      <div className="bg-white p-6 rounded-lg shadow max-w-md mx-auto">
        <div className="flex items-center justify-center mb-6">
          <CreditCard className="w-12 h-12 text-green-500" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Card Number</label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
              placeholder="1234 5678 9012 3456"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
            <input
              type="text"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
              placeholder="MM/YY"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">CVV</label>
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
              placeholder="123"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Pay Now
          </button>
        </form>
        <button className="w-full mt-4 text-green-500 hover:text-green-600 focus:outline-none">
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Payment;