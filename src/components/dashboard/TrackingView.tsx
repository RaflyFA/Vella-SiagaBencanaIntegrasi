import { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Heart, 
  Battery, 
  Droplet, 
  AlertCircle,
  Activity,
  Phone,
  Send
} from 'lucide-react';

interface Person {
  id: number;
  name: string;
  status: 'aman' | 'sos' | 'terputus';
  location: { x: number; y: number };
  bloodType: string;
  medicalHistory: string[];
  allergies: string[];
  heartRate: number;
  battery: number;
  lastSeen: string;
}

const survivors: Person[] = [
  { 
    id: 1, 
    name: 'Budi Santoso', 
    status: 'aman', 
    location: { x: 25, y: 30 },
    bloodType: 'O+',
    medicalHistory: ['Hipertensi'],
    allergies: ['Penisilin'],
    heartRate: 78,
    battery: 85,
    lastSeen: '1 menit lalu'
  },
  { 
    id: 2, 
    name: 'Siti Aminah', 
    status: 'sos', 
    location: { x: 65, y: 45 },
    bloodType: 'A-',
    medicalHistory: ['Diabetes', 'Asma'],
    allergies: ['Antibiotik', 'Kacang'],
    heartRate: 102,
    battery: 23,
    lastSeen: 'Baru saja'
  },
  { 
    id: 3, 
    name: 'Eko Prasetyo', 
    status: 'aman', 
    location: { x: 40, y: 70 },
    bloodType: 'B+',
    medicalHistory: [],
    allergies: [],
    heartRate: 72,
    battery: 92,
    lastSeen: '3 menit lalu'
  },
  { 
    id: 4, 
    name: 'Rina Wati', 
    status: 'terputus', 
    location: { x: 80, y: 25 },
    bloodType: 'AB+',
    medicalHistory: ['Jantung'],
    allergies: ['Seafood'],
    heartRate: 0,
    battery: 0,
    lastSeen: '45 menit lalu'
  },
  { 
    id: 5, 
    name: 'Ahmad Hidayat', 
    status: 'aman', 
    location: { x: 15, y: 60 },
    bloodType: 'O-',
    medicalHistory: ['Epilepsi'],
    allergies: [],
    heartRate: 68,
    battery: 76,
    lastSeen: '2 menit lalu'
  },
  { 
    id: 6, 
    name: 'Dewi Lestari', 
    status: 'sos', 
    location: { x: 55, y: 15 },
    bloodType: 'A+',
    medicalHistory: ['Hamil 7 bulan'],
    allergies: ['Latex'],
    heartRate: 95,
    battery: 45,
    lastSeen: 'Baru saja'
  },
];

const TrackingView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [rescueSent, setRescueSent] = useState<number[]>([]);

  const filteredSurvivors = survivors.filter(person =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendRescue = (personId: number) => {
    setRescueSent(prev => [...prev, personId]);
  };

  const getStatusBadge = (status: Person['status']) => {
    switch (status) {
      case 'aman':
        return <span className="stat-badge-success">Aman</span>;
      case 'sos':
        return <span className="stat-badge-danger pulse-animation">SOS</span>;
      case 'terputus':
        return <span className="stat-badge-muted">Terputus</span>;
    }
  };

  const getStatusColor = (status: Person['status']) => {
    switch (status) {
      case 'aman': return 'bg-success';
      case 'sos': return 'bg-destructive';
      case 'terputus': return 'bg-muted-foreground';
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Pelacakan Warga</h1>
        <p className="text-muted-foreground mt-1">Monitor lokasi dan status kesehatan pengungsi via Safe-Trace</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Survivor List */}
        <div className="bento-card">
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cari nama pengungsi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border-0 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* List */}
          <div className="space-y-2 max-h-[300px] md:max-h-[400px] lg:max-h-[500px] overflow-y-auto">
            {filteredSurvivors.map((person) => (
              <button
                key={person.id}
                onClick={() => setSelectedPerson(person)}
                className={`w-full p-3 rounded-lg text-left transition-all hover:bg-muted ${
                  selectedPerson?.id === person.id ? 'bg-muted ring-2 ring-primary/50' : 'bg-muted/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${getStatusColor(person.status)}`}>
                      {person.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{person.name}</p>
                      <p className="text-xs text-muted-foreground">{person.lastSeen}</p>
                    </div>
                  </div>
                  {getStatusBadge(person.status)}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Map Area */}
        <div className="bento-card md:col-span-2 lg:col-span-1">
          <h2 className="font-semibold text-foreground mb-4">Peta Lokasi</h2>
          <div className="relative w-full h-[250px] md:h-[350px] lg:h-[400px] bg-muted rounded-lg overflow-hidden"
            style={{
              backgroundImage: `
                radial-gradient(circle at 1px 1px, hsl(var(--muted-foreground) / 0.15) 1px, transparent 0)
              `,
              backgroundSize: '20px 20px'
            }}
          >
            {/* Zone Labels */}
            <div className="absolute top-4 left-4 px-2 py-1 bg-success/20 text-success text-xs font-medium rounded">
              Zona Aman
            </div>
            <div className="absolute top-4 right-4 px-2 py-1 bg-destructive/20 text-destructive text-xs font-medium rounded">
              Zona Bahaya
            </div>

            {/* Grid Zones */}
            <div className="absolute inset-4 border-2 border-dashed border-success/30 rounded-lg" />
            <div className="absolute right-4 top-12 bottom-4 w-1/3 border-2 border-dashed border-destructive/30 rounded-lg" />

            {/* Pins */}
            {survivors.map((person) => (
              <button
                key={person.id}
                onClick={() => setSelectedPerson(person)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110 ${
                  selectedPerson?.id === person.id ? 'z-20 scale-125' : 'z-10'
                }`}
                style={{ left: `${person.location.x}%`, top: `${person.location.y}%` }}
              >
                <div className={`relative ${person.status === 'sos' ? 'animate-pulse-glow' : ''}`}>
                  <MapPin 
                    className={`w-8 h-8 ${
                      person.status === 'aman' ? 'text-success' :
                      person.status === 'sos' ? 'text-destructive' :
                      'text-muted-foreground'
                    }`}
                    fill="currentColor"
                  />
                  {person.status === 'sos' && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full animate-ping" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-success" />
              <span>Aman</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <span>SOS</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-muted-foreground" />
              <span>Terputus</span>
            </div>
          </div>
        </div>

        {/* Detail Panel */}
        <div className="bento-card">
          {selectedPerson ? (
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold ${getStatusColor(selectedPerson.status)}`}>
                  {selectedPerson.name.charAt(0)}
                </div>
                <div>
                  <h2 className="font-bold text-foreground">{selectedPerson.name}</h2>
                  {getStatusBadge(selectedPerson.status)}
                </div>
              </div>

              {/* Medical Info */}
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-muted">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    Data Medis NFC
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Droplet className="w-4 h-4 text-destructive" />
                      <span className="text-sm">Golongan Darah: <strong>{selectedPerson.bloodType}</strong></span>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-warning mt-0.5" />
                      <div className="text-sm">
                        <span>Riwayat: </span>
                        <strong>{selectedPerson.medicalHistory.length > 0 ? selectedPerson.medicalHistory.join(', ') : 'Tidak ada'}</strong>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-secondary mt-0.5" />
                      <div className="text-sm">
                        <span>Alergi: </span>
                        <strong>{selectedPerson.allergies.length > 0 ? selectedPerson.allergies.join(', ') : 'Tidak ada'}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live Status */}
                {selectedPerson.status !== 'terputus' && (
                  <div className="p-3 rounded-lg bg-muted">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                      Status Real-Time
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2">
                        <Heart className={`w-4 h-4 ${selectedPerson.heartRate > 90 ? 'text-destructive' : 'text-success'}`} />
                        <span className="text-sm">{selectedPerson.heartRate} bpm</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Battery className={`w-4 h-4 ${selectedPerson.battery < 30 ? 'text-destructive' : 'text-success'}`} />
                        <span className="text-sm">{selectedPerson.battery}%</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Signal Strength */}
                <div className="p-3 rounded-lg bg-muted">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    Kekuatan Sinyal LoRa
                  </h3>
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-primary" />
                    <div className="flex-1 h-2 bg-muted-foreground/20 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${selectedPerson.status === 'terputus' ? 'bg-muted-foreground' : 'bg-primary'}`}
                        style={{ width: selectedPerson.status === 'terputus' ? '0%' : '78%' }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{selectedPerson.status === 'terputus' ? '0%' : '78%'}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-2">
                  {selectedPerson.status === 'sos' && (
                    <button
                      onClick={() => handleSendRescue(selectedPerson.id)}
                      disabled={rescueSent.includes(selectedPerson.id)}
                      className={`w-full py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                        rescueSent.includes(selectedPerson.id)
                          ? 'bg-success text-success-foreground'
                          : 'gradient-secondary text-secondary-foreground hover:opacity-90'
                      }`}
                    >
                      <Send className="w-4 h-4" />
                      {rescueSent.includes(selectedPerson.id) ? 'Tim Meluncur!' : 'Kirim Tim Penyelamat'}
                    </button>
                  )}
                  <button className="w-full py-2.5 rounded-lg border border-border text-foreground font-medium hover:bg-muted transition-colors flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" />
                    Hubungi Keluarga
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <MapPin className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-medium text-foreground mb-1">Pilih Pengungsi</h3>
              <p className="text-sm text-muted-foreground">Klik nama atau pin di peta untuk melihat detail</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackingView;