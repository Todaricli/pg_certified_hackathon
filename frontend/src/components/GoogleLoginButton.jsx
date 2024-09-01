import React from 'react';
import { Progress, Text, Modal, Button, Select } from '@mantine/core';

const GoogleLoginButton = () => {
  const handleLogin = () => {
    // Redirect to your backend's Google authentication route
    window.location.href = 'http://localhost:3000/auth/google';
  };

  return (
    <div onClick={handleLogin} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: "10px", marginBottom: "10px"}}>
              <Button className="shadow-md" onClick={open} variant="filled" color="#ffd53d" radius="lg">Login with Google
              </Button></div>
  );
};

export default GoogleLoginButton;
