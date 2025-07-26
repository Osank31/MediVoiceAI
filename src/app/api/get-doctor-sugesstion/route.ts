import { suggestDoctors } from "@/helpers/GoogleAIResponse";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { note }: { note: string } = await req.json();
    if (!note) {
        return NextResponse.json({ message: 'No Notes recieved' })
    }
    const doctorResponseString = await suggestDoctors(note)
    if(doctorResponseString){
        const cleaned = doctorResponseString
        .replace(/```json/, '')
        .replace(/```/, '')
        .trim();
        
        const doctorResponseArray = JSON.parse(cleaned)
        console.log(doctorResponseArray)
        return NextResponse.json(doctorResponseArray)
    }
    return NextResponse.json({message: 'server error'})
}