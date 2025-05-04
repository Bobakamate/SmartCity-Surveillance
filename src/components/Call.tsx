import React, { useState, useEffect } from 'react';
import { ArrowLeft, Phone, X, Mic, MicOff, Video, VideoOff } from 'lucide-react';

// Types pour les données de conversation
interface Message {
    id: number;
    text: string;
    sender: 'user' | 'contact';
    timestamp: string;
}

interface Contact {
    id: string;
    name: string;
    avatar: string;
    status: 'En ligne' | 'Hors ligne' | 'Vu dernièrement à 14:30';
}

interface CallProps {
    data: any;
    onClose: () => void;
}

// Données fictives
const contactData: Contact = {
    id: "CONT001",
    name: "Agent Special",
    avatar: "https://ui-avatars.com/api/?name=A&background=random&color=fff",
    status: "En ligne"
};

const messagesData: Message[] = [
    { id: 1, text: "Bonjour ! Comment vas-tu aujourd'hui ?", sender: 'contact', timestamp: '10:30' },
    { id: 2, text: "Salut ! Ça va bien, merci. Et toi ?", sender: 'user', timestamp: '10:31' },
    { id: 3, text: "Je vais très bien. Tu as prévu quelque chose ce weekend ?", sender: 'contact', timestamp: '10:32' },
    { id: 4, text: "Je pense aller au cinéma, il y a un nouveau film qui vient de sortir.", sender: 'user', timestamp: '10:34' },
    { id: 5, text: "Oh, ça a l'air intéressant ! De quel film s'agit-il ?", sender: 'contact', timestamp: '10:35' }
];

// Message de réponse automatique
const autoResponseMessage = "Comment allez-vous ?";

const Call: React.FC<CallProps> = ({ data, onClose }) => {
    const [messages, setMessages] = useState<Message[]>(messagesData);
    const [newMessage, setNewMessage] = useState<string>('');
    const [inCall, setInCall] = useState<boolean>(false);
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const [isVideoOn, setIsVideoOn] = useState<boolean>(true);
    const [callDuration, setCallDuration] = useState<number>(0);
    const [showAutoResponse, setShowAutoResponse] = useState<boolean>(false);

    // Gestion du temps d'appel
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (inCall) {
            interval = setInterval(() => {
                setCallDuration(prev => prev + 1);
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [inCall]);

    // Formatage du temps d'appel
    const formatCallDuration = () => {
        const minutes = Math.floor(callDuration / 60);
        const seconds = callDuration % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    // Gestion des appels
    const startCall = () => {
        setInCall(true);
        setCallDuration(0);
        setShowAutoResponse(true);

        // Afficher le message de réponse automatique après 2 secondes
        setTimeout(() => {
            setMessages(prev => [
                ...prev,
                {
                    id: prev.length + 1,
                    text: autoResponseMessage,
                    sender: 'contact',
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }
            ]);
        }, 1000);
    };

    const endCall = () => {
        setInCall(false);
        setIsMuted(false);
        setIsVideoOn(true);
        setShowAutoResponse(false);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    const toggleVideo = () => {
        setIsVideoOn(!isVideoOn);
    };

    // Envoyer un message
    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setMessages([
                ...messages,
                { id: messages.length + 1, text: newMessage, sender: 'user', timestamp: now }
            ]);
            setNewMessage('');
        }
    };

    return (
        <div className="flex flex-col h-full bg-gray-900 text-white">
            {/* Header avec info contact */}
            <div className="bg-gray-800 text-white p-4 flex items-center justify-between shadow-md">
                <div className="flex items-center">
                    <button
                        className="p-2 mr-3 rounded-full hover:bg-gray-700"
                        onClick={onClose}
                    >
                        <ArrowLeft size={24}/>
                    </button>
                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden mr-3">
                            <img
                                src={contactData.avatar}
                                alt={contactData.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "/api/placeholder/40/40";
                                }}
                            />
                        </div>
                        <div>
                            <h2 className="font-semibold text-lg">{contactData.name}</h2>
                            <p className="text-xs text-green-100">{contactData.status}</p>
                        </div>
                    </div>
                </div>
                <div>
                    {!inCall ? (
                        <button
                            onClick={startCall}
                            className="p-3 bg-blue-600 rounded-full hover:bg-blue-700 text-white"
                        >
                            <Phone size={20}/>
                        </button>
                    ) : null}
                </div>
            </div>

            {/* Corps de la conversation ou de l'appel */}
            {!inCall ? (
                <div className="flex-1 p-4 overflow-y-auto bg-gray-800">
                    <div className="space-y-3">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-xs rounded-lg px-4 py-2 ${
                                    message.sender === 'user'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-700 text-white'
                                }`}>
                                    <p>{message.text}</p>
                                    <span className="text-xs text-gray-300 block text-right mt-1">
                                        {message.timestamp}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex-1 bg-gray-800 flex flex-col items-center justify-center text-white">
                    <div
                        className="w-24 h-24 mb-6 rounded-full bg-gray-600 overflow-hidden flex items-center justify-center">
                        {isVideoOn ? (
                            <img
                                src={contactData.avatar}
                                alt={contactData.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "/api/placeholder/96/96";
                                }}
                            />
                        ) : (
                            <div className="text-4xl text-gray-300">{contactData.name.charAt(0)}</div>
                        )}
                    </div>
                    <h2 className="text-2xl font-semibold mb-2">{contactData.name}</h2>
                    <p className="text-gray-300 mb-8">{formatCallDuration()}</p>

                    {/* Contrôles d'appel */}
                    <div className="flex space-x-6">
                        <button
                            onClick={toggleMute}
                            className={`p-4 rounded-full ${isMuted ? 'bg-gray-600' : 'bg-gray-700'}`}
                        >
                            {isMuted ? <MicOff size={24}/> : <Mic size={24}/>}
                        </button>

                        <button
                            onClick={endCall}
                            className="p-4 bg-red-600 rounded-full hover:bg-red-700"
                        >
                            <X size={24}/>
                        </button>

                        <button
                            onClick={toggleVideo}
                            className={`p-4 rounded-full ${isVideoOn ? 'bg-gray-700' : 'bg-gray-600'}`}
                        >
                            {isVideoOn ? <Video size={24}/> : <VideoOff size={24}/>}
                        </button>
                    </div>
                </div>
            )}

            {/* Champ de saisie de message */}
            {!inCall && (
                <div className="p-3 bg-gray-800 border-t border-gray-700">
                    <div className="flex items-center">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Écrivez un message..."
                            className="flex-1 border border-gray-600 bg-gray-700 rounded-full py-2 px-4 focus:outline-none focus:border-blue-500 text-white"
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <button
                            onClick={handleSendMessage}
                            className="ml-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Call;