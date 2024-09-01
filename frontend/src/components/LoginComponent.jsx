import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Space,
  Text,
  Center,
  Divider,
  Group,
  Image,
  useMantineTheme,
} from '@mantine/core';
import { IconBrandGoogle, IconBrandFacebook } from '@tabler/icons-react'; // Import IconBrandGoogle for the Google button icon

const LoginComponent = () => {
  const theme = useMantineTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');

  const submitForm = () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    // Logic for form submission
    console.log('Form submitted with:', formData);
  };

  const handleGoogleLogin = () => {
    // Redirect to your backend's Google authentication route
    window.location.href = 'http://localhost:3000/auth/google';
  };

  useEffect(() => {
    setFormData({ email, password });
  }, [email, password]);

  return (
    <Container size={420} my={40}>
      <Paper
        shadow="xl"
        p={30}
        radius="lg"
        style={{
          position: 'relative',
          zIndex: 2,
          backgroundColor: theme.white, // Use white background
          borderRadius: 15,
          color: theme.black, // Use black text color
        }}
      >
        <Center>
          <Image
            src="/loginLogo.png"
            alt="Logo"
            style={{ width: '40%' }} // Set width to 40% of the container
            mb="md"
          />
        </Center>
        <Title order={2} align="center" mb="md" style={{ color: theme.black }}>
          Welcome Back
        </Title>

        {error && (
          <Text color="red" size="sm" align="center" mb="sm">
            {error}
          </Text>
        )}

        <TextInput
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          label="Email"
          placeholder="example@gmail.com"
          value={email}
          required
          radius="md"
          size="md"
          variant="filled"
          mb="md"
          styles={{
            input: {
              borderColor: theme.colors.gray[4],
              backgroundColor: theme.colors.gray[0],
              ':focus': { borderColor: theme.colors.gray[6] },
            },
            label: { color: theme.black }, // Label color
          }}
        />

        <PasswordInput
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          placeholder="**********"
          value={password}
          required
          radius="md"
          size="md"
          variant="filled"
          mb="xl"
          styles={{
            input: {
              borderColor: theme.colors.gray[4],
              backgroundColor: theme.colors.gray[0],
              ':focus': { borderColor: theme.colors.gray[6] },
            },
            label: { color: theme.black }, // Label color
          }}
        />

        <Button
          onClick={submitForm}
          fullWidth
          radius="md"
          size="md"
          styles={{
            root: {
              backgroundColor: theme.black,
              color: theme.white,
              ':hover': {
                backgroundColor: theme.colors.gray[7], // Darker gray for hover effect
              },
            },
          }}
        >
          Sign In
        </Button>

        <Divider label="or" labelPosition="center" my="lg" color="gray" />

        <Group position="center" grow>
          {/* Google login button using Mantine's Button component */}
          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            radius="md"
            color="gray"
            styles={{
              root: {
                borderColor: theme.colors.gray[4],
                color: theme.black,
                ':hover': { backgroundColor: theme.colors.gray[0] },
              },
              leftIcon: { marginRight: 8 }, // Proper spacing for icon
            }}
            leftIcon={<IconBrandGoogle size={16} />}
          >
            Google
          </Button>

          <Button
            variant="outline"
            radius="md"
            color="gray"
            styles={{
              root: {
                borderColor: theme.colors.gray[4],
                color: theme.black,
                ':hover': { backgroundColor: theme.colors.gray[0] },
              },
              leftIcon: { marginRight: 8 }, // Proper spacing for icon
            }}
            leftIcon={<IconBrandFacebook size={16} />}
          >
            Facebook
          </Button>
        </Group>

        <Space h="md" />

        <Text align="center" size="sm" color={theme.black}>
          Don't have an account? <a href="/register" style={{ color: theme.colors.gray[7] }}>Sign up</a>
        </Text>
      </Paper>
    </Container>
  );
};

export default LoginComponent;








