import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Types pour les données de caméras
interface Camera {
  id: string;
  lat: number;
  lng: number;
  status: 'En ligne' | 'Hors ligne' | 'En maintenance';
  detections: number;
}

// Props pour notre composant CityMap
interface CityMapProps {
  onViewCamera?: (camera: Camera) => void;
}

// Données fictives des caméras
const camerasData: Camera[] = [
  { id: "CAM001", lat: 35.759465, lng: -5.833954, status: "En ligne", detections: 24 },
  { id: "CAM002", lat: 35.769932, lng: -5.823911, status: "En ligne", detections: 17 },
  { id: "CAM003", lat: 35.779241, lng: -5.813868, status: "Hors ligne", detections: 0 },
  { id: "CAM004", lat: 35.761822, lng: -5.843997, status: "En ligne", detections: 32 },
  { id: "CAM005", lat: 35.775532, lng: -5.833954, status: "En ligne", detections: 8 },
  { id: "CAM006", lat: 35.771823, lng: -5.819125, status: "En maintenance", detections: 5 },
  { id: "CAM007", lat: 35.765446, lng: -5.828996, status: "En ligne", detections: 41 },
  { id: "CAM008", lat: 35.758965, lng: -5.819125, status: "En ligne", detections: 19 },
  { id: "CAM009", lat: 35.771823, lng: -5.828996, status: "En ligne", detections: 27 },
  { id: "CAM010", lat: 35.767803, lng: -5.836954, status: "En ligne", detections: 13 },
];

// Fonction personnalisée pour créer des icônes de marqueur
const createMarkerIcon = (detections: 'En ligne' | 'Hors ligne' | 'En maintenance') => {
  let color = 'yellow';
  if (detections == "Hors ligne") color = 'red';
  if (detections == "En ligne") color = 'green';

  return L.divIcon({
    className: 'custom-marker-icon',
    html: `<div style="background-color:${color};width:15px;height:15px;border-radius:50%;border:2px solid white;"></div>`,
    iconSize: [15, 15],
    iconAnchor: [7, 7]
  });
};

const CityMap: React.FC<CityMapProps> = ({ onViewCamera }) => {
  const [mapType, setMapType] = useState<'standard' | 'satellite'>('standard');

  // Position centrale de Tanger
  const centerPosition: [number, number] = [35.7595, -5.8340];

  // Gestionnaire pour le clic sur "Voir la camera"
  const handleViewCamera = (camera: Camera) => {
    if (onViewCamera) {
      onViewCamera(camera);
    }
  };

  return (
      <div className="h-full flex flex-col rounded-lg overflow-hidden border border-gray-700 shadow-lg">
        {/* En-tête */}
        <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between bg-gray-900 text-white">
          <h2 className="text-xl font-semibold">Carte de Surveillance de Tanger</h2>
          <div className="flex space-x-2">
            <button
                className={`px-3 py-1 rounded-md text-sm ${
                    mapType === 'satellite'
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-gray-700 hover:bg-gray-600'
                }`}
                onClick={() => setMapType('satellite')}
            >
              Vue Satellite
            </button>
            <button
                className={`px-3 py-1 rounded-md text-sm ${
                    mapType === 'standard'
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-gray-700 hover:bg-gray-600'
                }`}
                onClick={() => setMapType('standard')}
            >
              Vue Standard
            </button>
          </div>
        </div>

        {/* Conteneur de la carte */}
        <div className="flex-1 relative">
          <MapContainer
              center={centerPosition}
              zoom={13}
              scrollWheelZoom={false}
              className="h-full w-full z-10"
          >
            {/* Couche de tuiles */}
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

            {/* Marqueurs des caméras */}
            {camerasData.map((camera) => (
                <Marker
                    key={camera.id}
                    position={[camera.lat, camera.lng]}
                    icon={createMarkerIcon(camera.status)}
                >
                  <Popup>
                    <div>
                      <h3 className="font-bold">{camera.id}</h3>
                      <p>Status: {camera.status}</p>
                      <p>Détections: {camera.detections}</p>
                      <p className="text-xs">
                        Coordonnées: {camera.lat.toFixed(4)}, {camera.lng.toFixed(4)}
                      </p>
                      <button
                          className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                          onClick={() => handleViewCamera(camera)}
                      >
                        Voir la camera
                      </button>
                    </div>
                  </Popup>
                </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Pied de page - Légende */}
        <div className="p-3 bg-gray-900 border-t border-gray-700 text-white">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <div className="flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                <span>En ligne</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-red-500 rounded-full mr-1"></span>
                <span>Hors ligne</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-yellow-400 rounded-full mr-1"></span>
                <span>En maintenance</span>
              </div>
            </div>
            <div>
              Total des caméras: {camerasData.length} |
              En ligne: {camerasData.filter(c => c.status === 'En ligne').length}
            </div>
          </div>
        </div>
      </div>
  );
};

export default CityMap;