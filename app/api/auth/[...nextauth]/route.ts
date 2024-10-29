import bcryptjs from 'bcryptjs';
import NextAuth, { AuthOptions } from 'next-auth';
import prisma from '@/app/libs/prismadb';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GithubProviders from 'next-auth/providers/github';
import GoogleProviders from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProviders({
            clientId: process.env.G_CLIENT_ID as string,
            clientSecret: process.env.G_CLIENT_SECRET as string
        }),
        GoogleProviders({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Email/Password is required');
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                if (!user || !user.hashedPassword) {
                    throw new Error('Invalid credentials');
                }

                const isCorrectPassword = await bcryptjs.compare(credentials.password, user.hashedPassword);

                if (!isCorrectPassword) {
                    throw new Error('Incorrect password, please try again');
                }

                return user;
            }
        })
    ],
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };