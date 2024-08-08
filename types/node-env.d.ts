declare namespace NodeJS {
  export interface ProcessEnv {
    KEYCLOAK_CLIENT_ID: string;
    KEYCLOAK_CLIENT_SECRET: string;
    KEYCLOAK_ISSUER: string;
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    NEXT_PUBLIC_NEXTAUTH_URL: string;
    NEXT_PUBLIC_KEYCLOAK_URL: string;
    NEXT_PUBLIC_KEYCLOAK_REALM: string;
    NEXT_PUBLIC_KEYCLOAK_CLIENTID: string;
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
  }
}
