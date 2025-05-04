import React, { useState } from "react";

// Définition de l'interface Camera pour la vue caméra
interface Camera {
  id: string;
  lat: number;
  lng: number;
  status: 'En ligne' | 'Hors ligne' | 'En maintenance';
  detections?: number;
}

// Définition de l'interface pour les données de contact pour les appels
interface SupportStation {
  id: string;
  type: string;
  name: string;
  address?: string;
  phone?: string;
  lat?: number;
  lng?: number;
  distance?: number;
  services?: string[];
}

// Interface pour les notifications
interface Notification {
  id: string;
  type: string;
  title: string;
  location: string;
  camera: string;
  time: string;
  description: string;
  status: string;
}

// Props pour le composant NotificationPanel
interface NotificationPanelProps {
  onViewCamera?: (camera: Camera) => void;
  onMakeCall?: (station: SupportStation) => void;
}

// Données fictives des notifications
const notificationsData = [
  {
    id: "N001",
    type: "alert",
    title: "Comportement suspect détecté",
    location: "Boulevard Mohammed V",
    camera: "CAM007",
    time: "14:23",
    description: "Individu rôdant autour de véhicules stationnés",
    status: "new",
  },
  {
    id: "N002",
    type: "accident",
    title: "Accident de la route",
    location: "Avenue Hassan II",
    camera: "CAM004",
    time: "13:51",
    description: "Collision entre deux véhicules, intervention requise",
    status: "urgent",
  },
  {
    id: "N003",
    type: "alert",
    title: "Individu recherché identifié",
    location: "Place du Grand Socco",
    camera: "CAM009",
    time: "12:07",
    description: "Correspondance à 89% avec le suspect de l'affaire #2487",
    status: "new",
  },
  {
    id: "N004",
    type: "maintenance",
    title: "Caméra hors service",
    location: "Rue de Fès",
    camera: "CAM003",
    time: "11:30",
    description: "Perte de connexion avec la caméra",
    status: "pending",
  },
  {
    id: "N005",
    type: "alert",
    title: "Mouvement de foule anormal",
    location: "Marché Municipal",
    camera: "CAM010",
    time: "10:42",
    description: "Agitation inhabituelle détectée, possible altercation",
    status: "new",
  },
  {
    id: "N006",
    type: "accident",
    title: "Piéton renversé",
    location: "Boulevard Mohammed VI",
    camera: "CAM002",
    time: "09:15",
    description: "Piéton heurté par un véhicule, services médicaux nécessaires",
    status: "urgent",
  },
];

// Données fictives des caméras pour la correspondance avec les notifications
const camerasData: Record<string, Camera> = {
  "CAM001": { id: "CAM001", lat: 35.7595, lng: -5.8340, status: "En ligne", detections: 0 },
  "CAM002": { id: "CAM002", lat: 35.7605, lng: -5.8330, status: "En ligne", detections: 2 },
  "CAM003": { id: "CAM003", lat: 35.7585, lng: -5.8320, status: "Hors ligne", detections: 0 },
  "CAM004": { id: "CAM004", lat: 35.7575, lng: -5.8350, status: "En ligne", detections: 1 },
  "CAM007": { id: "CAM007", lat: 35.7565, lng: -5.8360, status: "En ligne", detections: 3 },
  "CAM009": { id: "CAM009", lat: 35.7555, lng: -5.8370, status: "En ligne", detections: 1 },
  "CAM010": { id: "CAM010", lat: 35.7545, lng: -5.8380, status: "En ligne", detections: 2 },
};

// Données fictives pour les agents à qui on peut assigner les notifications
const supportAgents: Record<string, SupportStation> = {
  "AGENT001": { id: "AGENT001", type: "police", name: "Agent Mohammed", phone: "+212 5552-1234" },
  "AGENT002": { id: "AGENT002", type: "police", name: "Agent Fatima", phone: "+212 5552-4321" },
  "AGENT003": { id: "AGENT003", type: "police", name: "Agent Omar", phone: "+212 5552-5678" },
};

const NotificationPanel: React.FC<NotificationPanelProps> = ({ onViewCamera, onMakeCall }) => {
  const [filter, setFilter] = useState<string>("all");
  const [selectedNotification, setSelectedNotification] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>(notificationsData);

  const getFilteredNotifications = () => {
    if (filter === "all") return notifications;
    return notifications.filter((notification) => notification.type === filter);
  };

  // Fonction pour trouver les données de caméra correspondantes
  const findCameraByNotification = (notificationId: string): Camera | null => {
    const notification = notifications.find(n => n.id === notificationId);
    if (!notification) return null;

    const camera = camerasData[notification.camera];
    return camera || null;
  };

  // Fonction pour marquer une notification comme traitée
  const handleMarkAsResolved = (notificationId: string) => {
    setNotifications(prevNotifications =>
        prevNotifications.map(notification =>
            notification.id === notificationId
                ? { ...notification, status: "resolved" }
                : notification
        )
    );
  };

  // Fonction pour assigner une notification à un agent
  const handleAssign = (notificationId: string) => {
    // Utiliser l'Agent Mohammed comme exemple
    if (onMakeCall) {
      onMakeCall(supportAgents["AGENT001"]);
    }
  };

  // Fonction pour visualiser la caméra associée à une notification
  const handleViewOnMap = (notificationId: string) => {
    const camera = findCameraByNotification(notificationId);
    if (camera && onViewCamera) {
      onViewCamera(camera);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "alert":
        return (
            <div className="w-10 h-10 rounded-lg bg-red-500 bg-opacity-20 flex items-center justify-center text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
        );
      case "accident":
        return (
            <div className="w-10 h-10 rounded-lg bg-red-500 bg-opacity-20 flex items-center justify-center text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
              </svg>
            </div>
        );
      case "maintenance":
        return (
            <div className="w-10 h-10 rounded-lg bg-yellow-500 bg-opacity-20 flex items-center justify-center text-yellow-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
        );
      default:
        return (
            <div className="w-10 h-10 rounded-lg bg-blue-500 bg-opacity-20 flex items-center justify-center text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
        );
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "urgent":
        return <span className="px-2 py-1 text-xs bg-red-500 text-white rounded-full">Urgent</span>;
      case "new":
        return <span className="px-2 py-1 text-xs bg-blue-500 text-white rounded-full">Nouveau</span>;
      case "pending":
        return <span className="px-2 py-1 text-xs bg-yellow-500 text-white rounded-full">En attente</span>;
      case "resolved":
        return <span className="px-2 py-1 text-xs bg-green-500 text-white rounded-full">Traité</span>;
      default:
        return null;
    }
  };

  return (
      <div className="h-full flex flex-col">
        <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            Notifications
            <span className="ml-2 px-2 py-1 bg-red-500 text-xs rounded-full">{notifications.filter(n => n.status !== "resolved").length}</span>
          </h2>
          <div className="flex space-x-2">
            <button
                className={`px-3 py-1 rounded-md text-sm ${filter === "all" ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"}`}
                onClick={() => setFilter("all")}
            >
              Tous
            </button>
            <button
                className={`px-3 py-1 rounded-md text-sm ${filter === "alert" ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"}`}
                onClick={() => setFilter("alert")}
            >
              Alertes
            </button>
            <button
                className={`px-3 py-1 rounded-md text-sm ${filter === "accident" ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"}`}
                onClick={() => setFilter("accident")}
            >
              Accidents
            </button>
            <button
                className={`px-3 py-1 rounded-md text-sm ${filter === "maintenance" ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"}`}
                onClick={() => setFilter("maintenance")}
            >
              Maintenance
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {getFilteredNotifications().map((notification) => (
              <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-700 hover:bg-gray-700 cursor-pointer transition-colors ${
                      selectedNotification === notification.id ? "bg-gray-700" : ""
                  } ${notification.status === "resolved" ? "bg-green-900 bg-opacity-20" : ""}`}
                  onClick={() => setSelectedNotification(notification.id === selectedNotification ? null : notification.id)}
              >
                <div className="flex">
                  {getTypeIcon(notification.type)}
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-semibold">{notification.title}</h3>
                      {getStatusBadge(notification.status)}
                    </div>
                    <div className="text-sm text-gray-400 mt-1">
                      <div className="flex justify-between">
                        <span>{notification.location} • {notification.camera}</span>
                        <span>{notification.time}</span>
                      </div>
                    </div>
                    {selectedNotification === notification.id && (
                        <div className="mt-3 text-sm">
                          <p>{notification.description}</p>
                          {notification.status !== "resolved" && (
                              <div className="mt-4 flex space-x-3">
                                <button
                                    className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleViewOnMap(notification.id);
                                    }}
                                >
                                  Voir sur la carte
                                </button>
                                <button
                                    className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleMarkAsResolved(notification.id);
                                    }}
                                >
                                  Marquer comme traité
                                </button>
                                <button
                                    className="px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleAssign(notification.id);
                                    }}
                                >
                                  Assigner
                                </button>
                              </div>
                          )}
                        </div>
                    )}
                  </div>
                </div>
              </div>
          ))}
        </div>
      </div>
  );
};

export default NotificationPanel;