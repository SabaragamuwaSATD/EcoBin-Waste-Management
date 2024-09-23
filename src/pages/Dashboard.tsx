import React from 'react';
import { DollarSign, ShoppingCart, CreditCard, BarChart2 } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard icon={DollarSign} title="New Net Income" value="£8,245.00" change="+20.1% from last week" />
        <StatCard icon={ShoppingCart} title="Total Exchange" value="256" change="+14.0% from last week" />
        <StatCard icon={CreditCard} title="Payment received" value="1,256" change="+5.1% from last week" />
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Overall Income</h2>
        <BarChart2 className="w-full h-64" />
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, title, value, change }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <Icon className="text-green-500 w-6 h-6" />
    </div>
    <p className="text-2xl font-bold mb-2">{value}</p>
    <p className="text-sm text-gray-500">{change}</p>
  </div>
);

export default Dashboard;