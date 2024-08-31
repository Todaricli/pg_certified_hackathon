import React from 'react';
import { Progress, Text } from '@mantine/core';
import "./Home.css";

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
    <div className="container">
      <div className="text-xl">home</div>
      <div className="home-wrapper">
        <div className="stat-wrapper">
          <Progress value={health} className="progress" />
          <Text size='xs' className="text">Health</Text>
        </div>
        <div className="stat-wrapper">
          <Progress value={strength} className="progress" />
          <Text size='xs' className="text">Strength</Text>
        </div>
        <div className="stat-wrapper">
          <Progress value={dexterity} className="progress" />
          <Text size='xs' className="text">Dexterity</Text>
        </div>
        <div className="stat-wrapper">
          <Progress value={stamina} className="progress" />
          <Text size='xs' className="text">Stamina</Text>
        </div>
        <div className="stat-wrapper">
          <Progress value={happiness} className="progress" />
          <Text size='xs' className="text">Happiness</Text>
        </div>
      </div>
    </div>
  );
}

export default Home;
