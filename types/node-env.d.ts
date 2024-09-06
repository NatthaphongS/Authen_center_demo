declare namespace NodeJS {
  export interface ProcessEnv {
    KEYCLOAK_BASE_URL: string;
    KEYCLOAK_REALM_NAME: string;
    KEYCLOAK_CLIENT_ID: string;
    KEYCLOAK_CLIENT_SECRET: string;
    KEYCLOAK_ADMIN_CLI_CLIENT_SECRET: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    NEXT_PUBLIC_NEXTAUTH_URL: string;
  }
}
