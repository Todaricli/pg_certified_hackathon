import React, { useState } from 'react';
import { Progress, Text, Modal, Button, Select } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { mantine_rem as rem } from 'foxact/rem';
import { BsLightningCharge } from "react-icons/bs";
import PetHouse from '../PetHouse';
import ActivityModal from './ActivityModal';

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
      "percentage": 10,
      "trend": "increasing"
    },
    "streak": {
      "running_days": 5,
      "activity": "running"
    }
  }
};


const Home = () => {
  // Calculate values for each stat
  const calculateHealth = (sleepHours, stressLevel) => {
    const sleepScore = (sleepHours / 8) * 100;
    const stressScore = 100 - stressLevel;
    return (sleepScore * 0.5) + (stressScore * 0.5);
  };

  //40-60

  const calculateStrength = (muscleMassPercentage) => {
    return muscleMassPercentage;
  };

  //jacked is 15% or less, fat is 30% or more


  const calculateDexterity = (steps, goal) => {
    console.log("skeet")
    return (steps / goal) * 100;
  };

  // > 100 = fit 

  const calculateStamina = (restingHeartRate) => {
    const maxHeartRate = 100; // You can adjust this value based on your requirements
    return 100 - ((restingHeartRate - 60) / (maxHeartRate - 60)) * 100;
  };

  const calculateHappiness = (streakDays) => {
    const maxStreak = 10; // You can adjust this value based on your requirements
    return (streakDays / maxStreak) * 100;
  };

  const health = calculateHealth(userData.health_data.sleep.hours, userData.health_data.stress.level);
  const strength = calculateStrength(userData.health_data.muscle_mass.percentage);
  const dexterity = calculateDexterity(userData.health_data.steps.count, userData.health_data.steps.goal);
  const stamina = calculateStamina(userData.health_data.heart_rate.resting);
  const happiness = calculateHappiness(userData.health_data.streak.running_days);

  const petStat = {
    "health": health,
    "strength": strength,
    "dexterity": dexterity,
    "stamina": stamina,
    "happiness": happiness
  }
  const [opened, { open, close }] = useDisclosure(false);
  const [dropdownOpened, setDropdownOpened] = useState(false);

  const [activityActive, setActivityActive] = useState();
  const [activityState, setActivityState] = useState(false)

  return (
    <>

      <PetHouse petStat={petStat} activityActive = {activityActive} activityState = {activityState} setActivityState = {setActivityState} />

      <div className='h-screen w-screen'>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: "10px", marginBottom: "10px" }}>
        {activityState
                ? 
                <Button 
                className='m-auto'   
                onClick={() => {
                    setActivityState(false)
                    console.log("safs")
                }}>
                    Stop
                </Button>
                :
                <Button className="shadow-md" onClick={open} variant="filled" color="#ffd53d" radius="lg">Play</Button>
                }
        </div>
        <div className="max-w-xl mx-4 p-4 bg-white rounded-lg shadow-md">

          <ActivityModal opened={opened} close={close} dropdownOpened={dropdownOpened} setDropdownOpened={setDropdownOpened} setActivityActive={setActivityActive} setActivityState= {setActivityState}/>

          <div className="text-xl font-bold text-center mb-4">Home</div>
          <div className="flex flex-col items-center space-y-4">
            <div className="w-full">
              <Progress value={health} className="my-2" />
              <Text size='xs' className="block text-center text-gray-600">Health</Text>
            </div>
            <div className="w-full">
              <Progress value={strength} className="my-2" />
              <Text size='xs' className="block text-center text-gray-600">Strength</Text>
            </div>
            <div className="w-full">
              <Progress value={dexterity} className="my-2" />
              <Text size='xs' className="block text-center text-gray-600">Dexterity</Text>
            </div>
            <div className="w-full">
              <Progress value={stamina} className="my-2" />
              <Text size='xs' className="block text-center text-gray-600">Stamina</Text>
            </div>
            <div className="w-full">
              <Progress value={happiness} className="my-2" />
              <Text size='xs' className="block text-center text-gray-600">Happiness</Text>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default Home;
