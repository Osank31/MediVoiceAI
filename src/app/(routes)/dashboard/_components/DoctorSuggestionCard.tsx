'use client'

import { Button } from "@/components/ui/button"
import { DoctorAgent } from "./DoctorAgentCard"
import Image from 'next/image'
import { IconArrowRight } from "@tabler/icons-react"
import axios from "axios"
import { useRouter } from "next/navigation"

function DoctorSuggestionCard({ docSugg, notes }: { docSugg: DoctorAgent, notes:string }) {
    const router = useRouter()
    const handleSubmit = async () => {
        const response = await axios.post('/api/generate-session', {note: notes,
            doctor: docSugg
        })
        console.log(response.data)
        const {sessionId} = response.data
        router.push(`/medical-agent/${sessionId}`)
    }
    return (
        <div className="max-w-xs mx-auto p-2">
            <Image 
                alt={docSugg.specialist} 
                src={docSugg.image} 
                width={150} 
                height={225}
                className="w-full h-[225px] object-cover rounded-xl"
            />
            <h2 className="font-bold mt-1 text-center">{docSugg.specialist}</h2>
            <p className="line-clamp-2 mt-1 text-sm text-gray-500 text-center">{docSugg.description}</p>
            <Button className="w-full mt-2 flex items-center justify-center gap-1"
                onClick={handleSubmit}
            >
                Start Consultation <IconArrowRight size={16} />
            </Button>
        </div>
    )
}

export default DoctorSuggestionCard
