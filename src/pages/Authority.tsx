import React from 'react';
import { User, Calendar } from 'lucide-react';

const Authority = () => {
  const staff = [
    { name: 'Arlene McCoy', role: 'Worker', joinDate: 'Mar 1, 2022', phone: '+1565652323' },
    { name: 'Savannah Nguyen', role: 'Worker', joinDate: 'Mar 1, 2022', phone: '+1541564656' },
    { name: 'Kristin Watson', role: 'Worker', joinDate: 'Mar 1, 2022', phone: '+1565456523' },
    { name: 'Cameron Williamson', role: 'Worker', joinDate: 'Mar 1, 2022', phone: '+1564565295' },
    { name: 'Jane Cooper', role: 'Worker', joinDate: 'Mar 1, 2022', phone: '+1565656232' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Authority</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Staff</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {staff.map((person, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User className="w-8 h-8 bg-gray-200 rounded-full p-1 mr-3" />
                      <div className="text-sm font-medium text-gray-900">{person.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{person.role}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{person.joinDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{person.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-6 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Attendance Calendar</h2>
        <div className="flex justify-center">
          <Calendar className="w-64 h-64 text-green-500" />
        </div>
      </div>
    </div>
  );
};

export default Authority;