import { useState, useEffect } from 'react';
import {
    Heart,
    AlertCircle,
    Phone,
    ArrowLeft,
    Download,
    Upload,
    Nfc,
    Watch
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

// Mock data - simulating scanned NFC data
const mockPersonData: PersonData = {
    id: 'NFC-001',
    name: 'Budi Santoso',
    age: 45,
    bloodType: 'O+',
    medicalHistory: ['Hipertensi', 'Diabetes Tipe 2'],
    allergies: ['Penisilin', 'Sulfa'],
    emergencyContact: {
        name: 'Siti Rahayu',
        relation: 'Istri',
        phone: '+62 812-3456-7890'
    },
    lastCheckup: '15 Januari 2026',
    currentMedication: ['Amlodipine 5mg', 'Metformin 500mg']
};

interface NFCScanViewProps {
    onBack: () => void;
}

type NFCMode = 'select' | 'read-waiting' | 'write-waiting' | 'result' | 'write-success';

const NFCScanView = ({ onBack }: NFCScanViewProps) => {
    const [mode, setMode] = useState<NFCMode>('select');
    const [isScanning, setIsScanning] = useState(false);
    const [scannedData, setScannedData] = useState<PersonData | null>(null);

    const startReadMode = () => {
        setMode('read-waiting');
        setIsScanning(true);

        // Simulate NFC detection after 3 seconds
        setTimeout(() => {
            setScannedData(mockPersonData);
            setMode('result');
            setIsScanning(false);
        }, 3000);
    };

    const startWriteMode = () => {
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
        setIsScanning(false);
    };

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
                        onClick={startWriteMode}
                        className="bento-card p-6 md:p-8 hover:border-secondary hover:bg-secondary/5 transition-all group text-left"
                    >
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-secondary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Upload className="w-8 h-8 md:w-10 md:h-10 text-secondary" />
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">Kirim Data</h3>
                        <p className="text-sm text-muted-foreground">Tempelkan gelang NFC untuk mengirim data pengungsi</p>
                    </button>
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
                    <p className="text-muted-foreground text-center max-w-md mb-6">
                        Data pengungsi telah berhasil ditulis ke gelang NFC
                    </p>
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
                                    {scannedData.medicalHistory.map((item, i) => (
                                        <span key={i} className="stat-badge-warning text-xs">{item}</span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Obat yang Dikonsumsi</p>
                                <div className="flex flex-wrap gap-2">
                                    {scannedData.currentMedication.map((item, i) => (
                                        <span key={i} className="stat-badge-muted text-xs">{item}</span>
                                    ))}
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
                        <div className="mt-4 p-3 rounded-lg bg-warning/10">
                            <p className="text-xs text-warning font-medium">⚠️ Peringatan: Pastikan untuk memeriksa alergi sebelum memberikan obat</p>
                        </div>
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
