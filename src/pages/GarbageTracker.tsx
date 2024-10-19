import React, { useEffect, useState } from "react";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";

import plasticIcon from "../assest/images/water-bottle.png";
import organicIcon from "../assest/images/natural-product.png";
import metalIcon from "../assest/images/screw.png";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: metalIcon,
  iconUrl: metalIcon,
  shadowUrl: metalIcon,
});

const GarbageTracker: React.FC = () => {
  const [selectedPosition, setSelectedPosition] = useState<
    [number, number] | null
  >(null);
  const [wasteData, setWasteData] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    const fetchWasteData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/schedule");
        setWasteData(response.data);
      } catch (error) {
        console.error("Error fetching waste data", error);
      }
    };

    fetchWasteData();
  }, []);

  const LocationMarker: React.FC = () => {
    useMapEvents({
      click(e) {
        setSelectedPosition([e.latlng.lat, e.latlng.lng]);
      },
    });

    return selectedPosition === null ? null : (
      <Marker position={selectedPosition}>
        <Popup>
          Selected Location: <br /> Latitude: {selectedPosition[0]}, Longitude:{" "}
          {selectedPosition[1]}
        </Popup>
      </Marker>
    );
  };

  const getIcon = (wasteType: string) => {
    switch (wasteType) {
      case "plastic":
        return new L.Icon({
          iconUrl: plasticIcon,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        });
      case "organic":
        return new L.Icon({
          iconUrl: organicIcon,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        });
      case "metal":
        return new L.Icon({
          iconUrl: metalIcon,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        });
      default:
        return new L.Icon.Default();
    }
  };

  const filteredWasteData = filter
    ? wasteData.filter((data) => data.wasteType === filter)
    : wasteData;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Garbage Tracker</h1>
      <div className="flex flex-col gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Map</h2>
          <div className="relative aspect-w-16 z-0 aspect-h-9 bg-gray-200 rounded-md">
            <MapContainer
              center={[6.9271, 79.9717]}
              zoom={13}
              className="h-96 w-full rounded-md"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {filteredWasteData.map((data, index) => {
                if (data.latitude && data.longitude) {
                  return (
                    <Marker
                      key={index}
                      position={[data.latitude, data.longitude]}
                      icon={getIcon(data.wasteType)}
                    >
                      <Popup>
                        Waste Type: {data.wasteType} <br />
                        Latitude: {data.latitude}, Longitude: {data.longitude}
                      </Popup>
                    </Marker>
                  );
                }
                return null;
              })}
              <LocationMarker />
            </MapContainer>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Garbage Type</h2>
          <div className="space-y-4">
            {["plastic", "organic", "metal"].map((type, index) => (
              <div key={index} className="flex items-center justify-between">
                <span>
                  {type.charAt(0).toUpperCase() + type.slice(1)} Waste
                </span>
                <button
                  className="bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  onClick={() => setFilter(type)}
                >
                  View in Map
                </button>
              </div>
            ))}
            <button
              className="bg-gray-500 text-white py-1 px-3 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              onClick={() => setFilter("")}
            >
              View All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GarbageTracker;
