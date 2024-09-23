import React, { useState } from 'react';
import { Send } from 'lucide-react';

const Help = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle message submission
    console.log({ message });
    setMessage('');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Support and Help</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Help Desk</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full h-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Write a message to inform about your inquiry..."
          ></textarea>
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-500">{message.length}/500</span>
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 flex items-center"
            >
              <Send className="w-4 h-4 mr-2" />
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Help;