import { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  Droplets,
  Bell,
  Shield,
  User,
  ChevronLeft,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
  onCollapsedChange?: (collapsed: boolean) => void;
  mobileMenuOpen?: boolean;
  onMobileMenuToggle?: (open: boolean) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard Utama', icon: LayoutDashboard },
  { id: 'tracking', label: 'Pelacakan Warga', icon: Users },
  { id: 'water', label: 'Monitor Kualitas Air', icon: Droplets },
  { id: 'alerts', label: 'Peringatan & Notifikasi', icon: Bell },
];

const Sidebar = ({
  activeView,
  onNavigate,
  onCollapsedChange,
  mobileMenuOpen = false,
  onMobileMenuToggle
}: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapse = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    onCollapsedChange?.(newState);
  };

  return (
    <>
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-sidebar border-b border-sidebar-border flex items-center justify-between px-4 z-50 lg:hidden">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <Shield className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-sidebar-foreground text-sm">Vella</h1>
          </div>
        </div>
        <button
          onClick={() => onMobileMenuToggle?.(!mobileMenuOpen)}
          className="w-10 h-10 flex items-center justify-center text-sidebar-foreground hover:bg-sidebar-accent rounded-lg transition-colors"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => onMobileMenuToggle?.(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-14 left-0 bottom-0 w-64 bg-sidebar flex flex-col z-50 lg:hidden transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full ${isActive ? 'nav-item-active' : 'nav-item'}`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-sidebar-primary' : ''}`} />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-sidebar-accent flex items-center justify-center">
              <User className="w-4 h-4 text-sidebar-foreground" />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-sidebar-foreground truncate">Admin Posko 1</p>
              <p className="text-xs text-sidebar-foreground/60">Semarang Barat</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Desktop Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-sidebar flex-col transition-all duration-300 z-50 hidden lg:flex ${collapsed ? 'w-20' : 'w-64'
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
                <h1 className="font-bold text-sidebar-foreground text-sm">Vella</h1>
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
    </>
  );
};

export default Sidebar;