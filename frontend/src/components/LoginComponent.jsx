import React, { useState } from 'react';
import { Button, Flex, TextInput } from '@mantine/core';
import { useUser } from '../providers/UserProvider';
import { useNavigate } from 'react-router-dom';

// Hardcoded users for the login simulation
const users = [
  { email: 'user1', password: '123' },
  { email: 'user2', password: '123' },
  { email: 'user3', password: '123' }
];

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setCurrentUser } = useUser(); // Access the context
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const submitForm = () => {
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      setCurrentUser(user); // Set the current user in context
      alert('Login successful');
      navigate('/home'); // Redirect to /home
    } else {
      alert('Wrong credentials');
    }
  };

  return (
    <Flex justify='center' align='center' direction='column'>
      <TextInput
        onChange={(e) => setEmail(e.target.value)}
        name='email'
        label="Email"
        placeholder="example@gmail.com"
        value={email}
      />

      <TextInput
        onChange={(e) => setPassword(e.target.value)}
        mt={10}
        label="Password"
        placeholder="**********"
        value={password}
        type="password"
      />

      <Button onClick={submitForm} mt={20}>
        Sign In
      </Button>
    </Flex>
  );
};

export default LoginComponent;
