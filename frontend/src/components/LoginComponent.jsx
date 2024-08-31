import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Container, Flex, Select, TextInput } from '@mantine/core'

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
    <Flex justify='center' align='center' direction='column'>
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
          mt={10}
          label="Password" placeholder="**********" />
      <Button
        onClick={submitForm} mt={20}
        >
          Sign In
        </Button>
      </Flex>   
  )
}

export default LoginComponent
