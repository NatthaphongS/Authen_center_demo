'use client';
import { Button, ConfigProvider, Layout } from 'antd';
import { useRouter } from 'next/navigation';
import LoginForm from './LoginForm';
import LoginWithProvider from './LoginWithProvider';

export default function Page() {
  const router = useRouter();

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00af43',
          fontSize: 16,
        },
      }}
    >
      <Layout className="bg-white p-[1rem] w-screen h-screen flex items-center justify-center">
        <div className="w-[20rem] flex flex-col gap-5 max-h-min bg-neutral-200 rounded-lg p-5">
          <div className="text-[2rem] text-center">Demo keycloak 1</div>
          <div className="flex flex-col gap-2 justify-center">
            <LoginForm />
            <Button
              type="link"
              className="text-black hover:underline decoration-solid"
              size="small"
              onClick={() => {
                router.push('/register');
              }}
            >
              Register
            </Button>
          </div>
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-400">or</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <LoginWithProvider />
        </div>
      </Layout>
    </ConfigProvider>
  );
}
