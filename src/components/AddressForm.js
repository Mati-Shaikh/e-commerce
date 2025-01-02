import React, { useState, useRef, useCallback, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import axios from "axios";
import 'leaflet/dist/leaflet.css';
import './AddressForm.css';

// Fix for default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const containerStyle = {
  width: "100%",
  height: "450px",
};

const center = [0, 0];

function SetViewOnClick({ coords, shouldPan }) {
  const map = useMap();
  useEffect(() => {
    if (shouldPan && coords[0] !== 0 && coords[1] !== 0) {
      map.setView(coords, 13);
    }
  }, [coords, map, shouldPan]);
  return null;
}

function AddressForm() {
  const [formData, setFormData] = useState({
    country: "",
    city: "",
    area: "",
    street: "",
    houseNo: "",
    coordinates: "",
  });

  const [mapCenter, setMapCenter] = useState(center);
  const [marker, setMarker] = useState(null);
  const [error, setError] = useState("");
  const [shouldPan, setShouldPan] = useState(false);
  const mapRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const geocodeAddress = useCallback(async () => {
    const { country, city, area, street, houseNo } = formData;
    const address = `${houseNo} ${street}, ${area}, ${city}, ${country}`.trim();
    if (!address) return;

    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search`,
        {
          params: {
            q: address,
            format: 'json',
            limit: 1,
            addressdetails: 1,
          },
        }
      );

      if (response.data.length > 0) {
        const { lat, lon, address: details } = response.data[0];
        setMapCenter([parseFloat(lat), parseFloat(lon)]);
        setMarker([parseFloat(lat), parseFloat(lon)]);
        setShouldPan(true);
        setFormData((prevData) => ({
          ...prevData,
          country: details.country || prevData.country,
          city: details.city || details.town || prevData.city,
          area: details.suburb || prevData.area,
          street: details.road || prevData.street,
          houseNo: details.house_number || prevData.houseNo,
          coordinates: `${lat}, ${lon}`,
        }));
        setError("");
      } else {
        setError("No location found for this address");
      }
    } catch (error) {
      console.error("Error geocoding:", error);
      setError("Error finding location");
    }
  }, [formData]);

  const handleMapClick = useCallback(async (e) => {
    const { lat, lng } = e.latlng;
    setMarker([lat, lng]);
    setMapCenter([lat, lng]);
    setShouldPan(true);
    setFormData((prevData) => ({
      ...prevData,
      coordinates: `${lat}, ${lng}`,
    }));

    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse`,
        {
          params: {
            lat: lat,
            lon: lng,
            format: 'json',
            addressdetails: 1,
          },
        }
      );

      if (response.data) {
        const { address } = response.data;
        const newFormData = {
          country: address.country || "",
          city: address.city || address.town || "",
          area: address.suburb || address.neighbourhood || address.county || "",
          street: address.road || "",
          houseNo: address.house_number || "",
          coordinates: `${lat}, ${lng}`,
        };

        setFormData(newFormData);
        setError("");
      } else {
        setError("No address found for this location");
      }
    } catch (error) {
      console.error("Error reverse geocoding:", error);
      setError("Error fetching address information");
    }
  }, []);

  const MapEvents = () => {
    useMapEvents({
      click: handleMapClick,
      dragstart: () => setShouldPan(false),
      zoomstart: () => setShouldPan(false),
    });
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      await axios.post("http://localhost:3001/api/save-address", formData);
      alert("Address saved successfully!");
    } catch (error) {
      console.error("Error saving address:", error);
      setError("Error saving address. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-heading">Address Locator</h1>
      <div className="form-content">
        <form onSubmit={handleSubmit} className="address-form">
          <input
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            placeholder="Country"
          />
          <input
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            placeholder="City"
          />
          <input
            name="area"
            value={formData.area}
            onChange={handleInputChange}
            placeholder="Area"
          />
          <input
            name="street"
            value={formData.street}
            onChange={handleInputChange}
            placeholder="Street"
          />
          <input
            name="houseNo"
            value={formData.houseNo}
            onChange={handleInputChange}
            placeholder="House No"
          />
          <input
            name="coordinates"
            value={formData.coordinates}
            placeholder="Coordinates"
            readOnly
          />
          <button type="button" onClick={geocodeAddress}>
            Find Coordinates
          </button>
          <button type="submit">Save Address</button>
        </form>

        <MapContainer 
          center={mapCenter} 
          zoom={13} 
          style={containerStyle} 
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {marker && <Marker position={marker} />}
          <SetViewOnClick coords={mapCenter} shouldPan={shouldPan} />
          <MapEvents />
        </MapContainer>
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default AddressForm;