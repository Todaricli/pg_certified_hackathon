import React, { useState } from 'react';
import { Chart } from 'react-google-charts';
import { Progress, Text, Modal, Button, Select } from '@mantine/core';
import heartIcon from '../../assets/heart.svg';
import dumbbellIcon from '../../assets/dumbbell.svg';
import runIcon from '../../assets/run.svg';
import happyIcon from '../../assets/happy-face.svg';
import breathIcon from '../../assets/breath.svg';
import GoogleTranslate from '../../components/GoogleTranslate';
import GoogleTimeZone from '../../components/GoogleTimeZone';
import NearbyRecommendations from '../../components/NearbyRecommendations';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { mantine_rem as rem } from 'foxact/rem';
import { BsLightningCharge } from "react-icons/bs";
import PetHouse from '../PetHouse';
import ActivityModal from './ActivityModal';
import AirQuality from '../../components/AirQuality';

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

  const petStat = {
    "health": health,
    "strength": strength,
    "dexterity": dexterity,
    "stamina": stamina,
    "happiness": happiness
  };

  const [opened, { open, close }] = useDisclosure(false);
  const [dropdownOpened, setDropdownOpened] = useState(false);
  const [activityActive, setActivityActive] = useState();
  const [activityState, setActivityState] = useState(false);

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
    pieHole: 0.4,
    is3D: true,
  };

  return (
    <div className='h-screen w-screen'>
      <PetHouse petStat={petStat} activityActive={activityActive} activityState={activityState} setActivityState={setActivityState} />

      <div className='h-screen w-screen'>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: "10px", marginBottom: "10px" }}>
          
          {activityState
            ?
            (
            <Button
              className='m-auto'
              onClick={() => {
                setActivityState(false)
                console.log("safs")
              }}>
              Stop
            </Button>
          ) : (
            <Button className="shadow-md" onClick={open} variant="filled" color="#ffd53d" radius="lg">
              Play
            </Button>
          )}
        </div>

        <ActivityModal
          opened={opened}
          close={close}
          dropdownOpened={dropdownOpened}
          setDropdownOpened={setDropdownOpened}
          setActivityActive={setActivityActive}
          setActivityState={setActivityState}
        />

        <GoogleTranslate />
        <GoogleTimeZone />
        <NearbyRecommendations />

        <div className='h-screen w-full justify-center'>
          <AirQuality />
          <div className="max-w-xl md:m-auto mx-4 p-4 bg-white rounded-lg shadow-md">
            <div className="flex flex-col items-center space-y-4">
              <div className='flex w-full justify-center items-center'>
                <img src={heartIcon} alt='Heart Icon' className='bg-customYellow p-4 rounded-lg m-[1rem] w-[3.5rem]' />
                <div className="w-full">
                  <Text size='sm' className="block font-bold text-gray-600">Health</Text>
                  <Progress value={health} className="my-2" />
                  <Text size='xs' color='dimmed'>{health.toFixed(1)}% - Based on sleep and stress levels</Text>
                </div>
              </div>

              <div className='flex w-full justify-center items-center'>
                <img src={dumbbellIcon} alt='Strength Icon' className='bg-customYellow p-4 rounded-lg m-[1rem] w-[3.5rem]' />
                <div className="w-full">
                  <Text size='sm' className="block font-bold text-gray-600">Strength</Text>
                  <Progress value={strength} className="my-2" />
                  <Text size='xs' color='dimmed'>{strength.toFixed(1)}% - Muscle mass percentage</Text>
                </div>
              </div>

              <div className='flex w-full justify-center items-center'>
                <img src={runIcon} alt='Dexterity Icon' className='bg-customYellow p-4 rounded-lg m-[1rem] w-[3.5rem]' />
                <div className="w-full">
                  <Text size='sm' className="block font-bold text-gray-600">Dexterity</Text>
                  <Progress value={dexterity} className="my-2" />
                  <Text size='xs' color='dimmed'>{dexterity.toFixed(1)}% - Steps count relative to goal</Text>
                </div>
              </div>

              <div className='flex w-full justify-center items-center'>
                <img src={breathIcon} alt='Stamina Icon' className='bg-customYellow p-4 rounded-lg m-[1rem] w-[3.5rem]' />
                <div className="w-full">
                  <Text size='sm' className="block font-bold text-gray-600">Stamina</Text>
                  <Progress value={stamina} className="my-2" />
                  <Text size='xs' color='dimmed'>{stamina.toFixed(1)}% - Resting heart rate</Text>
                </div>
              </div>

              <div className='flex w-full justify-center items-center'>
                <img src={happyIcon} alt='Happiness Icon' className='bg-customYellow p-4 rounded-lg m-[1rem] w-[3.5rem]' />
                <div className="w-full">
                  <Text size='sm' className="block font-bold text-gray-600">Happiness</Text>
                  <Progress value={happiness} className="my-2" />
                  <Text size='xs' color='dimmed'>{happiness.toFixed(1)}% - Based on activity streak</Text>
                </div>
              </div>
            </div>

            <div className="max-w-xl md:m-auto mx-4 p-4 bg-white rounded-lg shadow-md mt-8">
              <Chart
                chartType="PieChart"
                width="100%"
                height="300px"
                data={data}
                options={options}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
