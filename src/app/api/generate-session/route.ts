import { v4 as uuidv4 } from 'uuid';
import { NextRequest, NextResponse } from 'next/server';
import { sessionChatTable } from '@/config/schema';
import db from '@/config/db';
import { currentUser } from '@clerk/nextjs/server';

export async function POST(req: NextRequest) {
    const body = await req.json()
    const {note}: {note: string} = body || ''
    const doctor = body || {}
    const sessionId = uuidv4();
    const user = await currentUser()
    
    
    try {
        if(!user){
            return NextResponse.json({message: 'user not found'})
        }
        const result = await db.insert(sessionChatTable).values({
            sessionId,
            notes: note,
            conversation: null,
            report: null,
            createdBy: user.id,
            doctor
        }).returning()
        return NextResponse.json(result[0]);
    } catch (error) {
        return NextResponse.json(error);
    }
}