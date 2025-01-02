import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { X, Search,MapPin } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapSelector = ({ isOpen, onClose, onLocationSelect, currentLocation }) => {
  const [marker, setMarker] = useState(currentLocation || [51.505, -0.09]);
  const [search, setSearch] = useState('');

  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        setMarker([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${search}`
      );
      const results = await response.json();
      if (results && results.length > 0) {
        const { lat, lon } = results[0];
        setMarker([parseFloat(lat), parseFloat(lon)]);
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  const handleConfirm = () => {
    onLocationSelect(marker);
    onClose();
  };

  if (!isOpen) return null;

  // Custom marker icon
  const customIcon = new L.Icon({
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    iconSize: [25, 41], // size of the icon
    iconAnchor: [12, 41], // point of the icon which will correspond to marker's position
    popupAnchor: [1, -34], // point from which the popup should open
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    shadowSize: [41, 41], // size of the shadow
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold">Select Location</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-4 flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search for a location"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-grow border border-gray-300 rounded-md py-2 px-3 focus:ring-sky-500 focus:border-sky-500"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
        <div className="h-96">
          <MapContainer center={marker} zoom={13} className="h-full w-full">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap"
            />
            <Marker position={marker} icon={customIcon} />
            <MapClickHandler />
          </MapContainer>
        </div>
        <div className="p-4 border-t flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600"
          >
            Confirm Location
          </button>
        </div>
      </div>
    </div>
  );
};

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    shopName: '',
    businessTitle: '',
    description: '',
    businessType: '',
    subBusinessType: '',
    address: {
      street: '',
      city: '',
      country: '',
      coordinates: null
    }
  });

  const [showMap, setShowMap] = useState(false);
  const [step, setStep] = useState(1);
  const businessTypes = ['Manufacturer', 'Retailer', 'Rental'];
  const subBusinessTypes = {
    Manufacturer: ['Combination 1', 'Combination 2'],
    Retailer: ['Combination 3', 'Combination 4'],
    Rental: ['Combination 5', 'Combination 6']
  };

  const handleLocationSelect = (coordinates) => {
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        coordinates
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center">Business Registration</h2>
            <div className="mt-4 flex justify-center space-x-4">
              <div className={`h-2 w-16 rounded ${step === 1 ? 'bg-sky-500' : 'bg-gray-200'}`} />
              <div className={`h-2 w-16 rounded ${step === 2 ? 'bg-sky-500' : 'bg-gray-200'}`} />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 ? (
              <>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      required
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-sky-500 focus:border-sky-500"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      required
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-sky-500 focus:border-sky-500"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      required
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-sky-500 focus:border-sky-500"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Shop Name</label>
                    <input
                      type="text"
                      required
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-sky-500 focus:border-sky-500"
                      value={formData.shopName}
                      onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Business Title</label>
                    <input
                      type="text"
                      required
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-sky-500 focus:border-sky-500"
                      value={formData.businessTitle}
                      onChange={(e) => setFormData({ ...formData, businessTitle: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      required
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-sky-500 focus:border-sky-500"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Business Type</label>
                    <select
                      required
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-sky-500 focus:border-sky-500"
                      value={formData.businessType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          businessType: e.target.value,
                          subBusinessType: ''
                        })
                      }
                    >
                      <option value="">Select Type</option>
                      {businessTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  {formData.businessType && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Sub Business Type</label>
                      <select
                        required
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-sky-500 focus:border-sky-500"
                        value={formData.subBusinessType}
                        onChange={(e) =>
                          setFormData({ ...formData, subBusinessType: e.target.value })
                        }
                      >
                        <option value="">Select Sub Type</option>
                        {subBusinessTypes[formData.businessType].map((subType) => (
                          <option key={subType} value={subType}>
                            {subType}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="bg-sky-500 text-white px-6 py-2 rounded-md hover:bg-sky-600"
                  >
                    Next
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-4">
                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700">Street Address</label>
                    <input
                      type="text"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-sky-500 focus:border-sky-500"
                      value={formData.address.street}
                      onChange={(e) => setFormData({
                        ...formData,
                        address: {...formData.address, street: e.target.value}
                      })}
                    />
                  </div> */}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">City</label>
                      <input
                        type="text"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-sky-500 focus:border-sky-500"
                        value={formData.address.city}
                        onChange={(e) => setFormData({
                          ...formData,
                          address: {...formData.address, city: e.target.value}
                        })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Country</label>
                      <input
                        type="text"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-sky-500 focus:border-sky-500"
                        value={formData.address.country}
                        onChange={(e) => setFormData({
                          ...formData,
                          address: {...formData.address, country: e.target.value}
                        })}
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowMap(true)}
                    className="flex items-center space-x-2 text-sky-600 hover:text-sky-700"
                  >
                    <MapPin className="h-5 w-5" />
                    <span>{formData.address.coordinates ? 'Change Location' : 'Select Location on Map'}</span>
                  </button>

                  {formData.address.coordinates && (
                    <div className="text-sm text-gray-500">
                      Selected coordinates: {formData.address.coordinates[0].toFixed(6)}, {formData.address.coordinates[1].toFixed(6)}
                    </div>
                  )}
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="bg-sky-500 text-white px-6 py-2 rounded-md hover:bg-sky-600"
                  >
                    Complete Registration
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>

      <MapSelector
        isOpen={showMap}
        onClose={() => setShowMap(false)}
        onLocationSelect={handleLocationSelect}
        currentLocation={formData.address.coordinates}
      />
    </div>
  );
};

export default SignupPage;