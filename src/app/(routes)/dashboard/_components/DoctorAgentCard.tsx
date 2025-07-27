'use client'

import { Button } from "@/components/ui/button";
import { IconArrowRight } from "@tabler/icons-react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

export type DoctorAgent = {
    id: number;
    specialist: string;
    description: string;
    image: string;
    agentPrompt: string;
    voiceId: string;
    subscriptionRequired: boolean;
}

function DoctorAgentCard({doctorAgent}: {doctorAgent: DoctorAgent}) {
  const router = useRouter()
  return (
    <div className="">
        <Image alt={doctorAgent.specialist} src={doctorAgent.image} width={200} height={300}
            className="w-full h-[250px] object-cover rounded-xl"
        />
        <h2 className="font-bold mt-1">{doctorAgent.specialist}</h2>
        <p className="line-clamp-2 mt-1 text-sm text-gray-500">{doctorAgent.description}</p>
        <Button className="w-full mt-2"
            onClick={async ()=>{
              const response = await axios.post('/api/generate-session', {note: '', doctor: doctorAgent})
              const {sessionId} = response.data
              console.log(sessionId)
              router.push(`/medical-agent/${sessionId}`)
            }}
        >Start Counsultation <IconArrowRight/></Button>
    </div>
  )
}
export default DoctorAgentCard