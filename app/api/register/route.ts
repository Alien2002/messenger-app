import bcryptjs from 'bcryptjs';
import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
    
        const { email, name, password } = body;
    
        if (!email || !name || !password) {
            return new NextResponse(JSON.stringify({ error: 'Please provide all required fields' }), { status: 400 });
        }
    
        const hashedPassword = await bcryptjs.hash(password, 12);
        console.log('hashedPassword... ', hashedPassword)
    
        const user = await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword
            }
        });
    
        return NextResponse.json(user);
        
    } catch (error) {
        console.log(error, ' Registration error...');
        return new NextResponse(JSON.stringify({ error: 'Registration failed' }), { status: 500 });
    }
};