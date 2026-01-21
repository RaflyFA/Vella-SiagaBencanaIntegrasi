import { useState } from 'react';
import { 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  CheckCircle, 
  Clock,
  MapPin,
  Droplets,
  User,
  Check
} from 'lucide-react';

interface Alert {
  id: number;
  type: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  location: string;
  time: string;
  read: boolean;
  category: 'infrastructure' | 'person' | 'water';
}

const initialAlerts: Alert[] = [
  {
    id: 1,
    type: 'critical',
    title: 'Pintu Air 3 Gagal Menutup',
    description: 'Sistem hidrolik mengalami kegagalan. Tim teknis diperlukan segera.',
    location: 'Bendungan Utara - Sektor C',
    time: '5 menit lalu',
    read: false,
    category: 'infrastructure'
  },
  {
    id: 2,
    type: 'critical',
    title: 'Budi Santoso Keluar Zona Aman',
    description: 'Pengungsi terdeteksi memasuki area rawan banjir tanpa izin.',
    location: 'Koordinat: -6.9823, 110.4193',
    time: '12 menit lalu',
    read: false,
    category: 'person'
  },
  {
    id: 3,
    type: 'warning',
    title: 'Kualitas Air Menurun di Pos 2',
    description: 'TDS meningkat menjadi 135 ppm. Perlu penggantian filter.',
    location: 'Water-Gen Unit 2',
    time: '30 menit lalu',
    read: false,
    category: 'water'
  },
  {
    id: 4,
    type: 'warning',
    title: 'Baterai Safe-Trace Rendah',
    description: '5 perangkat memiliki baterai di bawah 20%.',
    location: 'Multiple devices',
    time: '1 jam lalu',
    read: true,
    category: 'person'
  },
  {
    id: 5,
    type: 'info',
    title: 'Pemeliharaan Terjadwal',
    description: 'Sistem akan menjalani pemeliharaan rutin besok pukul 02:00.',
    location: 'Semua Sistem',
    time: '2 jam lalu',
    read: true,
    category: 'infrastructure'
  },
  {
    id: 6,
    type: 'info',
    title: 'Stok Logistik Diperbarui',
    description: 'Bantuan makanan dan selimut telah tiba di gudang utama.',
    location: 'Gudang Posko 1',
    time: '3 jam lalu',
    read: true,
    category: 'infrastructure'
  },
];

const AlertsView = () => {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const markAsRead = (alertId: number) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, read: true } : alert
    ));
  };

  const markAllAsRead = () => {
    setAlerts(prev => prev.map(alert => ({ ...alert, read: true })));
  };

  const filteredAlerts = filter === 'unread' 
    ? alerts.filter(a => !a.read)
    : alerts;

  const unreadCount = alerts.filter(a => !a.read).length;

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="w-5 h-5 text-destructive" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-warning" />;
      case 'info':
        return <Info className="w-5 h-5 text-primary" />;
    }
  };

  const getCategoryIcon = (category: Alert['category']) => {
    switch (category) {
      case 'infrastructure':
        return <AlertTriangle className="w-4 h-4" />;
      case 'person':
        return <User className="w-4 h-4" />;
      case 'water':
        return <Droplets className="w-4 h-4" />;
    }
  };

  const getAlertBorder = (type: Alert['type']) => {
    switch (type) {
      case 'critical':
        return 'border-l-destructive';
      case 'warning':
        return 'border-l-warning';
      case 'info':
        return 'border-l-primary';
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Peringatan & Notifikasi</h1>
          <p className="text-muted-foreground mt-1">Pantau semua alert sistem dan tindakan darurat</p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            Tandai Semua Dibaca
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bento-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {alerts.filter(a => a.type === 'critical' && !a.read).length}
              </p>
              <p className="text-xs text-muted-foreground">Kritis Aktif</p>
            </div>
          </div>
        </div>

        <div className="bento-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {alerts.filter(a => a.type === 'warning' && !a.read).length}
              </p>
              <p className="text-xs text-muted-foreground">Peringatan</p>
            </div>
          </div>
        </div>

        <div className="bento-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Info className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {alerts.filter(a => a.type === 'info').length}
              </p>
              <p className="text-xs text-muted-foreground">Informasi</p>
            </div>
          </div>
        </div>

        <div className="bento-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {alerts.filter(a => a.read).length}
              </p>
              <p className="text-xs text-muted-foreground">Sudah Dibaca</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'all' 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-muted text-muted-foreground hover:text-foreground'
          }`}
        >
          Semua ({alerts.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'unread' 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-muted text-muted-foreground hover:text-foreground'
          }`}
        >
          Belum Dibaca ({unreadCount})
        </button>
      </div>

      {/* Alert List */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="bento-card text-center py-12">
            <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
            <h3 className="font-medium text-foreground mb-1">Semua Beres!</h3>
            <p className="text-sm text-muted-foreground">Tidak ada peringatan yang belum dibaca.</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div 
              key={alert.id}
              className={`bento-card border-l-4 ${getAlertBorder(alert.type)} ${
                !alert.read ? 'bg-card' : 'bg-muted/30'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                  alert.type === 'critical' ? 'bg-destructive/10' :
                  alert.type === 'warning' ? 'bg-warning/10' : 'bg-primary/10'
                }`}>
                  {getAlertIcon(alert.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-semibold ${!alert.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {alert.title}
                        </h3>
                        {!alert.read && (
                          <span className="w-2 h-2 rounded-full bg-primary" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {alert.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {alert.time}
                        </span>
                        <span className="flex items-center gap-1 capitalize">
                          {getCategoryIcon(alert.category)}
                          {alert.category === 'infrastructure' ? 'Infrastruktur' : 
                           alert.category === 'person' ? 'Warga' : 'Air'}
                        </span>
                      </div>
                    </div>

                    {!alert.read && (
                      <button
                        onClick={() => markAsRead(alert.id)}
                        className="flex-shrink-0 px-3 py-1.5 rounded-lg bg-muted text-muted-foreground text-xs font-medium hover:bg-muted-foreground/20 transition-colors"
                      >
                        Tandai Dibaca
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AlertsView;