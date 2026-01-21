import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardView from '@/components/dashboard/DashboardView';
import TrackingView from '@/components/dashboard/TrackingView';
import WaterView from '@/components/dashboard/WaterView';
import AlertsView from '@/components/dashboard/AlertsView';

const Index = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView />;
      case 'tracking':
        return <TrackingView />;
      case 'water':
        return <WaterView />;
      case 'alerts':
        return <AlertsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar 
        activeView={activeView} 
        onNavigate={setActiveView}
        onCollapsedChange={setSidebarCollapsed}
      />
      
      <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <div className="p-6 lg:p-8 max-w-7xl">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default Index;