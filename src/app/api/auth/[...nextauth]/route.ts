import { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import KeycloakProvider from 'next-auth/providers/keycloak';
import GoogleProvider from 'next-auth/providers/google';
import CredentialProvider from 'next-auth/providers/credentials';
import axios from 'axios';
export const authOptions: AuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
      issuer: process.env.KEYCLOAK_ISSUER,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialProvider({
      name: 'CredentialsToKeycloak',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        try {
          if (!credentials) {
            throw new Error('Invalid credential');
          }
          const params = new URLSearchParams();
          params.append('grant_type', 'password');
          params.append('client_id', 'demo_1');
          params.append('client_secret', 'B6EQ3a3Z9KwPjxyZhBOFCkcmycVVm1QL');
          params.append('username', credentials.username);
          params.append('password', credentials.password);

          const response = await axios.post(
            'http://localhost:8080/realms/demo/protocol/openid-connect/token',
            params,
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            }
          );
          if (response.status === 200) {
            const user = response.data;
            return user;
          } else {
            throw new Error('keycloakError');
          }
        } catch (error) {
          console.error('Error:', error);
          return null;
        }
      },
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    // jwt call before session
    async jwt({ token, user, account, profile }) {
      console.log('token : ', token);
      console.log('user : ', user);
      console.log('account : ', account);
      console.log('profile : ', profile);
      if (user) {
        token.id = user.id; // Add user ID to the token
      }
      if (user) {
        token = { ...token, user };
      }
      if (account) {
        token = { ...token, account };
      }
      if (profile) {
        token = { ...token, profile };
      }
      return token;
    },
    async session({ session, token, user }) {
      if (session.user) {
        session.user = token; // Add user ID to the session
      }
      return session;
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
