import React, { useState, useEffect } from "react";
import CityMap from "../components/CityMap";
import NotificationPanel from "../components/NotificationPanel";
import SupportMap from "../components/SupportMap";
import StatisticsPanel from "../components/StatisticsPanel";
import Sidebar from "../components/Sidebar";
import CameraWidget from "../components/Camera";
import Call from "../components/Call";

// Définition de l'interface Camera
interface Camera {
    id: string;
    lat: number;
    lng: number;
    status: 'En ligne' | 'Hors ligne' | 'En maintenance';
    detections: number;
}

// Interface pour les stations de support
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

const Home: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'map' | 'notifications' | 'support' | 'statistic'>('map');
    const [cameraData, setCameraData] = useState<Camera | null>(null);
    const [callData, setCallData] = useState<SupportStation | null>(null);

    // Exposer les gestionnaires pour les composants enfants via window
    useEffect(() => {
        // Exposer les fonctions au niveau global pour permettre aux composants enfants d'y accéder
        window.onViewCamera = handleViewCamera;
        window.onMakeCall = handleMakeCall;

        // Nettoyer les références lors du démontage du composant
        return () => {
            delete window.onViewCamera;
            delete window.onMakeCall;
        };
    }, []);

    // Gestionnaire pour afficher la caméra
    const handleViewCamera = (camera: Camera) => {
        setCameraData(camera);
        setCallData(null); // Fermer l'appel s'il est ouvert
    };

    // Gestionnaire pour fermer la vue de la caméra
    const handleCloseCamera = () => {
        setCameraData(null);
    };

    // Gestionnaire pour initialiser un appel
    const handleMakeCall = (station: SupportStation) => {
        setCallData(station);
        setCameraData(null); // Fermer la caméra si elle est ouverte
    };

    // Gestionnaire pour fermer la vue d'appel
    const handleCloseCall = () => {
        setCallData(null);
    };

    // Détermine quel contenu afficher en priorité
    const getActiveContent = () => {
        if (cameraData) {
            return <CameraWidget data={cameraData} onClose={handleCloseCamera} />;
        } else if (callData) {
            return <Call data={callData} onClose={handleCloseCall} />;
        } else {
            // Si pas de données spéciales, affiche le contenu selon l'onglet actif
            switch (activeTab) {
                case 'map':
                    return <CityMap onViewCamera={handleViewCamera} />;
                case 'notifications':
                    return <NotificationPanel onViewCamera={handleViewCamera} onMakeCall={handleMakeCall} />;
                case 'support':
                    return <SupportMap onMakeCall={handleMakeCall} />;
                case 'statistic':
                    return <StatisticsPanel />;
                default:
                    return <CityMap onViewCamera={handleViewCamera} />;
            }
        }
    };

    return (
        <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
            {/* Sidebar */}
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-gray-800 px-6 py-4 flex items-center justify-between shadow-md">
                    <h1 className="text-2xl font-bold">
                        <span className="text-blue-400">Smart</span>City Surveillance
                    </h1>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <button className="p-2 rounded-full hover:bg-gray-700">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                <span className="absolute top-0 right-0 bg-red-500 text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  6
                </span>
                            </button>
                        </div>
                        <div className="border-l border-gray-600 h-8"></div>
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-500 rounded-full mr-2"></div>
                            <span>Agent Policier</span>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="flex-1 p-6 overflow-auto">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        {/* Main panel */}
                        <div className="xl:col-span-2 overflow-hidden bg-gray-800 rounded-lg shadow-lg overflow-hidden h-[calc(100vh-8rem)]">
                            {getActiveContent()}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

// Augmenter la définition de Window pour inclure nos fonctions personnalisées
declare global {
    interface Window {
        onViewCamera: (camera: Camera) => void;
        onMakeCall: (station: SupportStation) => void;
    }
}

export default Home;