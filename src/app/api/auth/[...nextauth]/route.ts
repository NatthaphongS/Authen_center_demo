import { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialProvider from 'next-auth/providers/credentials';
import axiosInstance from '@/lib/axios';

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    CredentialProvider({
      name: 'Credentials',
      credentials: {
        loginType: { label: 'Login type', type: 'text' },
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        try {
          const tokens = { id: '1', access_Token: 'aaa', refresh_token: 'rrr' };
          return tokens;
        } catch (error) {
          console.error('Error:', error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/',
    error: '/',
  },
  session: { strategy: 'jwt' },
  callbacks: {
    // jwt call before session
    async jwt({ token, user, account, profile }) {
      if (account && user) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.user = user;
      }

      // For returning user sessions, ensure you keep the data
      return token;
    },
    async session({ session, token }) {
      // Attach the token data to the session object
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.user = token.user || {};

      return session;
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
