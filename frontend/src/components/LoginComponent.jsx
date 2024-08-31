import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Container, Select, TextInput } from '@mantine/core'

const LoginComponent = () => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [formData, setFormData] = useState();

  const submitForm = () =>{
      //
  }

  useEffect(() => {
    setFormData({
      "email ": email,
      "formData": formData
    })
  }, [email, password])

  return (
    <>
      <Container >
        <TextInput
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          name='email'
          label="Email" placeholder="example@gmail.com" />

        <TextInput
            onChange={(e) => {
            setPassword(e.target.value)
          }}
          label="Password" placeholder="**********" />
      </Container>

      <Container>
        <Button
        onClick={submitForm}
        >
          Sign In
        </Button>
      </Container>
    </>
  )
}

export default LoginComponent
