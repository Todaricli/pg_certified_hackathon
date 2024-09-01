import React, { useState } from 'react';
import { Chart } from 'react-google-charts';
import { Progress, Text, Modal, Button, Select } from '@mantine/core';
import heartIcon from '../../assets/heart.svg';
import dumbbellIcon from '../../assets/dumbbell.svg';
import runIcon from '../../assets/run.svg';
import happyIcon from '../../assets/happy-face.svg';
import breathIcon from '../../assets/breath.svg';
import GoogleTimeZone from '../../components/GoogleTimeZone';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { mantine_rem as rem } from 'foxact/rem';
import { BsLightningCharge } from "react-icons/bs";

const userData = {
  "user_id": "user123",
  "date": "2024-08-31",
  "health_data": {
    "sleep": {
      "hours": 7.5,
      "quality": "good"
    },
    "stress": {
      "level": 20,
      "description": "low"
    },
    "steps": {
      "count": 8500,
      "goal": 10000
    },
    "heart_rate": {
      "resting": 65,
      "average": 75
    },
    "muscle_mass": {
      "percentage": 40,
      "trend": "increasing"
    },
    "streak": {
      "running_days": 5,
      "activity": "running"
    }
  }
};


const Home = () => {
  const calculateHealth = (sleepHours, stressLevel) => {
    const sleepScore = (sleepHours / 8) * 100;
    const stressScore = 100 - stressLevel;
    return (sleepScore * 0.5) + (stressScore * 0.5);
  };

  const calculateStrength = (muscleMassPercentage) => {
    return muscleMassPercentage;
  };

  const calculateDexterity = (steps, goal) => {
    return (steps / goal) * 100;
  };

  const calculateStamina = (restingHeartRate) => {
    const maxHeartRate = 100;
    return 100 - ((restingHeartRate - 60) / (maxHeartRate - 60)) * 100;
  };

  const calculateHappiness = (streakDays) => {
    const maxStreak = 10;
    return (streakDays / maxStreak) * 100;
  };

  const health = calculateHealth(userData.health_data.sleep.hours, userData.health_data.stress.level);
  const strength = calculateStrength(userData.health_data.muscle_mass.percentage);
  const dexterity = calculateDexterity(userData.health_data.steps.count, userData.health_data.steps.goal);
  const stamina = calculateStamina(userData.health_data.heart_rate.resting);
  const happiness = calculateHappiness(userData.health_data.streak.running_days);
  const [opened, {open, close}] = useDisclosure(false);
  const [chartOpened, { open: chartOpen, close: chartClose }] = useDisclosure(false);
  const [dropdownOpened, setDropdownOpened] = useState(false);

  const data = [
    ['Parameter', 'Percentage'],
    ['Health', health],
    ['Strength', strength],
    ['Dexterity', dexterity],
    ['Stamina', stamina],
    ['Happiness', happiness],
  ];

  const options = {
    title: 'User Health Parameters',
    pieHole: 0.4, // Optional: Creates a donut chart instead of a full pie chart
    is3D: false,   // Optional: Creates a 3D pie chart
  };

  return (
    <div className='h-screen w-full justify-center'>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: "10px", marginBottom: "10px"}}>
              <Button className="shadow-md" onClick={open} variant="filled" color="#ffd53d" radius="lg">Play</Button></div>
      {/* <GoogleTimeZone /> */}
      <div className="max-w-xl md:m-auto mx-4 p-4 bg-white rounded-lg shadow-md">
        <Modal 
        opened={opened} onClose={close} withCloseButton={false} size={"auto"} overlayProps={{backgroundOpactiy: 0.55, blur: 3,}} centered yOffset={0} xOffset={0}
        styles={{
          content: {
            width: "100%",
            height: "400px",
            borderRadius: "20px",
            backgroundColor: "#ffd53d",
            maxWidth: "28rem",
            padding: "1rem",
          },
        }}
        >
          <div className="text-lg font-bold text-center mb-2">Please choose an exercise</div>
          <Select 
          placeholder="Select an exercise" 
          styles={{
            dropdown: {
              borderRadius: "10px",
              padding: "10px",
              '&:hover': {
            backgroundColor: '#0000a3',
            '&[data-selected]': {
              backgroundColor: '#0000a3',
            }
          },
            },
            input: {
              height: "45px",
              borderWidth: "2px",
              borderColor: "#b6b9bf",
              color: "000000"
            }
          }}
          leftSection={<BsLightningCharge style={{width: rem(16), height: rem(16),  }}/>} aria-label="Select an exercise" radius="md" data={["Walking", "Running", "Weight Training", "Swimming", "Badminton"]}  rightSection={dropdownOpened ? <IconChevronUp style={{ width: rem(16), height: rem(16) }} /> : <IconChevronDown style={{ width: rem(16), height: rem(16) }} />}
          onDropdownOpen={() => setDropdownOpened(true)}
          onDropdownClose={() => setDropdownOpened(false)}
        />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: "219px"}}>
        <Button onClick={close} variant="gradient" gradient={{from: "#0000a3", to: "#0000a3", deg: 90}} radius="lg" >Start</Button></div>
        </Modal>

        <div className="flex flex-col items-center space-y-4">
          {/* Health */}
          <div className='flex w-full justify-center items-center'>
            <img src={heartIcon} alt='Heart Icon' className='bg-customYellow p-4 rounded-lg m-[1rem] w-[3.5rem]' />
            <div className="w-full">
              <Text size='sm' className="block font-bold text-gray-600">Health</Text>
              <Progress value={health} className="my-2" />
              <Text size='xs' color='dimmed'>{health.toFixed(1)}% - Based on sleep and stress levels</Text>
            </div>
          </div>
          {/* Strength */}
          <div className='flex w-full justify-center items-center'>
            <img src={dumbbellIcon} alt='Strength Icon' className='bg-customYellow p-4 rounded-lg m-[1rem] w-[3.5rem]' />
            <div className="w-full">
              <Text size='sm' className="block font-bold text-gray-600">Strength</Text>
              <Progress value={strength} className="my-2" />
              <Text size='xs' color='dimmed'>{strength.toFixed(1)}% - Muscle mass percentage</Text>
            </div>
          </div>
          {/* Dexterity */}
          <div className='flex w-full justify-center items-center'>
            <img src={runIcon} alt='Dexterity Icon' className='bg-customYellow p-4 rounded-lg m-[1rem] w-[3.5rem]' />
            <div className="w-full">
              <Text size='sm' className="block font-bold text-gray-600">Dexterity</Text>
              <Progress value={dexterity} className="my-2" />
              <Text size='xs' color='dimmed'>{dexterity.toFixed(1)}% - Steps count relative to goal</Text>
            </div>
          </div>
          {/* Stamina */}
          <div className='flex w-full justify-center items-center'>
            <img src={breathIcon} alt='Stamina Icon' className='bg-customYellow p-4 rounded-lg m-[1rem] w-[3.5rem]' />
            <div className="w-full">
              <Text size='sm' className="block font-bold text-gray-600">Stamina</Text>
              <Progress value={stamina} className="my-2" />
              <Text size='xs' color='dimmed'>{stamina.toFixed(1)}% - Resting heart rate</Text>
            </div>
          </div>
          {/* Happiness */}
          <div className='flex w-full justify-center items-center'>
            <img src={happyIcon} alt='Happiness Icon' className='bg-customYellow p-4 rounded-lg m-[1rem] w-[3.5rem]' />
            <div className="w-full">
              <Text size='sm' className="block font-bold text-gray-600">Happiness</Text>
              <Progress value={happiness} className="my-2" />
              <Text size='xs' color='dimmed'>{happiness.toFixed(1)}% - Based on activity streak</Text>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: "10px", marginBottom: "10px"}}>
              <Button className="shadow-md" onClick={chartOpen} variant="filled" color="#ffd53d" radius="lg">Health Overview</Button></div>
      <Modal 
        opened={chartOpened} onClose={chartClose} withCloseButton={true} size={"auto"} overlayProps={{backgroundOpactiy: 0.55, blur: 3,}} centered yOffset={0} xOffset={0}
        styles={{
          content: {
            width: "100%",
            height: "410px",
            borderRadius: "20px",
            backgroundColor: "#ffffff",
            maxWidth: "28rem",
            padding: "1rem",
          },
        }}
        >
      {/* <div className="max-w-xl md:m-auto mx-4 p-4 bg-white rounded-lg shadow-md"> */}
        <Chart
          chartType="PieChart"
          width="100%"
          height="300px"
          data={data}
          options={options}
        />
      {/* </div> */}
      </Modal>
    </div>
  );
}

export default Home;
