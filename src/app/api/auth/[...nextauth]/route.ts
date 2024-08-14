import { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import KeycloakProvider from 'next-auth/providers/keycloak';
import GoogleProvider from 'next-auth/providers/google';
import CredentialProvider from 'next-auth/providers/credentials';
import axios from 'axios';

// resource for get token
const keycloakTokenBaseUrl = `${process.env.KEYCLOAK_BASE_URL}/realms/${process.env.KEYCLOAK_REALM_NAME}/protocol/openid-connect/token`;

// resource for get token data
const keycloakTokenDataBaseUrl = `${process.env.KEYCLOAK_BASE_URL}/realms/${process.env.KEYCLOAK_REALM_NAME}/protocol/openid-connect/token/introspect`;
const keycloakUserInfoEndpoint = `${process.env.KEYCLOAK_BASE_URL}/realms/${process.env.KEYCLOAK_REALM_NAME}/protocol/openid-connect/userinfo`;
async function exchangeToKeycloakTokens({
  provider,
  externalAccessToken,
}: {
  provider: string;
  externalAccessToken: string;
}) {
  try {
    const reqTokenParams = new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
      client_id: process.env.KEYCLOAK_CLIENT_ID,
      client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
      subject_issuer: provider,
      subject_token: externalAccessToken,
      scope: 'openid',
    });
    const keycloakTokenResponse = await axios.post(
      keycloakTokenBaseUrl,
      reqTokenParams,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return keycloakTokenResponse.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getTokenInfo(keycloakAccessToken: string) {
  try {
    const reqTokenDataParams = new URLSearchParams({
      client_id: process.env.KEYCLOAK_CLIENT_ID,
      client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
      token: keycloakAccessToken,
    });
    const keycloakTokenDataResponse = await axios.post(
      keycloakTokenDataBaseUrl,
      reqTokenDataParams,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return keycloakTokenDataResponse.data;
  } catch (error) {
    throw error;
  }
}

async function getUserInfo(accessToken: string) {
  try {
    const userInfoResponse = await axios.get(keycloakUserInfoEndpoint, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return userInfoResponse.data;
  } catch (error) {
    throw error;
  }
}

async function requestRefreshOfAccessToken(refreshToken: string) {
  try {
    const { data: newKeycloakTokens } = await axios.post(
      keycloakTokenBaseUrl,
      new URLSearchParams({
        client_id: process.env.KEYCLOAK_CLIENT_ID,
        client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        scope: 'openid',
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    return newKeycloakTokens;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const authOptions: AuthOptions = {
  providers: [
    // (use for keycloak login flow)
    // KeycloakProvider({
    //   clientId: process.env.KEYCLOAK_CLIENT_ID,
    //   clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
    //   issuer: process.env.KEYCLOAK_ISSUER,
    // }),
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
          const keycloakTokens = await exchangeToKeycloakTokens({
            provider: 'google',
            externalAccessToken: tokens.access_token,
          });
          if (!keycloakTokens.access_token) {
            throw new Error('Exchange token error');
          }
          const keycloakUserInfo = await getUserInfo(
            keycloakTokens.access_token
          );
          const userId = keycloakUserInfo.sub;
          delete keycloakUserInfo.sub;
          return {
            id: userId,
            ...keycloakUserInfo,
            keycloakTokens,
          };
        } catch (error) {
          console.error('Keycloak token exchange failed:', error);
          throw new Error('Keycloak token exchange failed');
        }
      },
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
          const params = new URLSearchParams({
            grant_type: 'password',
            client_id: process.env.KEYCLOAK_CLIENT_ID,
            client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
            scope: 'openid',
            username: credentials.username,
            password: credentials.password,
          });
          const { data: keycloakTokens } = await axios.post(
            keycloakTokenBaseUrl,
            params,
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            }
          );
          if (!keycloakTokens.access_token) {
            throw new Error('Authentication Error');
          }
          const keycloakUserInfo = await getUserInfo(
            keycloakTokens.access_token
          );
          const userId = keycloakUserInfo.sub;
          delete keycloakUserInfo.sub;
          return {
            id: userId,
            ...keycloakUserInfo,
            keycloakTokens,
          };
        } catch (error) {
          console.error('Error:', error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/', // Custom sign-in page
    error: '/', // Custom error page
  },
  session: { strategy: 'jwt' },
  callbacks: {
    // jwt call before session
    async jwt({ token, user, account, profile }) {
      if (user) {
        token = { ...user };
      }
      return token;
    },
    async session({ session, token, user }) {
      if (session.user) {
        session.user = token;
      }
      return session;
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
