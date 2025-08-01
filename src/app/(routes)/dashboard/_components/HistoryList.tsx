'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import AddNewSessionDialog from "./AddNewSessionDialog";
import HistoryTable from "./HistoryTable";
export type History={
    conversation?: string | null;
    createdBy: string;
    id: number;
    notes?: string | null;
    sessionId: string;
    doctor?: {
        agentPrompt?: string;
        description?: string;
        id: number;
        image?: string;
        speciaist?: string;
        subscriptionRequired?: boolean;
        voiceId?: string;
    };
    report?:{
        agent?: string;
        chiefComplaint?: string;
        duration?: string;
        medicationsMentioned?: string[];
        recommendations?: string[];
        sessionId?:string;
        severity?: string;
        summary?: string;
        timestamp?: string;
        user?: string;
    } | null;
}
function HistoryList() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [historyList, setHistoryList] = useState<History[]>([]);
    const getHistoryList = async () =>{
        try {
            const response = await fetch('/api/get-session-data?sessionId=all');
            const data : History[] = await response.json();
            console.log((data));
            setHistoryList(data);
        } catch (error) {
            console.error("Error fetching history list:", error);
            setError("Failed to load history. Please try again later.");
        }
        finally{
            setIsLoading(false);
        }
    }

    useEffect(()=>{
        getHistoryList();
    },[])
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="loader"></div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }
  return (
    <div className="mt-10 w-11/12">
        {historyList.length === 0 ? (
            <div className="flex items-center flex-col justify-center gap-5 p-7 border-4 border-dashed rounded-2xl ">
                <Image alt='empty' src={'/medical-assistance.png'}
                    width={200}
                    height={200}
                />
                <h2 className="font-bold text-xl mt-5">No Recent Consultations</h2>
                <p>It looks like you haven&apos;t consulted with any doctors yet.</p>
                <AddNewSessionDialog/>
            </div>
        ):(
            <div>
                <HistoryTable historyList={historyList} />
            </div>
        )}    

    </div>
  )
}
export default HistoryList