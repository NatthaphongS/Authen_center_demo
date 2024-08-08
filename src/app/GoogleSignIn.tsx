// pages/auth/google.js
import { Button } from 'antd';
import { signIn } from 'next-auth/react';
import { useEffect } from 'react';

const GoogleSignIn = () => {
  //   useEffect(() => {
  //     const loadGoogleScript = () => {
  //       return new Promise((resolve) => {
  //         const script = document.createElement('script');
  //         script.src = 'https://apis.google.com/js/platform.js';
  //         script.async = true;
  //         script.defer = true;
  //         script.onload = resolve;
  //         document.body.appendChild(script);
  //       });
  //     };

  //     const initGoogleSignIn = () => {
  //       if (window.gapi) {
  //         window.gapi.load('auth2', () => {
  //           const auth2 = window.gapi.auth2.init({
  //             client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  //           });
  //           auth2.attachClickHandler(
  //             document.getElementById('googleSignInBtn'),
  //             {},
  //             onSuccess,
  //             onFailure
  //           );
  //         });
  //       }
  //     };

  //     loadGoogleScript().then(initGoogleSignIn);
  //   }, []);

  //   const onSuccess = (googleUser: any) => {
  //     const id_token = googleUser.getAuthResponse().id_token;

  //     // Send the ID token to your backend for verification
  //     fetch('/api/auth/google', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ token: id_token }),
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         // Handle response from your backend
  //         console.log(data);
  //       });
  //   };

  //   const onFailure = (error: any) => {
  //     console.error(error);
  //   };

  //   return (
  //     <Button id="googleSignInBtn" className="bg-red-500" type="text">
  //       Signin with Google
  //     </Button>
  //   );
  return (
    <Button onClick={() => signIn('google')} className="bg-red-500" type="text">
      Signin with Google
    </Button>
  );
};

export default GoogleSignIn;
