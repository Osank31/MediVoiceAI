import { NextRequest, NextResponse } from "next/server";
import { generateReport } from "@/helpers/GoogleAIResponse";
import db from "@/config/db";
import { sessionChatTable } from "@/config/schema";
import { eq } from "drizzle-orm";

import { Input } from "@/helpers/GoogleAIResponse";
import { SessionDetails } from "@/app/(routes)/medical-agent/[sessionId]/page";
export async function POST(req: NextRequest) {
    console.log("hit /api/medical-report")
    const { sessionId, sessionDetail, messages }:{sessionId:string; sessionDetail: SessionDetails; messages: Input[]} = await req.json()
    try {
        const payload: {sessionId:string; sessionDetail: SessionDetails; messages: Input[]} = { sessionId, sessionDetail, messages };
        let response = await generateReport(payload);
        console.log('here')
        response = response.trim().replace('```json', '').replace("```",'')
        console.log(JSON.parse(response))
        const report = JSON.parse(response)
        await db.update(sessionChatTable).set({report}).where(eq(sessionChatTable.sessionId, sessionId))
        return NextResponse.json(JSON.parse(response))
    } catch (error) {
        return NextResponse.json('hello')
    }
}