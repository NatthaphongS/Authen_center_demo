import axiosInstance from '@/lib/axios';
import { NextRequest, NextResponse } from 'next/server';

const keycloakTokenBaseUrl = `${process.env.KEYCLOAK_BASE_URL}/realms/${process.env.KEYCLOAK_REALM_NAME}/protocol/openid-connect/token`;
const keycloakCreateUserEndpoint = `${process.env.KEYCLOAK_BASE_URL}/admin/realms/${process.env.KEYCLOAK_REALM_NAME}/users`;

async function getAdminAccessToken(): Promise<string> {
  const { data: adminToken } = await axiosInstance.post(
    keycloakTokenBaseUrl,
    {
      grant_type: 'client_credentials',
      client_id: 'admin-cli',
      client_secret: process.env.KEYCLOAK_ADMIN_CLI_CLIENT_SECRET, // If your client requires a secret
    },
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }
  );
  console.log('Admin Token :', adminToken);
  return adminToken.access_token;
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log(data);
    const adminAccessToken = await getAdminAccessToken();
    const createUserKCResponse = await axiosInstance.post(
      keycloakCreateUserEndpoint,
      {
        username: data.phoneNumber,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        enabled: true,
        credentials: [
          {
            type: 'password',
            value: data.password,
            temporary: false,
          },
        ],
        attributes: {
          phoneNumber: data.phoneNumber,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${adminAccessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(createUserKCResponse);
    if (createUserKCResponse.status === 201) {
      return NextResponse.json('Register Success', { status: 201 });
    }
    return NextResponse.json(
      { error: createUserKCResponse.data },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('Unexpected error:', error);
    if (error.response.status === 409) {
      return NextResponse.json({ error: 'Exist phoneNumber' }, { status: 409 });
    }
    return NextResponse.json(
      { error: 'Unable to process register request' },
      { status: 500 }
    );
  }
}
