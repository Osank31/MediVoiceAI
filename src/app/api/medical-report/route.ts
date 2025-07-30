import { NextRequest, NextResponse } from "next/server";
import { generateReport } from "@/helpers/GoogleAIResponse";
import db from "@/config/db";
import { sessionChatTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
    const { sessionId, sessionDetail, messages } = await req.json()
    const user = await currentUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        let response = await generateReport({ sessionId, sessionDetail, messages })
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