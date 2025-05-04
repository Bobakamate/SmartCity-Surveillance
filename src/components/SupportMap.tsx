import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Types for support stations
interface SupportStation {
  id: string;
  type: 'police' | 'fire' | 'medical' | 'other';
  name: string;
  address: string;
  phone: string;
  lat: number;
  lng: number;
  distance: number;
  services: string[];
}

// Props definition to receive the call handler
interface SupportMapProps {
  onMakeCall: (station: SupportStation) => void;
}

// Mock support stations data with more details
const supportStationsData: SupportStation[] = [
  {
    id: "POL001",
    type: "police",
    name: "Poste Central",
    address: "Avenue Mohammed V, Tanger",
    phone: "+212 5 39 93 20 50",
    lat: 35.769465,
    lng: -5.833954,
    distance: 1.2,
    services: ['Plainte', 'Urgence', 'Renseignements', 'Passeport']
  },
  {
    id: "POL002",
    type: "police",
    name: "Commissariat de Tanger-Médina",
    address: "Rue de la Liberté, Médina",
    phone: "+212 5 39 93 21 30",
    lat: 35.777932,
    lng: -5.823911,
    distance: 2.7,
    services: ['Sécurité publique', 'Contrôle', 'Intervention']
  },
  {
    id: "FIR001",
    type: "fire",
    name: "Caserne de Pompiers Principale",
    address: "Boulevard Pasteur, Tanger",
    phone: "+212 5 39 93 40 00",
    lat: 35.764822,
    lng: -5.840997,
    distance: 0.8,
    services: ['Secours d\'urgence', 'Intervention incendie', 'Sauvetage']
  },
  {
    id: "MED001",
    type: "medical",
    name: "Hôpital Mohammed V",
    address: "Rue Al Moutanabi, Centre-ville",
    phone: "+212 5 39 93 50 50",
    lat: 35.767823,
    lng: -5.819125,
    distance: 2.1,
    services: ['Urgences', 'Consultations', 'Chirurgie', 'Radiologie']
  },
  {
    id: "OTHER001",
    type: "other",
    name: "Protection Civile",
    address: "Zone Industrielle, Tanger",
    phone: "+212 5 39 93 60 70",
    lat: 35.762446,
    lng: -5.828996,
    distance: 1.5,
    services: ['Gestion des catastrophes', 'Assistance humanitaire', 'Secours']
  }
];

// User/incident position
const userPosition: [number, number] = [35.765446, -5.830996];

// Custom marker icon creation function
const createStationMarkerIcon = (type: string) => {
  const iconColors = {
    'police': 'blue',
    'fire': 'red',
    'medical': 'green',
    'other': 'purple'
  };

  return L.divIcon({
    className: 'custom-marker-icon',
    html: `<div style="background-color:${iconColors[type] || 'gray'};width:15px;height:15px;border-radius:50%;border:2px solid white;"></div>`,
    iconSize: [15, 15],
    iconAnchor: [7, 7]
  });
};

const SupportStationsMap: React.FC<SupportMapProps> = ({ onMakeCall }) => {
  const [selectedStation, setSelectedStation] = useState<SupportStation | null>(null);
  const [mapType, setMapType] = useState<'standard' | 'satellite'>('standard');

  // Center position of Tangier
  const centerPosition: [number, number] = [35.7595, -5.8340];

  // Generate mock routing data
  const generateRouting = (start: [number, number], end: [number, number]) => {
    // This would typically be done with a routing API in real-world scenario
    const steps = [
      start,
      [start[0] + (end[0] - start[0]) * 0.3, start[1] + (end[1] - start[1]) * 0.3],
      [start[0] + (end[0] - start[0]) * 0.7, start[1] + (end[1] - start[1]) * 0.7],
      end
    ];
    return steps;
  };

  // Handle call button click
  const handleCallButtonClick = (e: React.MouseEvent, station: SupportStation) => {
    e.stopPropagation(); // Prevent the card click from triggering
    onMakeCall(station);
  };

  return (
      <div className="container mx-auto p-4 max-w-6xl">
        <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
          {/* Map Container */}
          <div className="w-full md:w-2/3 h-[500px]">
            <MapContainer
                center={centerPosition}
                zoom={13}
                scrollWheelZoom={false}
                className="h-full w-full z-10"
            >
              <TileLayer
                  url={
                    mapType === 'satellite'
                        ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                        : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                  }
                  attribution={
                    mapType === 'satellite'
                        ? 'Tiles © Esri'
                        : '© OpenStreetMap contributors'
                  }
              />

              {/* User Position Marker */}
              <Marker
                  position={userPosition}
                  icon={L.divIcon({
                    className: 'custom-marker-icon',
                    html: `<div style="background-color:yellow;width:20px;height:20px;border-radius:50%;border:3px solid white;"></div>`,
                    iconSize: [20, 20],
                    iconAnchor: [10, 10]
                  })}
              >
                <Popup>Votre position</Popup>
              </Marker>

              {/* Support Stations Markers */}
              {supportStationsData.map((station) => (
                  <Marker
                      key={station.id}
                      position={[station.lat, station.lng]}
                      icon={createStationMarkerIcon(station.type)}
                      eventHandlers={{
                        click: () => setSelectedStation(station)
                      }}
                  >
                    <Popup>
                      <div>
                        <h3 className="font-bold">{station.name}</h3>
                        <p>Adresse: {station.address}</p>
                        <p>Téléphone: {station.phone}</p>
                        <p>Distance: {station.distance} km</p>
                      </div>
                    </Popup>
                  </Marker>
              ))}

              {/* Routing Line */}
              {selectedStation && (
                  <Polyline
                      positions={generateRouting(userPosition, [selectedStation.lat, selectedStation.lng])}
                      color="blue"
                      weight={5}
                      opacity={0.7}
                  />
              )}
            </MapContainer>
          </div>

          {/* Services List */}
          <div className="w-full md:w-1/3 bg-gray-800 p-4 overflow-y-auto max-h-[500px]">
            <h3 className="text-xl font-semibold text-white mb-4">Services de Soutien</h3>
            {supportStationsData.map((station) => (
                <div
                    key={station.id}
                    className={`mb-4 p-3 rounded-lg transition-all duration-300 
                ${selectedStation?.id === station.id
                        ? 'bg-blue-900 border-2 border-blue-600'
                        : 'bg-gray-900 hover:bg-gray-700'}`}
                    onClick={() => setSelectedStation(station)}
                >
                  <div className="flex items-center mb-2">
                    <div
                        className={`w-4 h-4 rounded-full mr-3 
                    ${station.type === 'police' ? 'bg-blue-500' :
                            station.type === 'fire' ? 'bg-red-500' :
                                station.type === 'medical' ? 'bg-green-500' :
                                    'bg-purple-500'}`}
                    ></div>
                    <h4 className="text-white font-medium">{station.name}</h4>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{station.address}</p>
                  <p className="text-gray-300 text-xs mb-2">Distance: {station.distance} km</p>
                  <div className="mt-2">
                    <h5 className="text-gray-200 text-xs font-semibold mb-1">Services:</h5>
                    <ul className="list-disc list-inside text-gray-300 text-xs">
                      {station.services.map((service, index) => (
                          <li key={index}>{service}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-3 flex justify-between">
                    <button
                        className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md text-xs"
                        onClick={(e) => handleCallButtonClick(e, station)}
                    >
                      Appeler
                    </button>
                    <button
                        className="text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded-md text-xs"
                        onClick={() => setSelectedStation(station)}
                    >
                      Itinéraire
                    </button>
                  </div>
                </div>

            ))}
            <div className="pt-20">

            </div>
          </div>
        </div>
      </div>
  );
};

export default SupportStationsMap;