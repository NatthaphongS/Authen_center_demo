import { Button } from 'antd';
import { signIn } from 'next-auth/react';
import React from 'react';
import GoogleSignIn from './GoogleSignIn';

function LoginWithProvider() {
  return (
    <>
      <GoogleSignIn />
      <Button className="bg-blue-500" type="text" onClick={() => {}}>
        Signin with Facebook
      </Button>
      <Button className="bg-green-500 " type="text" onClick={() => {}}>
        Signin with Line
      </Button>
      <Button
        className="bg-gray-800 text-white"
        type="text"
        onClick={() => signIn('keycloak', { redirect: false })}
      >
        Signin with keycloak
      </Button>
    </>
  );
}

export default LoginWithProvider;
