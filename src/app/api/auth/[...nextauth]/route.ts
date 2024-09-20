import { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import CredentialProvider from 'next-auth/providers/credentials';
import axiosInstance from '@/lib/axios';

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      async profile(profile, tokens) {
        // exchange token
        console.log('after get google');
        if (!tokens.access_token) {
          throw new Error('Invalid google token');
        }
        try {
          console.log('Google token', tokens);
          return { id: profile.sub, tokens };
        } catch (error) {
          console.error('Login with google failed : ', error);
          throw new Error('Login with google failed');
        }
      },
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
          console.log('credentials', credentials);
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
      console.log('token', token);
      console.log('account', account);
      if (account && user) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.user = user;
      }

      // For returning user sessions, ensure you keep the data
      return token;
    },
    async session({ session, token, user }) {
      console.log('session', session);
      console.log('token', token);
      return { ...session, ...token };
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
