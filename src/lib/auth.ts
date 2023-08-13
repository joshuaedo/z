import { NextAuthOptions } from "next-auth";
import { db } from "./db";
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/sign-in'
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async session({ token, session }) {
            if (token) {
                session.user.id = token.id;
                session.user?.name = token.name;
                session.user?.email = token.email;
                session.user?.username = token.username;
                session.user?.image = token?.picture;
            }

            return session;
        },
        async jwt({token, user}){
            const dbUser = await db.user.findFirst({
                where: {
                    email: token.email
                },
            })

            if(!dbUser){
                token.id = user!.id
                return token
            }

            if
        }
    },


};