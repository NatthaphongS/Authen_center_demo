import axiosInstance from '@/lib/axios';
import { NextRequest, NextResponse } from 'next/server';

async function sendEndSessionEndpointToURL(refreshToken: string) {
  const endSessionEndPoint = `${process.env.KEYCLOAK_BASE_URL}/realms/${process.env.KEYCLOAK_REALM_NAME}/protocol/openid-connect/logout`;
  const endSessionParams = new URLSearchParams({
    client_id: process.env.KEYCLOAK_CLIENT_ID,
    client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
    refresh_token: refreshToken,
  });

  try {
    const response = await axiosInstance.post(
      endSessionEndPoint,
      endSessionParams,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    if (response.status === 204) {
      return new NextResponse(null, { status: 204 }); // No content on successful logout
    } else {
      return NextResponse.json(
        { error: 'Logout failed' },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error('Error during Keycloak logout:', error);
    return NextResponse.json(
      { error: 'Failed to communicate with Keycloak' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const refreshToken = data.refreshToken;

    if (refreshToken) {
      return sendEndSessionEndpointToURL(refreshToken);
    }

    return NextResponse.json(
      { error: 'No refresh token provided' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Unable to process logout request' },
      { status: 500 }
    );
  }
}
