import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { X, Search, MapPin } from 'lucide-react';
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
  const [locationDetails, setLocationDetails] = useState({
    city: '',
    country: '',
    lat: '',
    lon: '',
  });

  const MapClickHandler = () => {
    useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;
        setMarker([lat, lng]);
        // Reverse geocode the clicked location
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
          );
          const result = await response.json();
          if (result) {
            setLocationDetails({
              city: result.address.city || result.address.town || result.address.village || '',
              country: result.address.country || '',
              lat: lat.toFixed(6),
              lon: lng.toFixed(6),
            });
          }
        } catch (error) {
          console.error('Error fetching location details:', error);
        }
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
        const { lat, lon, display_name } = results[0];
        const reverseResponse = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
        );
        const reverseResult = await reverseResponse.json();
        
        setMarker([parseFloat(lat), parseFloat(lon)]);
        setLocationDetails({
          city: reverseResult.address.city || reverseResult.address.town || reverseResult.address.village || '',
          country: reverseResult.address.country || '',
          lat: parseFloat(lat).toFixed(6),
          lon: parseFloat(lon).toFixed(6),
        });
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  const handleConfirm = () => {
    onLocationSelect({
      coordinates: marker,
      city: locationDetails.city,
      country: locationDetails.country
    });
    onClose();
  };

  if (!isOpen) return null;

  // Custom marker icon
  const customIcon = new L.Icon({
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    shadowSize: [41, 41],
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

        {/* Display location details form */}
        <div className="p-4 space-y-2">
          {locationDetails.city && (
            <p><strong>City: </strong>{locationDetails.city}</p>
          )}
          {locationDetails.country && (
            <p><strong>Country: </strong>{locationDetails.country}</p>
          )}
          <p><strong>Latitude: </strong>{locationDetails.lat}</p>
          <p><strong>Longitude: </strong>{locationDetails.lon}</p>
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
    address: {
      street: '',
      city: '',
      country: '',
      coordinates: null
    }
  });
  
  const [showMap, setShowMap] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const businessTypes = ['Manufacturer', 'Retailer', 'Rental','Rental and Retailer','Manufacturer And Retailer'];

  const handleLocationSelect = (locationData) => {
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        coordinates: locationData.coordinates,
        city: locationData.city,
        country: locationData.country
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.shopName || !formData.businessTitle || !formData.description || !formData.businessType) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/business/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage('Business registered successfully. Awaiting admin approval.');
      } else {
        alert('Error during registration: ' + result.message);
      }
    } catch (error) {
      alert('An error occurred during registration. Please try again.');
    }

    setLoading(false);
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
                  {/* Name, Email, Phone, Shop Name, Business Title, Description Fields */}
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
                      onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    >
                      <option value="">Select Type</option>
                      {businessTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
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
                {/* Location Section */}
                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={() => setShowMap(true)}
                    className="flex items-center space-x-2 text-sky-600 hover:text-sky-700"
                  >
                    <MapPin className="h-5 w-5" />
                    <span>{formData.address.coordinates ? 'Change Location' : 'Select Location on Map'}</span>
                  </button>

                  {formData.address.coordinates && (
                    <div className="text-sm text-gray-500 space-y-2">
                      <p><strong>City: </strong>{formData.address.city}</p>
                      <p><strong>Country: </strong>{formData.address.country}</p>
                      <p><strong>Coordinates: </strong>{formData.address.coordinates[0].toFixed(6)}, {formData.address.coordinates[1].toFixed(6)}</p>
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
                    disabled={loading}
                  >
                    {loading ? 'Registering...' : 'Complete Registration'}
                  </button>
                </div>
              </>
            )}
          </form>

          {successMessage && (
            <div className="mt-4 text-green-500 font-semibold text-center">
              {successMessage}
            </div>
          )}
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
