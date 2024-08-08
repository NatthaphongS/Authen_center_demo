'use client';
import { Button, ConfigProvider, Layout, Typography } from 'antd';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';

export default function Page() {
  const { data: session, status } = useSession();
  console.log(session);
  const getKeycloakToken = () => {};
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00af43',
          fontSize: 16,
        },
      }}
    >
      <Layout className="bg-white p-[1rem] w-screen flex items-center justify-center">
        <div className="w-[80%] flex flex-col gap-5 max-h-min bg-neutral-200 rounded-lg p-5">
          <div className="text-[1.5rem] text-center">Demo 1</div>
          <div className="text-[2rem] text-center">
            Welcome {session?.user?.name}
          </div>

          <div>
            Session data
            <Typography>
              <pre>{JSON.stringify(session, null, 2)}</pre>
            </Typography>
          </div>
          <Button
            className="bg-[#00af43]"
            type="primary"
            onClick={() => {
              getKeycloakToken();
            }}
          >
            Get Keycloak Token
          </Button>
          <Button
            type="default"
            onClick={() => {
              signOut();
            }}
          >
            Logout
          </Button>
        </div>
      </Layout>
    </ConfigProvider>
  );
}
