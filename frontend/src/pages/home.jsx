import React from 'react'
import { Button, Container, Progress, Slider } from '@mantine/core';


const Home = () => {
  return (
    <Container size={'xl'}>
      <div>home</div>
      <Progress value={50} my={10}/>

      <Button
        fullWidth
      />
      <Slider
        color="blue"
        marks={[
          { value: 20, label: '20%' },
          { value: 50, label: '50%' },
          { value: 80, label: '80%' },
        ]}
      />
    
    </Container>
  )
}

export default Home