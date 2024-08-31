import React from 'react';
import { Progress, Text } from '@mantine/core';

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
  // Calculate values for each stat
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

  return (
    <div className='h-screen w-screen'>
      <div className="max-w-xl mx-4 p-4 bg-white rounded-lg shadow-md">
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
  );
}

export default Home;
