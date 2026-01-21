import { Users, AlertTriangle, Droplets, Activity, MapPin, Clock } from 'lucide-react';

const recentActivity = [
  { id: 1, message: 'Pak Budi Santoso memasuki Zona Aman', time: '2 menit lalu', type: 'success' },
  { id: 2, message: 'Sinyal SOS dari Ibu Siti Aminah', time: '5 menit lalu', type: 'danger' },
  { id: 3, message: 'Kualitas air menurun di Pos 2', time: '12 menit lalu', type: 'warning' },
  { id: 4, message: 'Tim SAR berhasil evakuasi 15 warga', time: '30 menit lalu', type: 'success' },
  { id: 5, message: 'Eko Prasetyo keluar dari zona pantau', time: '45 menit lalu', type: 'warning' },
];

const DashboardView = () => {
  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
          <MapPin className="w-4 h-4" />
          <span>Integrated Terminal Semarang</span>
        </div>
        <h1 className="text-2xl font-bold text-foreground">Status Posko: Siaga 1</h1>
        <p className="text-muted-foreground mt-1">Pemantauan real-time sistem tanggap darurat bencana</p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total Pengungsi */}
        <div className="bento-card-accent">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Pengungsi</p>
              <p className="text-3xl font-bold text-foreground">124</p>
              <p className="text-sm text-muted-foreground mt-1">Jiwa terdaftar</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="stat-badge-success">+12 hari ini</span>
          </div>
        </div>

        {/* Sinyal SOS */}
        <div className="bento-card border-l-4 border-l-secondary animate-pulse-glow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Sinyal SOS</p>
              <p className="text-3xl font-bold text-secondary">3</p>
              <p className="text-sm text-muted-foreground mt-1">Terdeteksi</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-secondary" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="stat-badge-danger pulse-animation">Perlu Tindakan</span>
          </div>
        </div>

        {/* Cadangan Air */}
        <div className="bento-card-accent">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Cadangan Air Bersih</p>
              <p className="text-3xl font-bold text-foreground">850</p>
              <p className="text-sm text-muted-foreground mt-1">Liter tersedia</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
              <Droplets className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="stat-badge-success">Cukup 3 hari</span>
          </div>
        </div>

        {/* Sistem Aktif */}
        <div className="bento-card-accent">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Perangkat Aktif</p>
              <p className="text-3xl font-bold text-foreground">28</p>
              <p className="text-sm text-muted-foreground mt-1">IoT terhubung</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
              <Activity className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="stat-badge-success">Semua Online</span>
          </div>
        </div>
      </div>

      {/* Second Row - Activity & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Activity Feed */}
        <div className="lg:col-span-2 bento-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Aktivitas Terkini</h2>
            <span className="text-xs text-muted-foreground">Real-time</span>
          </div>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div 
                key={activity.id} 
                className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  activity.type === 'success' ? 'bg-success' : 
                  activity.type === 'danger' ? 'bg-destructive' : 'bg-warning'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{activity.message}</p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bento-card">
          <h2 className="font-semibold text-foreground mb-4">Ringkasan Hari Ini</h2>
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-success/10">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Evakuasi Berhasil</span>
                <span className="text-lg font-bold text-success">45</span>
              </div>
              <div className="mt-2 h-2 bg-success/20 rounded-full overflow-hidden">
                <div className="h-full bg-success rounded-full" style={{ width: '75%' }} />
              </div>
            </div>
            
            <div className="p-3 rounded-lg bg-primary/10">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Zona Aman Tercapai</span>
                <span className="text-lg font-bold text-primary">92%</span>
              </div>
              <div className="mt-2 h-2 bg-primary/20 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '92%' }} />
              </div>
            </div>

            <div className="p-3 rounded-lg bg-secondary/10">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Respons Darurat</span>
                <span className="text-lg font-bold text-secondary">8 mnt</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Rata-rata waktu respons</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;