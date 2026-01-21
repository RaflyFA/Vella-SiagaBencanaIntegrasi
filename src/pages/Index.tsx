import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardView from '@/components/dashboard/DashboardView';
import TrackingView from '@/components/dashboard/TrackingView';
import WaterView from '@/components/dashboard/WaterView';
import AlertsView from '@/components/dashboard/AlertsView';
import NFCScanView from '@/components/dashboard/NFCScanView';

const Index = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView onNavigate={handleNavigate} />;
      case 'tracking':
        return <TrackingView />;
      case 'water':
        return <WaterView />;
      case 'alerts':
        return <AlertsView />;
      case 'nfc-scan':
        return <NFCScanView onBack={() => handleNavigate('dashboard')} />;
      default:
        return <DashboardView onNavigate={handleNavigate} />;
    }
  };

  const handleNavigate = (view: string) => {
    setActiveView(view);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar
        activeView={activeView}
        onNavigate={handleNavigate}
        onCollapsedChange={setSidebarCollapsed}
        mobileMenuOpen={mobileMenuOpen}
        onMobileMenuToggle={setMobileMenuOpen}
      />

      <main className={`flex-1 transition-all duration-300 w-full ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
        }`}>
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl pt-20 md:pt-20 lg:pt-6">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default Index;