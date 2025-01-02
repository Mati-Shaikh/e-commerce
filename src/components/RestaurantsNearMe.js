import React, { useState, useRef, useCallback } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import "./AddressForm.css";

// Fix for default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const containerStyle = {
  width: "100%",
  height: "450px",
};

// default center of the map
const center = [33.6966781, 73.0508972];

// Custom arrow icon
const arrowIcon = new L.Icon({
  iconUrl: require("./pin.png"),
  iconSize: [24, 24],
  iconAnchor: [12, 24],
});

function SetViewOnClick({ coords, shouldPan }) {
  const map = useMap();
  React.useEffect(() => {
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

  const [mapCenter, setMapCenter] = useState(center); // Change to null or set center to [0, 0];
  const [marker, setMarker] = useState(null);
  const [error, setError] = useState("");
  const [shouldPan, setShouldPan] = useState(false);
  const [nearbyRestaurants, setNearbyRestaurants] = useState([]);
  const mapRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const geocodeAddress = useCallback(async () => {
    setNearbyRestaurants([]);
    const { country, city, area, street, houseNo } = formData;
    const address = `${houseNo} ${street}, ${area}, ${city}, ${country}`.trim();
    if (!address) return;

    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search`,
        {
          params: {
            q: address,
            format: "json",
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
    setNearbyRestaurants([]);
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
            format: "json",
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

  const showRestaurants = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/nearby-restaurants",
        {
          coordinates: formData.coordinates,
        }
      );

      const restaurants = response.data;
      if (restaurants.length === 0) {
        setError("No nearby restaurants found");
      } else {
        setError("");
      }

      if (Array.isArray(restaurants) && restaurants.length > 0) {
        setNearbyRestaurants(restaurants);

        console.log(nearbyRestaurants);

        if (mapRef.current && nearbyRestaurants.length > 0) {
          const bounds = new L.LatLngBounds();
          nearbyRestaurants.forEach((restaurant) => {
            const [lat, lng] = restaurant.coordinates
              .split(",")
              .map((coord) => parseFloat(coord.trim()));
            bounds.extend(new L.LatLng(lat, lng));
          });
          mapRef.current.fitBounds(bounds);
        }
      }
    } catch (err) {
      console.error("Error fetching nearby restaurants:", err);
      setError("Error fetching nearby restaurants. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="form-container">
      <h1 className="form-heading">Restaurants Near Me</h1>
      <div className="form-content">
        <form className="address-form" onSubmit={handleSubmit}>
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
            Confirm Address
          </button>
          <button type="submit" onClick={showRestaurants}>
            Find Restaurants
          </button>
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
          {nearbyRestaurants.map((restaurant, index) => (
            <Marker
              key={index}
              position={restaurant.coordinates
                .split(",")
                .map((coord) => parseFloat(coord.trim()))}
              icon={arrowIcon}
              title={restaurant.name}
            />
          ))}
          <SetViewOnClick coords={mapCenter} shouldPan={shouldPan} />
          <MapEvents />
        </MapContainer>
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default AddressForm;
