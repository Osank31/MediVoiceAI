import db from "@/config/db";
import { sessionChatTable } from "@/config/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const {userId} = await auth()
    if (!userId) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const { searchParams } = new URL(req.url)
    const sessionId = searchParams.get('sessionId')

    if (!sessionId) {
        return NextResponse.json({ message: 'sessionId null' })
    }

    if (sessionId === 'all') { 
        const result = await db.select().from(sessionChatTable).where(eq(sessionChatTable.createdBy, userId)).orderBy(desc(sessionChatTable.id))
        return NextResponse.json(result)
    }

    else {
        const result = await db.select().from(sessionChatTable).where(eq(sessionChatTable.sessionId, sessionId))
        console.log(result[0])
        return NextResponse.json((result[0]))
    }
}