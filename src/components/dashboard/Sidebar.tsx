import { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Droplets, 
  Bell, 
  Shield,
  User,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
  onCollapsedChange?: (collapsed: boolean) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard Utama', icon: LayoutDashboard },
  { id: 'tracking', label: 'Pelacakan Warga', icon: Users },
  { id: 'water', label: 'Monitor Kualitas Air', icon: Droplets },
  { id: 'alerts', label: 'Peringatan & Notifikasi', icon: Bell },
];

const Sidebar = ({ activeView, onNavigate, onCollapsedChange }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapse = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    onCollapsedChange?.(newState);
  };

  return (
    <aside 
      className={`fixed left-0 top-0 h-screen bg-sidebar flex flex-col transition-all duration-300 z-50 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Logo */}
      <div className="p-5 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="animate-fade-in">
              <h1 className="font-bold text-sidebar-foreground text-sm">Sistem Siaga</h1>
              <p className="text-xs text-sidebar-foreground/60">Bencana Terpadu</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full ${isActive ? 'nav-item-active' : 'nav-item'}`}
              title={collapsed ? item.label : undefined}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-sidebar-primary' : ''}`} />
              {!collapsed && <span className="text-sm">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-sidebar-accent flex items-center justify-center flex-shrink-0">
            <User className="w-4 h-4 text-sidebar-foreground" />
          </div>
          {!collapsed && (
            <div className="animate-fade-in overflow-hidden">
              <p className="text-sm font-medium text-sidebar-foreground truncate">Admin Posko 1</p>
              <p className="text-xs text-sidebar-foreground/60">Semarang Barat</p>
            </div>
          )}
        </div>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={handleCollapse}
        className="absolute -right-3 top-20 w-6 h-6 bg-card rounded-full border border-border shadow-sm flex items-center justify-center hover:bg-muted transition-colors"
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3 text-foreground" />
        ) : (
          <ChevronLeft className="w-3 h-3 text-foreground" />
        )}
      </button>
    </aside>
  );
};

export default Sidebar;