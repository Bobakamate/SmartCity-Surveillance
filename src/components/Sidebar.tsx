import React from "react";

interface SidebarProps {
  activeTab: 'map' | 'notifications' | 'support' | "statistic";
  setActiveTab: (tab: 'map' | 'notifications' | 'support' | "statistic") => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    {
      id: 'map',
      title: 'Carte',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
      badge: 6,
    },
    {
      id: 'support',
      title: 'Soutien',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      id: 'statistic',
      title: 'Statistic',
      icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24"
               stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
          </svg>
      ),
    },
  ];

  return (
      <div className="w-20 md:w-64 bg-gray-800 flex flex-col shadow-xl">
        {/* Logo */}
        <div className="p-4 border-b border-gray-700 flex items-center justify-center md:justify-start">
          <div className="h-10 w-10 bg-blue-500 rounded-lg flex items-center justify-center mr-0 md:mr-3">
            <span className="font-bold text-lg">SC</span>
          </div>
          <h1 className="text-xl font-bold hidden md:block">SmartCity</h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 pt-4">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id} className="mb-2 px-2">
              <button
                onClick={() => setActiveTab(item.id as 'map' | 'notifications' | 'support')}
                className={`flex items-center justify-center md:justify-start w-full p-3 rounded-lg transition-colors ${
                  activeTab === item.id ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <div className="relative">
                  {item.icon}
                  {item.badge && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="ml-3 hidden md:block">{item.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* User */}
      <div className="p-4 border-t border-gray-700 hidden md:block">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-500 rounded-full mr-3"></div>
          <div>
            <p className="font-medium">Agent Policier</p>
            <p className="text-sm text-gray-400">Poste de Police Central</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;