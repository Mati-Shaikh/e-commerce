import React, { useState } from 'react';
import { Mail, Lock, User, Phone } from 'lucide-react';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    businessType: [],
  });

  const businessTypes = ['Manufacturer', 'Retailer', 'Rental'];

  const handleBusinessTypeChange = (type) => {
    if (formData.businessType.includes(type)) {
      setFormData({
        ...formData,
        businessType: formData.businessType.filter((t) => t !== type),
      });
    } else if (formData.businessType.length < 2) {
      setFormData({
        ...formData,
        businessType: [...formData.businessType, type],
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">Sign up</h2>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  required
                  className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-sky-500 focus:border-sky-500"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

            {/* Phone Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  required
                  className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-sky-500 focus:border-sky-500"
                  placeholder="Your phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-sky-500 focus:border-sky-500"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-sky-500 focus:border-sky-500"
                  placeholder="Your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            {/* Business Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Type (Select up to 2)
              </label>
              <div className="grid grid-cols-3 gap-4">
                {businessTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleBusinessTypeChange(type)}
                    className={`py-2 px-4 rounded-md border ${
                      formData.businessType.includes(type)
                        ? 'bg-sky-500 text-white border-sky-500'
                        : 'border-gray-300 text-gray-700 hover:border-sky-500'
                    } ${
                      formData.businessType.length === 2 && !formData.businessType.includes(type)
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    }`}
                    disabled={formData.businessType.length === 2 && !formData.businessType.includes(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Combination Display */}
            {formData.businessType.length === 2 && (
              <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                Selected combination: {formData.businessType.join('-')}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
