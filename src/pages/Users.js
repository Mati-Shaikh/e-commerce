import React, { useState } from 'react';
import { Eye, Ban, CheckCircle } from 'lucide-react';
import HeaderMain from '../Admin/Components/HeaderMain'; // Import HeaderMain component
import Footer from '../components/footer';


const UserManagementTable = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      companyName: 'Global Rentals Inc.',
      businessType: 'Rental Retailer',
      businessYears: 8,
      description: 'Leading equipment rental service across multiple sectors',
      status: 'Active',
      contact: {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@globalrentals.com',
        phone: '+1 (555) 123-4567'
      }
    },
    {
      id: 2,
      companyName: 'Manufacture Plus',
      businessType: 'Manufacturer',
      businessYears: 15,
      description: 'Specialized in high-precision industrial manufacturing',
      status: 'Blocked',
      contact: {
        name: 'Michael Chen',
        email: 'michael.chen@manufactureplus.com',
        phone: '+1 (555) 987-6543'
      }
    }
  ]);

  const toggleUserStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'Active' ? 'Blocked' : 'Active' }
        : user
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Blocked': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      {/* Include the HeaderMain component */}
      <HeaderMain />

      <div className="bg-white shadow-md rounded-lg overflow-hidden mt-6">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">User Management</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business Years</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.companyName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.businessType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.businessYears} Years</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{user.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>
                      <p>{user.contact.name}</p>
                      <p>{user.contact.email}</p>
                      <p>{user.contact.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <div className="flex justify-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 focus:outline-none" title="View Details">
                        <Eye size={18} />
                      </button>
                      <button 
                        onClick={() => toggleUserStatus(user.id)}
                        className={`${user.status === 'Active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'} focus:outline-none`}
                        title={user.status === 'Active' ? 'Block User' : 'Unblock User'}
                      >
                        {user.status === 'Active' ? <Ban size={18} /> : <CheckCircle size={18} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default UserManagementTable;
