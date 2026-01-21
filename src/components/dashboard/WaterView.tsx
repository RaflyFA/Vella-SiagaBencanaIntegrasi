import { useState } from 'react';
import { 
  Droplets, 
  ThermometerSun, 
  Gauge, 
  Filter, 
  Zap, 
  Lock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const hourlyProduction = [
  { hour: '06:00', liters: 45 },
  { hour: '08:00', liters: 78 },
  { hour: '10:00', liters: 95 },
  { hour: '12:00', liters: 120 },
  { hour: '14:00', liters: 88 },
  { hour: '16:00', liters: 65 },
];

const WaterView = () => {
  const [pumpActive, setPumpActive] = useState(true);
  const [uvActive, setUvActive] = useState(true);
  const [filterLocked, setFilterLocked] = useState(false);

  const tdsValue = 85;
  const phValue = 7.2;
  const filterHealth = 82;
  const maxTds = 150;

  const getTdsStatus = (value: number) => {
    if (value <= 100) return { label: 'Layak Minum', color: 'text-success', bg: 'bg-success' };
    if (value <= 150) return { label: 'Perlu Filter', color: 'text-warning', bg: 'bg-warning' };
    return { label: 'Tidak Layak', color: 'text-destructive', bg: 'bg-destructive' };
  };

  const getPhStatus = (value: number) => {
    if (value >= 6.5 && value <= 8.5) return { label: 'Normal', color: 'text-success' };
    return { label: 'Abnormal', color: 'text-warning' };
  };

  const tdsStatus = getTdsStatus(tdsValue);
  const phStatus = getPhStatus(phValue);
  const maxBar = Math.max(...hourlyProduction.map(h => h.liters));

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Monitor Kualitas Air</h1>
        <p className="text-muted-foreground mt-1">Sistem pemantauan Water-Gen untuk filtrasi air darurat</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Left Column - Gauges */}
        <div className="space-y-4">
          {/* TDS Gauge */}
          <div className="bento-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-foreground">TDS (Total Dissolved Solids)</h2>
              <span className={`stat-badge ${tdsStatus.bg === 'bg-success' ? 'stat-badge-success' : 'stat-badge-warning'}`}>
                {tdsStatus.label}
              </span>
            </div>
            
            {/* Circular Gauge */}
            <div className="flex justify-center mb-4">
              <div className="relative w-32 h-32 md:w-40 md:h-40">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="hsl(var(--muted))"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="hsl(var(--success))"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${(tdsValue / maxTds) * 264} 264`}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl md:text-3xl font-bold text-foreground">{tdsValue}</span>
                  <span className="text-xs md:text-sm text-muted-foreground">ppm</span>
                </div>
              </div>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              Batas layak minum: &lt; 100 ppm
            </div>
          </div>

          {/* pH Level */}
          <div className="bento-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-foreground">Tingkat pH</h2>
              <span className="stat-badge-success">{phStatus.label}</span>
            </div>

            <div className="flex justify-center mb-4">
              <div className="relative w-32 h-32 md:w-40 md:h-40">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="hsl(var(--muted))"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${(phValue / 14) * 264} 264`}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl md:text-3xl font-bold text-foreground">{phValue}</span>
                  <span className="text-xs md:text-sm text-muted-foreground">pH</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between text-xs text-muted-foreground px-2">
              <span>Asam (0)</span>
              <span className="text-success">Optimal (7)</span>
              <span>Basa (14)</span>
            </div>
          </div>
        </div>

        {/* Middle Column - Filter & Controls */}
        <div className="space-y-4">
          {/* Filter Health */}
          <div className="bento-card">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-primary" />
              <h2 className="font-semibold text-foreground">Kesehatan Filter</h2>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-foreground">Sisa Umur Membran Nano</span>
                  <span className="font-bold text-foreground">{filterHealth}%</span>
                </div>
                <div className="h-4 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-[hsl(189_82%_45%)] rounded-full transition-all duration-1000"
                    style={{ width: `${filterHealth}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">Perkiraan penggantian: 12 hari lagi</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-muted">
                  <div className="flex items-center gap-2 mb-1">
                    <ThermometerSun className="w-4 h-4 text-secondary" />
                    <span className="text-xs text-muted-foreground">Suhu Air</span>
                  </div>
                  <span className="text-lg font-bold text-foreground">24°C</span>
                </div>
                <div className="p-3 rounded-lg bg-muted">
                  <div className="flex items-center gap-2 mb-1">
                    <Gauge className="w-4 h-4 text-primary" />
                    <span className="text-xs text-muted-foreground">Tekanan</span>
                  </div>
                  <span className="text-lg font-bold text-foreground">2.4 bar</span>
                </div>
              </div>
            </div>
          </div>

          {/* Control Panel */}
          <div className="bento-card">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-secondary" />
              <h2 className="font-semibold text-foreground">Panel Kontrol</h2>
            </div>

            <div className="space-y-4">
              {/* Pump Toggle */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                <div className="flex items-center gap-3">
                  <Droplets className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Pompa Otomatis</p>
                    <p className="text-xs text-muted-foreground">Aktifkan untuk distribusi air</p>
                  </div>
                </div>
                <button
                  onClick={() => setPumpActive(!pumpActive)}
                  className={pumpActive ? 'toggle-switch-on' : 'toggle-switch-off'}
                >
                  <span className={`toggle-knob ${pumpActive ? 'translate-x-5' : 'translate-x-1'}`} />
                </button>
              </div>

              {/* UV Toggle */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-warning" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Sterilisasi UV-C</p>
                    <p className="text-xs text-muted-foreground">Membunuh bakteri & virus</p>
                  </div>
                </div>
                <button
                  onClick={() => setUvActive(!uvActive)}
                  className={uvActive ? 'toggle-switch-on' : 'toggle-switch-off'}
                >
                  <span className={`toggle-knob ${uvActive ? 'translate-x-5' : 'translate-x-1'}`} />
                </button>
              </div>

              {/* Emergency Lock */}
              <button
                onClick={() => setFilterLocked(!filterLocked)}
                className={`w-full p-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-all ${
                  filterLocked 
                    ? 'bg-destructive text-destructive-foreground'
                    : 'border-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground'
                }`}
              >
                <Lock className="w-4 h-4" />
                {filterLocked ? 'Filter Terkunci - Kontaminasi Terdeteksi' : 'Kunci Filter Darurat'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Production Chart */}
        <div className="bento-card md:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Produksi Air Hari Ini</h2>
            <span className="text-sm text-muted-foreground">Total: 491 L</span>
          </div>

          {/* Bar Chart */}
          <div className="space-y-3">
            {hourlyProduction.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-12">{item.hour}</span>
                <div className="flex-1 h-8 bg-muted rounded-lg overflow-hidden relative">
                  <div
                    className="h-full gradient-primary rounded-lg transition-all duration-1000 flex items-center justify-end pr-2"
                    style={{ width: `${(item.liters / maxBar) * 100}%` }}
                  >
                    <span className="text-xs font-medium text-primary-foreground">{item.liters} L</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Status Indicators */}
          <div className="mt-6 pt-4 border-t border-border">
            <h3 className="text-sm font-medium text-foreground mb-3">Status Sistem</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-success" />
                <span className="text-muted-foreground">Inlet Normal</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-success" />
                <span className="text-muted-foreground">Outlet Normal</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                {pumpActive ? (
                  <CheckCircle className="w-4 h-4 text-success" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-warning" />
                )}
                <span className="text-muted-foreground">Pompa {pumpActive ? 'Aktif' : 'Mati'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                {uvActive ? (
                  <CheckCircle className="w-4 h-4 text-success" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-warning" />
                )}
                <span className="text-muted-foreground">UV-C {uvActive ? 'Aktif' : 'Mati'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterView;