import { useState, useEffect } from 'react';
import {
    Heart,
    AlertCircle,
    Phone,
    ArrowLeft,
    Download,
    Upload,
    Nfc,
    Watch,
    User,
    Search
} from 'lucide-react';

interface PersonData {
    id: string;
    name: string;
    age: number;
    bloodType: string;
    medicalHistory: string[];
    allergies: string[];
    emergencyContact: {
        name: string;
        relation: string;
        phone: string;
    };
    lastCheckup: string;
    currentMedication: string[];
}

// Mock list of people for write selection
// ID Format: GA = Gelang Anak (0-17), GD = Gelang Dewasa (18-59), GL = Gelang Lansia (60+)
const peopleList: PersonData[] = [
    {
        id: 'GD-01',
        name: 'Budi Santoso',
        age: 45,
        bloodType: 'O+',
        medicalHistory: ['Hipertensi', 'Diabetes Tipe 2'],
        allergies: ['Penisilin', 'Sulfa'],
        emergencyContact: { name: 'Siti Rahayu', relation: 'Istri', phone: '+62 812-3456-7890' },
        lastCheckup: '15 Januari 2026',
        currentMedication: ['Amlodipine 5mg', 'Metformin 500mg']
    },
    {
        id: 'GA-01',
        name: 'Andi Pratama',
        age: 8,
        bloodType: 'A+',
        medicalHistory: [],
        allergies: ['Kacang'],
        emergencyContact: { name: 'Dewi Pratama', relation: 'Ibu', phone: '+62 813-1111-2222' },
        lastCheckup: '10 Januari 2026',
        currentMedication: []
    },
    {
        id: 'GL-01',
        name: 'Haji Suharto',
        age: 72,
        bloodType: 'B+',
        medicalHistory: ['Hipertensi', 'Rematik'],
        allergies: [],
        emergencyContact: { name: 'Eko Prasetyo', relation: 'Anak', phone: '+62 814-9012-3456' },
        lastCheckup: '12 Januari 2026',
        currentMedication: ['Amlodipine 10mg', 'Glucosamine']
    },
    {
        id: 'GD-02',
        name: 'Siti Aminah',
        age: 38,
        bloodType: 'AB+',
        medicalHistory: ['Asma'],
        allergies: ['Debu', 'Bulu kucing'],
        emergencyContact: { name: 'Ahmad Pratama', relation: 'Suami', phone: '+62 815-6789-0123' },
        lastCheckup: '18 Januari 2026',
        currentMedication: ['Salbutamol inhaler']
    },
    {
        id: 'GA-02',
        name: 'Putri Rahayu',
        age: 12,
        bloodType: 'O-',
        medicalHistory: [],
        allergies: ['Seafood'],
        emergencyContact: { name: 'Siti Aminah', relation: 'Ibu', phone: '+62 816-2345-6789' },
        lastCheckup: '14 Januari 2026',
        currentMedication: []
    },
    {
        id: 'GL-02',
        name: 'Nenek Aminah',
        age: 68,
        bloodType: 'A+',
        medicalHistory: ['Diabetes', 'Katarak'],
        allergies: ['Penisilin'],
        emergencyContact: { name: 'Budi Santoso', relation: 'Anak', phone: '+62 817-3456-7890' },
        lastCheckup: '16 Januari 2026',
        currentMedication: ['Metformin 500mg']
    }
];

interface NFCScanViewProps {
    onBack: () => void;
}

type NFCMode = 'select' | 'read-waiting' | 'write-select' | 'write-waiting' | 'result' | 'write-success';

const NFCScanView = ({ onBack }: NFCScanViewProps) => {
    const [mode, setMode] = useState<NFCMode>('select');
    const [isScanning, setIsScanning] = useState(false);
    const [scannedData, setScannedData] = useState<PersonData | null>(null);
    const [selectedPerson, setSelectedPerson] = useState<PersonData | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const startReadMode = () => {
        setMode('read-waiting');
        setIsScanning(true);

        // Simulate NFC detection after 3 seconds
        setTimeout(() => {
            setScannedData(peopleList[0]);
            setMode('result');
            setIsScanning(false);
        }, 3000);
    };

    const showWriteSelection = () => {
        setMode('write-select');
    };

    const selectPersonForWrite = (person: PersonData) => {
        setSelectedPerson(person);
        setMode('write-waiting');
        setIsScanning(true);

        // Simulate NFC write after 3 seconds
        setTimeout(() => {
            setMode('write-success');
            setIsScanning(false);
        }, 3000);
    };

    const handleBack = () => {
        setMode('select');
        setScannedData(null);
        setSelectedPerson(null);
        setIsScanning(false);
        setSearchQuery('');
    };

    const filteredPeople = peopleList.filter(person =>
        person.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        return () => {
            setIsScanning(false);
        };
    }, []);

    // Mode Selection Screen
    if (mode === 'select') {
        return (
            <div className="animate-fade-in">
                <div className="mb-4 md:mb-6">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-3"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm">Kembali ke Dashboard</span>
                    </button>
                    <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground">NFC Transfer</h1>
                    <p className="text-sm md:text-base text-muted-foreground mt-1">Pilih mode untuk menerima atau mengirim data NFC</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Read NFC */}
                    <button
                        onClick={startReadMode}
                        className="bento-card p-6 md:p-8 hover:border-primary hover:bg-primary/5 transition-all group text-left"
                    >
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Download className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">Terima Data</h3>
                        <p className="text-sm text-muted-foreground">Tempelkan gelang NFC untuk membaca data pengungsi</p>
                    </button>

                    {/* Write NFC */}
                    <button
                        onClick={showWriteSelection}
                        className="bento-card p-6 md:p-8 hover:border-secondary hover:bg-secondary/5 transition-all group text-left"
                    >
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-secondary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Upload className="w-8 h-8 md:w-10 md:h-10 text-secondary" />
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">Kirim Data</h3>
                        <p className="text-sm text-muted-foreground">Pilih pengungsi dan kirim data ke gelang NFC</p>
                    </button>
                </div>
            </div>
        );
    }

    // Write Selection Screen - List of people
    if (mode === 'write-select') {
        return (
            <div className="animate-fade-in">
                <div className="mb-4 md:mb-6">
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-3"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm">Kembali</span>
                    </button>
                    <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground">Pilih Pengungsi</h1>
                    <p className="text-sm md:text-base text-muted-foreground mt-1">Pilih data pengungsi yang akan dikirim ke gelang NFC</p>
                </div>

                {/* Search Box */}
                <div className="mb-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Cari nama pengungsi..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-muted border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50"
                        />
                    </div>
                </div>

                {/* People List */}
                <div className="space-y-3">
                    {filteredPeople.map((person) => (
                        <button
                            key={person.id}
                            onClick={() => selectPersonForWrite(person)}
                            className="w-full bento-card p-4 hover:border-secondary hover:bg-secondary/5 transition-all text-left flex items-center gap-4"
                        >
                            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                                <User className="w-6 h-6 text-secondary" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-foreground">{person.name}</h3>
                                <p className="text-sm text-muted-foreground">{person.age} tahun • {person.bloodType}</p>
                            </div>
                            <div className="text-xs text-muted-foreground">
                                {person.id}
                            </div>
                        </button>
                    ))}

                    {filteredPeople.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                            <p>Tidak ada pengungsi ditemukan</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Read Waiting Screen
    if (mode === 'read-waiting') {
        return (
            <div className="animate-fade-in">
                <div className="mb-4 md:mb-6">
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-3"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm">Kembali</span>
                    </button>
                </div>

                <div className="flex flex-col items-center justify-center py-12 md:py-20">
                    {/* Animated bracelet/watch icon */}
                    <div className="relative mb-8">
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                            <Watch className="w-16 h-16 md:w-20 md:h-20 text-primary" />
                        </div>
                        {/* NFC waves */}
                        <div className="absolute inset-0 rounded-full border-4 border-primary/30 animate-ping" />
                        <div className="absolute -inset-4 rounded-full border-2 border-primary/20 animate-ping" style={{ animationDelay: '0.5s' }} />
                    </div>

                    <div className="text-center max-w-md px-4">
                        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">Tempelkan Gelang NFC</h2>
                        <p className="text-muted-foreground mb-6">
                            Dekatkan gelang NFC pengungsi ke bagian belakang perangkat Anda untuk membaca data
                        </p>

                        {/* Visual instruction */}
                        <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 mb-6">
                            <div className="flex items-center justify-center gap-4">
                                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                                    <Watch className="w-6 h-6 text-primary" />
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0s' }} />
                                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.1s' }} />
                                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.2s' }} />
                                </div>
                                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                                    <Nfc className="w-6 h-6 text-primary" />
                                </div>
                            </div>
                        </div>

                        {isScanning && (
                            <div className="flex items-center justify-center gap-2 text-primary">
                                <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                                <span className="text-sm font-medium">Menunggu gelang NFC...</span>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleBack}
                        className="mt-8 px-6 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors"
                    >
                        Batal
                    </button>
                </div>
            </div>
        );
    }

    // Write Waiting Screen
    if (mode === 'write-waiting') {
        return (
            <div className="animate-fade-in">
                <div className="mb-4 md:mb-6">
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-3"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm">Kembali</span>
                    </button>
                </div>

                <div className="flex flex-col items-center justify-center py-12 md:py-20">
                    {/* Selected person info */}
                    {selectedPerson && (
                        <div className="mb-6 p-4 rounded-xl bg-secondary/10 border border-secondary/20 text-center">
                            <p className="text-sm text-muted-foreground">Mengirim data:</p>
                            <p className="font-bold text-foreground">{selectedPerson.name}</p>
                        </div>
                    )}

                    {/* Animated bracelet/watch icon */}
                    <div className="relative mb-8">
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-secondary/10 flex items-center justify-center animate-pulse">
                            <Watch className="w-16 h-16 md:w-20 md:h-20 text-secondary" />
                        </div>
                        {/* NFC waves */}
                        <div className="absolute inset-0 rounded-full border-4 border-secondary/30 animate-ping" />
                        <div className="absolute -inset-4 rounded-full border-2 border-secondary/20 animate-ping" style={{ animationDelay: '0.5s' }} />
                    </div>

                    <div className="text-center max-w-md px-4">
                        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">Tempelkan Gelang NFC</h2>
                        <p className="text-muted-foreground mb-6">
                            Dekatkan gelang NFC ke bagian belakang perangkat Anda untuk mengirim data
                        </p>

                        {/* Visual instruction */}
                        <div className="p-4 rounded-xl bg-secondary/5 border border-secondary/20 mb-6">
                            <div className="flex items-center justify-center gap-4">
                                <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center">
                                    <Nfc className="w-6 h-6 text-secondary" />
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 rounded-full bg-secondary animate-bounce" style={{ animationDelay: '0s' }} />
                                    <div className="w-2 h-2 rounded-full bg-secondary animate-bounce" style={{ animationDelay: '0.1s' }} />
                                    <div className="w-2 h-2 rounded-full bg-secondary animate-bounce" style={{ animationDelay: '0.2s' }} />
                                </div>
                                <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center">
                                    <Watch className="w-6 h-6 text-secondary" />
                                </div>
                            </div>
                        </div>

                        {isScanning && (
                            <div className="flex items-center justify-center gap-2 text-secondary">
                                <div className="w-2 h-2 rounded-full bg-secondary animate-ping" />
                                <span className="text-sm font-medium">Mengirim data ke gelang NFC...</span>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleBack}
                        className="mt-8 px-6 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors"
                    >
                        Batal
                    </button>
                </div>
            </div>
        );
    }

    // Write Success Screen
    if (mode === 'write-success') {
        return (
            <div className="animate-fade-in">
                <div className="mb-4 md:mb-6">
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-3"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm">Kembali</span>
                    </button>
                </div>

                <div className="flex flex-col items-center justify-center py-12 md:py-20">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-success/20 flex items-center justify-center mb-6">
                        <Upload className="w-12 h-12 md:w-16 md:h-16 text-success" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">Data Berhasil Dikirim!</h2>
                    {selectedPerson && (
                        <p className="text-muted-foreground text-center max-w-md mb-2">
                            Data <span className="font-semibold text-foreground">{selectedPerson.name}</span> telah berhasil ditulis ke gelang NFC
                        </p>
                    )}
                    <p className="text-sm text-muted-foreground mb-6">ID: {selectedPerson?.id}</p>
                    <button
                        onClick={onBack}
                        className="px-6 py-3 rounded-lg gradient-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
                    >
                        Kembali ke Dashboard
                    </button>
                </div>
            </div>
        );
    }

    // Result Screen (Read Data)
    if (mode === 'result' && scannedData) {
        return (
            <div className="animate-fade-in">
                {/* Header */}
                <div className="mb-4 md:mb-6">
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-3"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm">Kembali</span>
                    </button>
                    <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground">Data Pengungsi</h1>
                    <p className="text-sm md:text-base text-muted-foreground mt-1">Hasil pemindaian NFC ID: {scannedData.id}</p>
                </div>

                {/* Person Info Card */}
                <div className="bento-card p-4 md:p-6 mb-4">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary flex items-center justify-center text-white text-2xl md:text-3xl font-bold">
                            {scannedData.name.charAt(0)}
                        </div>
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold text-foreground">{scannedData.name}</h2>
                            <p className="text-muted-foreground">{scannedData.age} tahun • Golongan Darah {scannedData.bloodType}</p>
                        </div>
                    </div>
                </div>

                {/* Medical Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Rekam Medis */}
                    <div className="bento-card p-4 md:p-5">
                        <div className="flex items-center gap-2 mb-4">
                            <Heart className="w-5 h-5 text-destructive" />
                            <h3 className="font-semibold text-foreground">Rekam Medis</h3>
                        </div>
                        <div className="space-y-3">
                            <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Riwayat Penyakit</p>
                                <div className="flex flex-wrap gap-2">
                                    {scannedData.medicalHistory.length > 0 ? (
                                        scannedData.medicalHistory.map((item, i) => (
                                            <span key={i} className="stat-badge-warning text-xs">{item}</span>
                                        ))
                                    ) : (
                                        <span className="text-sm text-muted-foreground">Tidak ada riwayat</span>
                                    )}
                                </div>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Obat yang Dikonsumsi</p>
                                <div className="flex flex-wrap gap-2">
                                    {scannedData.currentMedication.length > 0 ? (
                                        scannedData.currentMedication.map((item, i) => (
                                            <span key={i} className="stat-badge-muted text-xs">{item}</span>
                                        ))
                                    ) : (
                                        <span className="text-sm text-muted-foreground">Tidak ada obat</span>
                                    )}
                                </div>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Pemeriksaan Terakhir</p>
                                <p className="text-sm text-foreground">{scannedData.lastCheckup}</p>
                            </div>
                        </div>
                    </div>

                    {/* Alergi */}
                    <div className="bento-card p-4 md:p-5">
                        <div className="flex items-center gap-2 mb-4">
                            <AlertCircle className="w-5 h-5 text-secondary" />
                            <h3 className="font-semibold text-foreground">Alergi</h3>
                        </div>
                        <div className="space-y-2">
                            {scannedData.allergies.length > 0 ? (
                                scannedData.allergies.map((allergy, i) => (
                                    <div key={i} className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                                        <p className="text-sm font-medium text-destructive">{allergy}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-muted-foreground">Tidak ada alergi tercatat</p>
                            )}
                        </div>
                        {scannedData.allergies.length > 0 && (
                            <div className="mt-4 p-3 rounded-lg bg-warning/10">
                                <p className="text-xs text-warning font-medium">⚠️ Peringatan: Pastikan untuk memeriksa alergi sebelum memberikan obat</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Emergency Contact */}
                <div className="bento-card p-4 md:p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <Phone className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold text-foreground">Kontak Darurat</h3>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
                        <div>
                            <p className="font-medium text-foreground">{scannedData.emergencyContact.name}</p>
                            <p className="text-sm text-muted-foreground">{scannedData.emergencyContact.relation}</p>
                            <p className="text-sm text-primary font-medium mt-1">{scannedData.emergencyContact.phone}</p>
                        </div>
                        <a
                            href={`tel:${scannedData.emergencyContact.phone}`}
                            className="px-4 py-2 rounded-lg gradient-primary text-primary-foreground font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
                        >
                            <Phone className="w-4 h-4" />
                            <span className="hidden sm:inline">Hubungi</span>
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default NFCScanView;
