import NextAuth from 'next-auth/next';

declare module 'next-auth' {
  interface Session {
    user: {
      /** The user's postal address. */
      id: string;
      keycloakToken: {
        access_token: string;
        expires_in: number;
        refresh_expires_in: number;
        refresh_token: string;
      };
    } & DefaultSession['user'];
  }
}
