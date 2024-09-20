'use client';
import LogoutButton from '@/components/LogoutButton';
import { ConfigProvider, Layout, Typography, Spin } from 'antd';
import { Session } from 'inspector';
import { useSession, getSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

export default function Page() {
  const [isSessionReady, setSessionReady] = useState(false);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    async function checkSession() {
      const sessionData = await getSession(); // Manually fetch session
      setSession(sessionData);
      setSessionReady(!!sessionData);
    }

    checkSession();
  }, []);

  console.log('STATUS', status);
  console.log('SESSION', session);

  if (!isSessionReady) {
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
            <div className="text-[1.5rem] text-center">Loading session...</div>
            <Spin />
          </div>
        </Layout>
      </ConfigProvider>
    );
  }

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
            Welcome {session?.user?.name || 'Guest'}
          </div>

          <div>
            Session data
            <Typography>
              <pre>{JSON.stringify(session, null, 2)}</pre>
            </Typography>
          </div>

          <LogoutButton />
        </div>
      </Layout>
    </ConfigProvider>
  );
}
