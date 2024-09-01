import { Button, Container } from '@mantine/core'
import React from 'react';
import GoogleLoginButton from '../components/GoogleLoginButton';
import LoginComponent from "../components/LoginComponent"

function Login() {
  return (
    <>
      <LoginComponent />
      <div className="App">
      <GoogleLoginButton />
    </div>
    </>
    
  )
}

export default Login;
