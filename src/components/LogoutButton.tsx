import { Button } from 'antd';
import axios from 'axios';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';

export default function LogoutButton() {
  const { data: session } = useSession();

  const logoutHandle = async () => {
    if (!session) {
      console.error('No session found');
      return;
    }

    try {
      // const response = await axios.post(
      //   `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/auth/federated-logout`,
      //   { refreshToken: session.user.keycloakTokens?.refresh_token } // Safely access refresh_token
      // );
      // console.log(response);
      // if (response.status === 204) {
      //   signOut();
      // } else {
      //   console.error('Failed to log out:', response.data);
      // }
      signOut();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Button type="default" onClick={logoutHandle}>
      Logout
    </Button>
  );
}
