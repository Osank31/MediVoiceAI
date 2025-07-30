'use client'

import { useState, useEffect } from "react"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { Circle, PhoneOff } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Vapi from "@vapi-ai/web"
import { CreateAssistantDTO } from "@vapi-ai/web/dist/api"

type SessionDetails = {
    id: number;
    sessionId: string;
    notes: string;
    conversation: JSON;
    report: JSON;
    createdBy: string;
    doctor: {
        id: number;
        specialist: string;
        description: string;
        image: string;
        agentPrompt: string;
        voiceId: string;
        subscriptionRequired: boolean;
    };
};


function DoctorSessionPage() {
    const router = useRouter()
    const { sessionId } = useParams()
    const [data, setData] = useState<SessionDetails | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const [vapi, setVapi] = useState<Vapi | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [transcript, setTranscript] = useState<Array<{ role: string, text: string }>>([]);

    const startCall = () => {
        const apiKey = process.env.NEXT_PUBLIC_VAPI_API_KEY!;
        const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISSTANT_ID!;

        if (!apiKey || !assistantId) {
            console.error("Missing VAPI API Key or Assistant ID.");
            return;
        }

        const vapiInstance = new Vapi(apiKey);
        setVapi(vapiInstance);

        console.log('Vapi instance created. Connecting...');

        const VapiAIConfig: CreateAssistantDTO = {
            name: 'AI Medical Voice Agent',
            firstMessage: "Hi there! I'm your medical assistant. I'm here to help you with any health questions today. What can I assist you with?",
            transcriber: {
                provider: 'assembly-ai',
                language: 'en',
            },
            voice: {
                provider: 'playht',
                voiceId: data?.doctor?.voiceId ?? '',
            },
            model: {
                provider: 'openai',
                model: 'gpt-4',
                messages: [
                    {
                        role: 'system',
                        content: data?.doctor?.agentPrompt || 'You are a helpful medical assistant designed to answer health-related questions in a clear and accurate way.'
                    }
                ]
            }
        };


        // Event listeners
        vapiInstance.on('call-start', () => {
            console.log('Call started');
            setIsConnected(true);
        });

        vapiInstance.on('call-end', () => {
            console.log('Call ended');
            setIsConnected(false);
            setIsSpeaking(false);
        });

        vapiInstance.on('speech-start', () => {
            console.log('Assistant started speaking');
            setIsSpeaking(true);
        });

        vapiInstance.on('speech-end', () => {
            console.log('Assistant stopped speaking');
            setIsSpeaking(false);
        });

        vapiInstance.on('message', (message) => {
            if (message.type === 'transcript') {
                setTranscript((prev) => {
                    const last = prev[prev.length - 1];

                    if (last && last.role === message.role) {
                        if (message.transcript.startsWith(last.text)) {
                            const updated = [...prev];
                            updated[updated.length - 1] = {
                                ...last,
                                text: message.transcript
                            };
                            return updated;
                        }

                        return [
                            ...prev,
                            {
                                role: message.role,
                                text: message.transcript
                            }
                        ];
                    }

                    return [
                        ...prev,
                        {
                            role: message.role,
                            text: message.transcript
                        }
                    ];
                });
            }
        });


        vapiInstance.on('error', (error) => {
            console.error('Vapi error:', error);
        });

        try {
            vapiInstance.start({ ...VapiAIConfig });
        } catch (e) {
            console.error("Failed to start Vapi call:", e);
        }
    };

    const endCall = async () => {
        if (vapi) {
            vapi.stop();
            setIsConnected(false)
            setIsSpeaking(false)
            const result=generateReport()
        }
    };

    useEffect(() => {
        if (!sessionId) return;

        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/get-session-data?sessionId=${sessionId}`);
                setData(response.data);
                console.log(response.data);
            } catch (err) {
                console.error("Error fetching session data:", err);
                setError("Failed to load data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [sessionId]);
    useEffect(() => console.log((transcript)), [transcript, setTranscript])

    useEffect(() => {
        return () => {
            if (vapi) {
                vapi.stop();
            }
        };
    }, [vapi]);

    const generateReport = async () => {
        try {
            const result = await axios.post('/api/medical-report', {
                messages: transcript,
                sessionDetail: data,
                sessionId
            })
            console.log(result.data)
            if (result.data) 
                router.push('/dashboard')
        } catch (error) {
            console.log(error)
        }
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="flex items-center justify-center">
            <div className="flex justify-center items-center flex-col w-11/12 p-10 border rounded-4xl bg-secondary">
                <div className="flex justify-between items-center w-11/12">
                    <h2 className="p-1 px-2 border rounded-md flex gap-2 items-center">
                        <Circle className={`h-4 w-4 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
                        {isConnected ? 'Connected' : 'Not Connected'}
                    </h2>
                    <h2 className="font-bold text-xl text-gray-400">00:00</h2>
                </div>

                <div className="flex mt-10">
                    {data && (
                        <div className="flex items-center flex-col">
                            <Image
                                src={data?.doctor.image ?? '/default-image.png'}
                                alt={data?.doctor.specialist ?? 'Doctor image'}
                                width={120}
                                height={120}
                                className="h-[100px] w-[100px] object-cover rounded-full"
                            />
                            <h2 className="mt-2 text-lg">{data.doctor.specialist}</h2>
                            <p className="text-sm text-gray-400">AI Medical Voice Agent</p>

                            <div className="mt-8 w-full max-w-md">
                                <h2 className="mb-2 text-sm text-gray-400">Live Transcript</h2>
                                <div className="max-h-60 overflow-y-auto text-sm border rounded-md p-3 bg-white">
                                    {transcript.slice(-2).map((msg, index) => (
                                        <div key={index} className="mb-1">
                                            <strong className={msg.role === 'user' ? 'text-blue-500' : 'text-green-600'}>
                                                {msg.role}:
                                            </strong>{" "}
                                            {msg.text}
                                        </div>
                                    ))}
                                    {transcript.length === 0 && <p className="text-gray-400">No messages yet...</p>}
                                </div>
                            </div>

                            {!isConnected ? (
                                <Button className="mt-10" onClick={startCall}>Start call</Button>
                            ) : (
                                <div className="mt-10">
                                    <Button variant={'destructive'} onClick={endCall}>
                                        <PhoneOff className="mr-2 h-4 w-4" /> Disconnect
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DoctorSessionPage;
