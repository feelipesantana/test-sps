import { api } from '@/services/api'

import NextAuth, { NextAuthOptions } from 'next-auth'
import { cookies } from 'next/headers'

import CredentialsProvider from 'next-auth/providers/credentials'


const nextAuthOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' }
            },

            async authorize(credentials, req) {
                const response = await api.post('/auth', {
                    email: credentials?.email,
                    password: credentials?.password
                });
                const user = await response.data

                if (user) {

                    return user
                }
                return null
            }
        })

    ],
    pages: {
        signIn: '/'
    },
    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        async jwt({ token, user }) {
            user && (token.user = user)
            return token
        },
        async session({ session, token }) {
            session = token.user as any
            return session
        },
        async signIn({ account, user, credentials, }) {
            if (account?.provider === 'credentials') {
                if (user) {

                    cookies().set('user_token', user.token)

                }
            }
            return true
        }
    },


}
const handler = NextAuth(nextAuthOptions)
export { handler as GET, handler as POST, nextAuthOptions }