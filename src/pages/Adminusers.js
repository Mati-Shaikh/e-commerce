import React, { useState } from 'react';
import { Shield, Ban, CheckCircle, Edit, Trash2 } from 'lucide-react';
import HeaderMain from '../Admin/Components/HeaderMain'; // Import the HeaderMain component
import Footer from '../components/footer';

const AdminManagement = () => {
  const [admins, setAdmins] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@company.com',
      role: 'Super Admin',
      permissions: ['Full Access'],
      status: 'Active',
      lastLogin: '2024-01-25 10:30:45'
    },
    {
      id: 2,
      name: 'Emily Smith',
      email: 'emily.smith@company.com',
      role: 'Product Manager',
      permissions: ['Product Edit', 'Inventory'],
      status: 'Blocked',
      lastLogin: '2024-01-20 15:45:22'
    }
  ]);

  const toggleAdminStatus = (adminId) => {
    setAdmins(admins.map(admin => 
      admin.id === adminId 
        ? { ...admin, status: admin.status === 'Active' ? 'Blocked' : 'Active' }
        : admin
    ));
  };

  const deleteAdmin = (adminId) => {
    setAdmins(admins.filter(admin => admin.id !== adminId));
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
      {/* Include the HeaderMain component at the top */}
      <HeaderMain />

      <div className="bg-white shadow-md rounded-lg overflow-hidden mt-6">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Admin Management</h2>
          <button className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            <Shield className="mr-2" size={18} /> Add New Admin
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {admins.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{admin.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admin.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admin.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admin.permissions.join(', ')}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admin.lastLogin}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(admin.status)}`}>
                      {admin.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <div className="flex justify-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 focus:outline-none" title="Edit Admin">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => toggleAdminStatus(admin.id)} className={`${admin.status === 'Active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'} focus:outline-none`} title={admin.status === 'Active' ? 'Block Admin' : 'Unblock Admin'}>
                        {admin.status === 'Active' ? <Ban size={18} /> : <CheckCircle size={18} />}
                      </button>
                      <button onClick={() => deleteAdmin(admin.id)} className="text-red-500 hover:text-red-700 focus:outline-none" title="Delete Admin">
                        <Trash2 size={18} />
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

export default AdminManagement;
