import { PrismaClient } from '@prisma/client';

declare global {
    let  prisma: PrismaClient | undefined;
}

const client = (global as any).prisma || new PrismaClient();
if (process.env.NODE_ENV === 'production') {
    (global as any).prisma = client;
}

export default client;