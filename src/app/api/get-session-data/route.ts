import db from "@/config/db";
import { sessionChatTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const {searchParams} = new URL(req.url)
    const sessionId = searchParams.get('sessionId')

    if(!sessionId){
        return NextResponse.json({message: 'sessionId null'})
    }
    
    const result = await db.select().from(sessionChatTable).where(eq(sessionChatTable.sessionId, sessionId))
    console.log(result[0])
    return NextResponse.json((result[0]))
}