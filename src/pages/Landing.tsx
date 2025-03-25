import React from "react";
import { Link } from "react-router-dom";

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
        <div className="absolute inset-0 z-0">
          {/* Remplacez par votre image ou utilisez un gradient */}
          <div 
            className="w-full h-full bg-gradient-to-r from-blue-900 to-gray-900"
            style={{
              backgroundImage: `url(/api/placeholder/1920/1080)`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          ></div>
        </div>
        
        <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            <span className="text-blue-400">SMART</span>CITY
            <span className="text-blue-400">SURVEILLANCE</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mb-10">
            Système avancé de surveillance urbaine assisté par intelligence artificielle pour les forces de l'ordre de Tanger
          </p>
          <Link 
            to="/home" 
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-blue-600/30"
          >
            Accéder au Tableau de Bord
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Fonctionnalités du Système</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FeatureCard 
              icon="🎯" 
              title="Détection en Temps Réel" 
              description="Identifiez instantanément les activités suspectes et les accidents grâce à notre IA avancée" 
            />
            <FeatureCard 
              icon="🗺️" 
              title="Cartographie Intelligente" 
              description="Visualisez l'emplacement de toutes les caméras et leurs données de détection sur une carte interactive" 
            />
            <FeatureCard 
              icon="🚨" 
              title="Alertes Instantanées" 
              description="Recevez des notifications immédiates pour une intervention rapide des forces de l'ordre" 
            />
            <FeatureCard 
              icon="📊" 
              title="Statistiques Avancées" 
              description="Analysez les tendances et optimisez le déploiement des ressources grâce à des données précises" 
            />
            <FeatureCard 
              icon="🚒" 
              title="Coordination des Urgences" 
              description="Localisez rapidement les postes de police et casernes de pompiers les plus proches d'un incident" 
            />
            <FeatureCard 
              icon="🔐" 
              title="Sécurité Maximale" 
              description="Système sécurisé conçu exclusivement pour les forces de l'ordre avec authentification stricte" 
            />
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-800 py-8 px-4">
        <div className="max-w-6xl mx-auto text-gray-400 text-center">
          <p>© 2025 SmartCity Surveillance | Système développé par des Étudiants géo-info (FST Tanger) </p>

        </div>
      </footer>
    </div>
  );
};

// Composant pour les cartes de fonctionnalités
const FeatureCard: React.FC<{icon: string; title: string; description: string}> = ({ icon, title, description }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg text-center hover:bg-gray-700 transition-all hover:shadow-lg hover:shadow-blue-900/20">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3 text-blue-400">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};

export default Landing;