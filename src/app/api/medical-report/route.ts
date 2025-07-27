import { NextRequest, NextResponse } from "next/server";
import { generateReport } from "@/helpers/GoogleAIResponse";

export async function POST(req: NextRequest) {
    const { sessionId, sessionDetail, messages } = await req.json()

    try {
        let response = await generateReport({ sessionId, sessionDetail, messages })
        console.log('here')
        response = response.trim().replace('```json', '').replace("```",'')
        console.log(JSON.parse(response))
        return NextResponse.json(JSON.parse(response))
    } catch (error) {
        return NextResponse.json('hello')
    }
}