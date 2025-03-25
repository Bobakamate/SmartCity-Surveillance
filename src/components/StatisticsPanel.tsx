import React from "react";

const StatisticsPanel: React.FC = () => {
  // Données fictives pour les statistiques
  const statsData = {
    totalCameras: 128,
    onlineCameras: 117,
    totalDetections: 856,
    falsePositives: 42,
    criticalAlerts: 18,
    avgResponseTime: 8.3,
    accuracyRate: 94.5,
    detectionsByType: [
      { type: "Comportement suspect", count: 327, color: "bg-yellow-500" },
      { type: "Criminalité", count: 176, color: "bg-red-500" },
      { type: "Accidents", count: 142, color: "bg-orange-500" },
      { type: "Embouteillages", count: 211, color: "bg-blue-500" },
    ],
    detectionsByHour: [
      { hour: "00:00", count: 17 },
      { hour: "03:00", count: 13 },
      { hour: "06:00", count: 22 },
      { hour: "09:00", count: 84 },
      { hour: "12:00", count: 79 },
      { hour: "15:00", count: 92 },
      { hour: "18:00", count: 103 },
      { hour: "21:00", count: 51 },
    ],
  };
  
  // Trouver la valeur maximale pour la normalisation du graphique
  const maxHourlyCount = Math.max(...statsData.detectionsByHour.map(d => d.count));
  
  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b border-gray-700">
        <h2 className="text-xl font-semibold flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Statistiques
        </h2>
      </div>
      <div className="flex-1 overflow-auto p-4">
        {/* Résumé des statistiques */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-700 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Caméras en service</p>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-bold mt-1">{statsData.onlineCameras}/{statsData.totalCameras}</p>
              <p className="text-green-400 text-sm">
                {Math.round((statsData.onlineCameras / statsData.totalCameras) * 100)}%
              </p>
            </div>
            <div className="w-full h-2 bg-gray-600 rounded-full mt-2 overflow-hidden">
              <div 
                className="h-full bg-green-500 rounded-full" 
                style={{ width: `${(statsData.onlineCameras / statsData.totalCameras) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Total détections</p>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-bold mt-1">{statsData.totalDetections}</p>
              <p className="text-blue-400 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                {statsData.totalDetections > 800 ? '+12% aujourd\'hui' : '+8% aujourd\'hui'}
              </p>
            </div>
          </div>
        </div>

        {/* Précision et alertes */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-700 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Taux de précision</p>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-bold mt-1">{statsData.accuracyRate}%</p>
              <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Faux positifs</p>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-bold mt-1">{statsData.falsePositives}</p>
              <p className="text-yellow-400 text-sm">
                {Math.round((statsData.falsePositives / statsData.totalDetections) * 100)}%
              </p>
            </div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Alertes critiques</p>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-bold mt-1">{statsData.criticalAlerts}</p>
              <div className="h-6 w-6 rounded-full bg-red-500 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Détections par type */}
        <div className="bg-gray-700 rounded-lg p-4 mb-6">
          <h3 className="text-md font-medium mb-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
            Détections par type
          </h3>
          <div className="space-y-3">
            {statsData.detectionsByType.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full ${item.color} mr-2`}></div>
                    <span className="text-sm">{item.type}</span>
                  </div>
                  <span className="text-sm font-medium">{item.count}</span>
                </div>
                <div className="w-full h-2 bg-gray-600 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${item.color} rounded-full`}
                    style={{ width: `${(item.count / statsData.totalDetections) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Détections par heure */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h3 className="text-md font-medium mb-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Détections par heure
          </h3>
          <div className="flex h-40 items-end justify-between">
            {statsData.detectionsByHour.map((hourData, index) => (
              <div key={index} className="flex flex-col items-center w-full">
                <div 
                  className="w-full max-w-8 bg-blue-500 rounded-t-sm mx-1"
                  style={{ 
                    height: `${(hourData.count / maxHourlyCount) * 100}%`,
                    minHeight: '4px'
                  }}
                ></div>
                <span className="text-xs mt-2 text-gray-400">{hourData.hour}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Temps de réponse moyen */}
        <div className="bg-gray-700 rounded-lg p-4 mt-6">
          <h3 className="text-md font-medium mb-2">Temps de réponse moyen</h3>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold">{statsData.avgResponseTime} min</p>
            <div className="flex items-center text-green-400 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              12% plus rapide que le mois dernier
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPanel;