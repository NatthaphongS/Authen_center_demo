import { Button } from 'antd';
import { signIn } from 'next-auth/react';
import React from 'react';
import { FacebookOutlined, GoogleOutlined } from '@ant-design/icons';

function LoginWithProvider() {
  return (
    <>
      <Button
        onClick={() => signIn('google')}
        className="bg-red-500"
        type="text"
      >
        <GoogleOutlined />
        Signin with Google
      </Button>
      <Button
        onClick={() => signIn('facebook')}
        className="bg-blue-500"
        type="text"
      >
        <FacebookOutlined />
        Signin with Facebook
      </Button>
      <Button
        onClick={() => signIn('line')}
        className="bg-green-500 "
        type="text"
      >
        Signin with Line
      </Button>
      <Button
        className="bg-gray-800 text-white"
        type="text"
        onClick={() => signIn('keycloak')}
      >
        Signin with keycloak
      </Button>
    </>
  );
}

export default LoginWithProvider;
