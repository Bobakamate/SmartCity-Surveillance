import React, { useState } from "react";
import CityMap from "../components/CityMap";
import NotificationPanel from "../components/NotificationPanel";
import SupportMap from "../components/SupportMap";
import StatisticsPanel from "../components/StatisticsPanel";
import Sidebar from "../components/Sidebar";

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'map' | 'notifications' | 'support' | "statistic">('map');

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
              <div className="xl:col-span-2 bg-gray-800 rounded-lg shadow-lg overflow-hidden h-[calc(100vh-8rem)]">
                {activeTab === 'map' && <CityMap />}
                {activeTab === 'notifications' && <NotificationPanel />}
                {activeTab === 'support' && <SupportMap />}
                {activeTab === 'statistic' && <StatisticsPanel />}
              </div>
            </div>
          </main>
        </div>
      </div>
  );
};

export default Home;
