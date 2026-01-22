import { useState } from 'react';
import {
    Stethoscope,
    MapPin,
    Phone,
    CheckCircle,
    Clock,
    AlertCircle,
    Search,
    Navigation
} from 'lucide-react';

interface Medic {
    id: string;
    name: string;
    specialty: string;
    location: string;
    distance: string;
    status: 'available' | 'busy' | 'offline';
    phone: string;
    lastUpdate: string;
    coordinates: { lat: number; lng: number };
}

const medicsList: Medic[] = [
    {
        id: 'MED-001',
        name: 'dr. Andi Wijaya',
        specialty: 'Dokter Umum',
        location: 'Posko Utama - Semarang Barat',
        distance: '0.5 km',
        status: 'available',
        phone: '+62 812-1111-2222',
        lastUpdate: '2 menit lalu',
        coordinates: { lat: -6.9666, lng: 110.4196 }
    },
    {
        id: 'MED-002',
        name: 'dr. Sari Dewi',
        specialty: 'Dokter Anak',
        location: 'Posko 2 - Tugu Muda',
        distance: '1.2 km',
        status: 'available',
        phone: '+62 813-2222-3333',
        lastUpdate: '5 menit lalu',
        coordinates: { lat: -6.9844, lng: 110.4097 }
    },
    {
        id: 'MED-003',
        name: 'dr. Budi Hartono',
        specialty: 'Dokter Bedah',
        location: 'RS Kariadi',
        distance: '3.5 km',
        status: 'busy',
        phone: '+62 814-3333-4444',
        lastUpdate: '10 menit lalu',
        coordinates: { lat: -6.9932, lng: 110.4203 }
    },
    {
        id: 'MED-004',
        name: 'Ns. Ratna Sari',
        specialty: 'Perawat',
        location: 'Posko 3 - Simpang Lima',
        distance: '2.1 km',
        status: 'available',
        phone: '+62 815-4444-5555',
        lastUpdate: '1 menit lalu',
        coordinates: { lat: -6.9903, lng: 110.4229 }
    },
    {
        id: 'MED-005',
        name: 'dr. Maya Putri',
        specialty: 'Dokter Kandungan',
        location: 'Posko 4 - Banyumanik',
        distance: '5.8 km',
        status: 'offline',
        phone: '+62 816-5555-6666',
        lastUpdate: '1 jam lalu',
        coordinates: { lat: -7.0488, lng: 110.4196 }
    },
    {
        id: 'MED-006',
        name: 'dr. Rizky Pratama',
        specialty: 'Dokter Umum',
        location: 'Posko 5 - Genuk',
        distance: '4.2 km',
        status: 'available',
        phone: '+62 817-6666-7777',
        lastUpdate: '3 menit lalu',
        coordinates: { lat: -6.9553, lng: 110.4601 }
    }
];

const MedicView = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMedic, setSelectedMedic] = useState<Medic | null>(null);
    const [filterStatus, setFilterStatus] = useState<'all' | 'available' | 'busy'>('all');

    const filteredMedics = medicsList.filter(medic => {
        const matchesSearch = medic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            medic.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
            medic.location.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesFilter = filterStatus === 'all' || medic.status === filterStatus;

        return matchesSearch && matchesFilter;
    });

    const getStatusConfig = (status: Medic['status']) => {
        switch (status) {
            case 'available':
                return { label: 'Siap', color: 'text-success', bg: 'bg-success/10', border: 'border-success/20', icon: CheckCircle };
            case 'busy':
                return { label: 'Sibuk', color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/20', icon: Clock };
            case 'offline':
                return { label: 'Offline', color: 'text-muted-foreground', bg: 'bg-muted', border: 'border-border', icon: AlertCircle };
        }
    };

    const availableCount = medicsList.filter(m => m.status === 'available').length;
    const busyCount = medicsList.filter(m => m.status === 'busy').length;

    return (
        <div className="animate-fade-in">
            {/* Header */}
            <div className="mb-4">
                <h1 className="text-lg md:text-xl font-bold text-foreground">Hubungi Medis</h1>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">Lacak dan hubungi tenaga medis terdekat</p>
            </div>

            {/* Stats - Compact */}
            <div className="grid grid-cols-3 gap-2 md:gap-3 mb-4">
                <div className="bento-card p-3">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-success" />
                        </div>
                        <div>
                            <p className="text-lg font-bold text-foreground">{availableCount}</p>
                            <p className="text-[10px] text-muted-foreground">Siap</p>
                        </div>
                    </div>
                </div>
                <div className="bento-card p-3">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center">
                            <Clock className="w-4 h-4 text-warning" />
                        </div>
                        <div>
                            <p className="text-lg font-bold text-foreground">{busyCount}</p>
                            <p className="text-[10px] text-muted-foreground">Sibuk</p>
                        </div>
                    </div>
                </div>
                <div className="bento-card p-3">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Stethoscope className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                            <p className="text-lg font-bold text-foreground">{medicsList.length}</p>
                            <p className="text-[10px] text-muted-foreground">Total</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filter - Compact */}
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Cari nama atau lokasi..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-lg bg-muted border-0 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                </div>
                <div className="flex gap-1.5">
                    <button
                        onClick={() => setFilterStatus('all')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filterStatus === 'all' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        Semua
                    </button>
                    <button
                        onClick={() => setFilterStatus('available')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filterStatus === 'available' ? 'bg-success text-white' : 'bg-muted text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        Siap
                    </button>
                    <button
                        onClick={() => setFilterStatus('busy')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filterStatus === 'busy' ? 'bg-warning text-white' : 'bg-muted text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        Sibuk
                    </button>
                </div>
            </div>

            {/* Medics List - Compact */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {filteredMedics.map((medic) => {
                    const statusConfig = getStatusConfig(medic.status);
                    const StatusIcon = statusConfig.icon;

                    return (
                        <div
                            key={medic.id}
                            className={`bento-card p-3 cursor-pointer transition-all hover:border-primary ${selectedMedic?.id === medic.id ? 'border-primary bg-primary/5' : ''
                                }`}
                            onClick={() => setSelectedMedic(medic)}
                        >
                            <div className="flex items-start gap-3">
                                {/* Avatar - Smaller */}
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <Stethoscope className="w-5 h-5 text-primary" />
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2 mb-0.5">
                                        <h3 className="text-sm font-semibold text-foreground truncate">{medic.name}</h3>
                                        <span className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] ${statusConfig.bg} ${statusConfig.color} ${statusConfig.border} border flex-shrink-0`}>
                                            <StatusIcon className="w-2.5 h-2.5" />
                                            {statusConfig.label}
                                        </span>
                                    </div>
                                    <p className="text-xs text-primary font-medium">{medic.specialty}</p>
                                    <div className="flex items-center gap-1 mt-1 text-[10px] text-muted-foreground">
                                        <MapPin className="w-2.5 h-2.5 flex-shrink-0" />
                                        <span className="truncate">{medic.location}</span>
                                        <span className="text-primary font-medium ml-auto flex-shrink-0">{medic.distance}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions - Compact */}
                            <div className="flex items-center gap-2 mt-3 pt-2 border-t border-border">
                                <a
                                    href={`tel:${medic.phone}`}
                                    onClick={(e) => e.stopPropagation()}
                                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity"
                                >
                                    <Phone className="w-3 h-3" />
                                    Hubungi
                                </a>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        window.open(`https://www.google.com/maps/dir/?api=1&destination=${medic.coordinates.lat},${medic.coordinates.lng}`, '_blank');
                                    }}
                                    className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-foreground text-xs font-medium hover:bg-muted transition-colors"
                                >
                                    <Navigation className="w-3 h-3" />
                                    Lacak
                                </button>
                            </div>

                            {/* Last update - Smaller */}
                            <p className="text-[10px] text-muted-foreground mt-2 text-center">
                                Update: {medic.lastUpdate}
                            </p>
                        </div>
                    );
                })}

                {filteredMedics.length === 0 && (
                    <div className="col-span-full text-center py-8 text-muted-foreground">
                        <Stethoscope className="w-10 h-10 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Tidak ada medis ditemukan</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MedicView;
