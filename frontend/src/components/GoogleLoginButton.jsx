import React from 'react';

const GoogleLoginButton = () => {
  const handleLogin = () => {
    // Redirect to your backend's Google authentication route
    window.location.href = 'http://localhost:3000/auth/google';
  };

  return (
    <button onClick={handleLogin}>
      Login with Google
    </button>
  );
};

export default GoogleLoginButton;
