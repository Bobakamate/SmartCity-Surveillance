import React, { useState, useEffect } from 'react';
import { ArrowLeft, WifiOff, AlertTriangle } from 'lucide-react';

// Types pour les données de caméras
interface Camera {
    id: string;
    name?: string;
    location?: string;
    status: 'En ligne' | 'Hors ligne' | 'En maintenance';
    thumbnail?: string;
    videoUrl?: string;
    lat?: number;
    lng?: number;
    detections?: number;
}

interface CameraWidgetProps {
    data: Camera;
    onClose: () => void;
}

// Données fictives des caméras avec des vidéos différentes
const camerasData: Camera[] = [
    { id: "CAM001", name: "Centre-ville", location: "Place Mohammed V", status: "En ligne", thumbnail: "/assets/camera_1.jpeg", videoUrl: "/assets/video_1.mp4" },
    { id: "CAM002", name: "Médina", location: "Rue de la Kasbah", status: "En ligne", thumbnail: "/assets/camera_2.png", videoUrl: "/assets/video_2.mp4" },
    { id: "CAM003", name: "Port", location: "Terminal passagers", status: "Hors ligne", thumbnail: "/assets/camera_h.png", videoUrl: "/assets/error.mp4" },
    { id: "CAM004", name: "Gare", location: "Entrée principale", status: "En ligne", thumbnail: "/assets/camera_4.jpg", videoUrl: "/assets/video_3.mp4" },
    { id: "CAM005", name: "Marché", location: "Grand Socco", status: "En ligne", thumbnail: "/assets/camera_3.jpg", videoUrl: "/assets/video_2.mp4" },
    { id: "CAM006", name: "Plage", location: "Promenade", status: "En maintenance", thumbnail: "/assets/camera_h.png", videoUrl: "/assets/error.mp4" },
    { id: "CAM007", name: "Parc", location: "Entrée ouest", status: "En ligne", thumbnail: "/assets/camera_2.png", videoUrl: "/assets/video_1.mp4" },
    { id: "CAM008", name: "Avenue principale", location: "Boulevard Mohammed VI", status: "En ligne", thumbnail: "/assets/29013463_7508873.jpg", videoUrl: "/assets/video_3.mp4" },
];

const CameraWidget: React.FC<CameraWidgetProps> = ({ data, onClose }) => {
    // Trouver une caméra correspondante dans les données fictives ou utiliser les données fournies
    const [selectedCamera, setSelectedCamera] = useState<Camera>(() => {
        // Chercher d'abord dans les données fictives
        const foundCamera = camerasData.find(cam => cam.id === data.id);
        if (foundCamera) return foundCamera;

        // Sinon, utiliser les données fournies et les compléter si nécessaire
        return {
            ...data,
            name: data.name || `Caméra ${data.id}`,
            location: data.location || `Position: ${data.lat?.toFixed(4)}, ${data.lng?.toFixed(4)}`,
            thumbnail: data.thumbnail || "/api/placeholder/480/320",
            videoUrl: data.videoUrl || "/assets/video_1.mp4"
        };
    });

    const [currentVideo, setCurrentVideo] = useState<string>(selectedCamera.videoUrl || "");
    const [isLive, setIsLive] = useState<boolean>(true);

    useEffect(() => {
        // Réinitialiser à la vue en direct lors du changement de caméra
        setIsLive(true);
        setCurrentVideo(selectedCamera.videoUrl || "");
    }, [selectedCamera]);

    const handleCameraSelect = (camera: Camera) => {
        setSelectedCamera(camera);
    };

    // Message d'état pour les caméras hors ligne ou en maintenance
    const renderCameraStatusMessage = () => {
        if (selectedCamera.status === "Hors ligne") {
            return (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 text-white">
                    <WifiOff size={64} className="text-red-500 mb-4" />
                    <h3 className="text-xl font-bold">Caméra hors ligne</h3>
                    <p className="text-gray-300 mt-2">Cette caméra n'est pas disponible pour le moment</p>
                </div>
            );
        } else if (selectedCamera.status === "En maintenance") {
            return (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 text-white">
                    <AlertTriangle size={64} className="text-yellow-400 mb-4" />
                    <h3 className="text-xl font-bold">Caméra en maintenance</h3>
                    <p className="text-gray-300 mt-2">Cette caméra est temporairement indisponible pour maintenance</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="flex flex-col h-full bg-gray-900 text-white overflow-hidden">
            {/* Header avec bouton de retour */}
            <div className="py-4 px-6 border-b border-gray-700 flex items-center">
                <button
                    className="p-2 mr-4 bg-gray-800 rounded-full hover:bg-gray-700"
                    onClick={onClose}
                >
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-2xl font-semibold">Système de Surveillance</h1>
            </div>

            {/* Contenu principal */}
            <div className="flex flex-1 overflow-hidden">
                {/* Liste des caméras (gauche) */}
                <div className="w-1/3 border-r border-gray-700 overflow-y-auto">
                    <div className="p-4 border-b border-gray-700">
                        <h2 className="text-xl font-medium">Caméras</h2>
                    </div>

                    <div className="divide-y divide-gray-700">
                        {camerasData.map((camera) => (
                            <div
                                key={camera.id}
                                className={`p-4 hover:bg-gray-800 cursor-pointer transition-colors ${
                                    selectedCamera.id === camera.id ? 'bg-gray-800' : ''
                                }`}
                                onClick={() => handleCameraSelect(camera)}
                            >
                                <div className="flex items-center mb-2">
                                    <div className="relative mr-3">
                                        <div className="w-16 h-10 bg-gray-700 rounded overflow-hidden">
                                            <img
                                                src={camera.thumbnail}
                                                alt={camera.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = "/api/placeholder/60/40";
                                                }}
                                            />
                                        </div>
                                        <span
                                            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${
                                                camera.status === 'En ligne'
                                                    ? 'bg-green-500'
                                                    : camera.status === 'Hors ligne'
                                                        ? 'bg-red-500'
                                                        : 'bg-yellow-400'
                                            }`}
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-medium">{camera.name}</h3>
                                        <p className="text-sm text-gray-400">{camera.location}</p>
                                    </div>
                                </div>
                                <div className="text-xs text-gray-400">
                                    {camera.status}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Vidéo (droite) */}
                <div className="w-2/3 flex flex-col">
                    {/* Zone de la vidéo */}
                    <div className="p-4 flex-1">
                        <div className="relative h-full rounded-lg overflow-hidden bg-black">
                            <video
                                src={currentVideo}
                                className="w-full h-full object-contain"
                                autoPlay
                                muted
                                loop
                                controls
                                controlsList="nodownload"
                                preload="auto"
                                poster={selectedCamera.thumbnail}
                            />
                            {isLive && selectedCamera.status === "En ligne" && (
                                <div className="absolute top-4 left-4 bg-red-600 text-white text-xs px-2 py-1 rounded flex items-center">
                                    <span className="flex h-2 w-2 mr-1">
                                        <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                    </span>
                                    LIVE
                                </div>
                            )}
                            <div className="absolute top-4 right-4 bg-gray-800 bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                                {selectedCamera.name} - {selectedCamera.location}
                            </div>

                            {/* Message d'état pour les caméras hors ligne ou en maintenance */}
                            {renderCameraStatusMessage()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CameraWidget;



