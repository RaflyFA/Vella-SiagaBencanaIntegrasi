import { useState, useRef, useEffect } from 'react';
import {
    Send,
    Users,
    Search,
    Check,
    CheckCheck
} from 'lucide-react';

interface Team {
    id: string;
    name: string;
    type: 'sar' | 'medis' | 'logistik' | 'relawan';
    lastMessage: string;
    lastMessageTime: string;
    unread: number;
}

interface Message {
    id: string;
    senderId: string;
    senderName: string;
    content: string;
    timestamp: string;
    read: boolean;
    isMine: boolean;
}

const teamsList: Team[] = [
    { id: 'tim-sar-1', name: 'Tim SAR Alpha', type: 'sar', lastMessage: 'Siap melaksanakan evakuasi', lastMessageTime: '10:30', unread: 2 },
    { id: 'tim-medis-1', name: 'Tim Medis Utama', type: 'medis', lastMessage: 'Obat-obatan sudah disiapkan', lastMessageTime: '10:15', unread: 0 },
    { id: 'tim-logistik-1', name: 'Tim Logistik', type: 'logistik', lastMessage: 'Bantuan akan tiba 1 jam lagi', lastMessageTime: '09:45', unread: 1 },
    { id: 'tim-sar-2', name: 'Tim SAR Bravo', type: 'sar', lastMessage: 'Area selatan sudah aman', lastMessageTime: '09:30', unread: 0 },
    { id: 'tim-relawan-1', name: 'Relawan Posko 1', type: 'relawan', lastMessage: 'Makanan siap distribusi', lastMessageTime: '09:00', unread: 0 },
];

const mockMessages: Record<string, Message[]> = {
    'tim-sar-1': [
        { id: '1', senderId: 'tim-sar-1', senderName: 'Tim SAR Alpha', content: 'Laporan: Kami sudah di lokasi banjir', timestamp: '10:00', read: true, isMine: false },
        { id: '2', senderId: 'me', senderName: 'Admin Posko', content: 'Baik, berapa korban yang terlihat?', timestamp: '10:05', read: true, isMine: true },
        { id: '3', senderId: 'tim-sar-1', senderName: 'Tim SAR Alpha', content: 'Sekitar 15 orang masih terjebak', timestamp: '10:10', read: true, isMine: false },
        { id: '4', senderId: 'me', senderName: 'Admin Posko', content: 'Segera lakukan evakuasi, tim medis dalam perjalanan', timestamp: '10:15', read: true, isMine: true },
        { id: '5', senderId: 'tim-sar-1', senderName: 'Tim SAR Alpha', content: 'Siap melaksanakan evakuasi', timestamp: '10:30', read: false, isMine: false },
    ],
    'tim-medis-1': [
        { id: '1', senderId: 'me', senderName: 'Admin Posko', content: 'Siapkan obat-obatan untuk 20 korban', timestamp: '09:50', read: true, isMine: true },
        { id: '2', senderId: 'tim-medis-1', senderName: 'Tim Medis Utama', content: 'Obat-obatan sudah disiapkan', timestamp: '10:15', read: true, isMine: false },
    ],
    'tim-logistik-1': [
        { id: '1', senderId: 'tim-logistik-1', senderName: 'Tim Logistik', content: 'Stok makanan tinggal 50 porsi', timestamp: '09:30', read: true, isMine: false },
        { id: '2', senderId: 'me', senderName: 'Admin Posko', content: 'Segera kirim bantuan tambahan', timestamp: '09:35', read: true, isMine: true },
        { id: '3', senderId: 'tim-logistik-1', senderName: 'Tim Logistik', content: 'Bantuan akan tiba 1 jam lagi', timestamp: '09:45', read: false, isMine: false },
    ],
};

const MessagesView = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const filteredTeams = teamsList.filter(team =>
        team.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getTypeColor = (type: Team['type']) => {
        switch (type) {
            case 'sar': return 'bg-destructive/10 text-destructive';
            case 'medis': return 'bg-success/10 text-success';
            case 'logistik': return 'bg-warning/10 text-warning';
            case 'relawan': return 'bg-primary/10 text-primary';
        }
    };

    const getTypeLabel = (type: Team['type']) => {
        switch (type) {
            case 'sar': return 'SAR';
            case 'medis': return 'Medis';
            case 'logistik': return 'Logistik';
            case 'relawan': return 'Relawan';
        }
    };

    const selectTeam = (team: Team) => {
        setSelectedTeam(team);
        setMessages(mockMessages[team.id] || []);
    };

    const sendMessage = () => {
        if (!newMessage.trim() || !selectedTeam) return;

        const message: Message = {
            id: Date.now().toString(),
            senderId: 'me',
            senderName: 'Admin Posko',
            content: newMessage,
            timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
            read: false,
            isMine: true
        };

        setMessages(prev => [...prev, message]);
        setNewMessage('');
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="animate-fade-in h-[calc(100vh-120px)] md:h-[calc(100vh-100px)]">
            {/* Header */}
            <div className="mb-4">
                <h1 className="text-lg md:text-xl font-bold text-foreground">Pesan Tim</h1>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">Komunikasi antar tim tanggap darurat</p>
            </div>

            <div className="flex gap-4 h-[calc(100%-60px)]">
                {/* Teams List */}
                <div className={`${selectedTeam ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-80 flex-shrink-0`}>
                    {/* Search */}
                    <div className="relative mb-3">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Cari tim..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 rounded-lg bg-muted border-0 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                    </div>

                    {/* Teams */}
                    <div className="flex-1 overflow-y-auto space-y-2">
                        {filteredTeams.map((team) => (
                            <button
                                key={team.id}
                                onClick={() => selectTeam(team)}
                                className={`w-full p-3 rounded-lg text-left transition-all ${selectedTeam?.id === team.id
                                    ? 'bg-primary/10 border border-primary'
                                    : 'bg-card border border-border hover:border-primary/50'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <Users className="w-5 h-5 text-primary" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2">
                                            <h3 className="text-sm font-semibold text-foreground truncate">{team.name}</h3>
                                            <span className="text-[10px] text-muted-foreground flex-shrink-0">{team.lastMessageTime}</span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className={`text-[10px] px-1.5 py-0.5 rounded ${getTypeColor(team.type)}`}>
                                                {getTypeLabel(team.type)}
                                            </span>
                                            <p className="text-xs text-muted-foreground truncate flex-1">{team.lastMessage}</p>
                                            {team.unread > 0 && (
                                                <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center flex-shrink-0">
                                                    {team.unread}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Chat Area */}
                {selectedTeam ? (
                    <div className="flex-1 flex flex-col bg-card border border-border rounded-xl overflow-hidden">
                        {/* Chat Header */}
                        <div className="p-3 border-b border-border flex items-center gap-3">
                            <button
                                onClick={() => setSelectedTeam(null)}
                                className="md:hidden text-muted-foreground hover:text-foreground"
                            >
                                ←
                            </button>
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <Users className="w-4 h-4 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-semibold text-foreground truncate">{selectedTeam.name}</h3>
                                <span className={`text-[10px] px-1.5 py-0.5 rounded ${getTypeColor(selectedTeam.type)}`}>
                                    {getTypeLabel(selectedTeam.type)}
                                </span>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-3 space-y-3">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.isMine ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-2.5 rounded-xl ${message.isMine
                                            ? 'bg-primary text-primary-foreground rounded-br-sm'
                                            : 'bg-muted text-foreground rounded-bl-sm'
                                            }`}
                                    >
                                        <p className="text-sm">{message.content}</p>
                                        <div className={`flex items-center gap-1 mt-1 ${message.isMine ? 'justify-end' : 'justify-start'}`}>
                                            <span className={`text-[10px] ${message.isMine ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                                                {message.timestamp}
                                            </span>
                                            {message.isMine && (
                                                message.read
                                                    ? <CheckCheck className="w-3 h-3 text-primary-foreground/70" />
                                                    : <Check className="w-3 h-3 text-primary-foreground/70" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-3 border-t border-border">
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    placeholder="Ketik pesan..."
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                                    className="flex-1 px-3 py-2 rounded-lg bg-muted border-0 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                                <button
                                    onClick={sendMessage}
                                    disabled={!newMessage.trim()}
                                    className="w-9 h-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="hidden md:flex flex-1 items-center justify-center bg-card border border-border rounded-xl">
                        <div className="text-center text-muted-foreground">
                            <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                            <p className="text-sm">Pilih tim untuk memulai percakapan</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessagesView;
