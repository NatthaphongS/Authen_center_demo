// src/types/next-auth.d.ts

import NextAuth from 'next-auth';

// Extend the Session type
declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    user?: {
      id?: string | null;
      email?: string | null;
      name?: string | null;
      image?: string | null;
    };
  }
}

// Extend the JWT type
declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    user?: {
      id?: string | null;
      email?: string | null;
      name?: string | null;
      image?: string | null;
    };
  }
}
