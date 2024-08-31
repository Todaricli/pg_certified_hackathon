import {
  Box,
  Flex,
  Title,
  Text,
  useMantineTheme,
  Progress,
} from "@mantine/core";
import { useState } from "react";
import styles from "../styles/User.module.css";
import { IconScale } from "@tabler/icons-react";
import { IconFlame } from "@tabler/icons-react";
import { IconWalk } from "@tabler/icons-react";
import { IconHeartbeat } from "@tabler/icons-react";
import MiniCalendar from "../components/MiniCalendar";

function getProgressColor(value, theme) {
  switch (true) {
    case value < 30:
      return theme.colors.customRed[0];
    case value < 70:
      return theme.colors.customYellow[0];
    case value < 100:
      return theme.colors.customNavy[0];
    default:
      return theme.colors.customYellow[0];
  }
}

function User() {
  const [userData, setUserData] = useState({
    name: "Grace",
    weight: 125,
    calories: 1000,
    caloriesGoal: 5000,
    steps: 3200,
    stepsGoal: 5000,
    heartRate: 88,
    sleep: 6,
    sleepGoal: 8,
  });
  const theme = useMantineTheme();

  const caloriesBurn = (userData.calories / userData.caloriesGoal) * 100;
  const caloriesColor = getProgressColor(caloriesBurn, theme);

  const stepsCount = (userData.steps / userData.stepsGoal) * 100;
  const stepsColor = getProgressColor(stepsCount, theme);

  const sleep = (userData.sleep / userData.sleepGoal) * 100;
  const sleepColor = getProgressColor(sleep, theme);

  return (
    <Flex p={20} direction="column">
      <Flex justify="flex-start" align="flex-start" direction="column">
        <Title style={{ color: theme.colors.customNavy[0] }}>
          Hi, {userData.name}
        </Title>
        <Text style={{ color: theme.colors.customNavy[0] }}>
          Monday, 24th August 2024
        </Text>
      </Flex>
      <Box
        style={{
          backgroundColor: theme.colors.customWhite[0],
          borderRadius: "20px",
        }}
        shadow="lg"
        mt={20}
        p={20}
      >
        <Flex justify="space-between" align="center">
          <Flex direction="column" justify="center">
            <Title order={4}>Current</Title>
            <Text>{userData.weight} kg</Text>
          </Flex>
          <IconScale
            stroke={2}
            style={{
              width: "40px",
              height: "40px",
            }}
          />
          <Flex direction="column" justify="center">
            <Title order={4}>Target</Title>
            <Text>92 kg</Text>
          </Flex>
        </Flex>
      </Box>

      {/* Calories burn */}
      <Box
        style={{
          backgroundColor: theme.colors.customWhite[0],
          borderRadius: "20px",
        }}
        shadow="lg"
        mt={20}
        p={20}
      >
        <Flex direction>
          <Box
            style={{
              backgroundColor: theme.colors.customYellow[0],
              borderRadius: "20px",
              width: "fit-content",
            }}
            p={10}
            mr={20}
          >
            <IconFlame
              stroke={2}
              style={{
                width: "40px",
                height: "34px",
                color: theme.colors.customNavy[0],
              }}
            />
          </Box>
          <Flex direction="column" justify="center" w="100%">
            <Text fw={700} mb={10}>
              Calories burn
            </Text>
            <Progress value={caloriesBurn} color={caloriesColor} size="sm" />
            <Flex justify="space-between" mt={5}>
              <Text size="xs">{userData.calories} kcal</Text>
              <Text size="xs">Goal {userData.caloriesGoal}</Text>
            </Flex>
          </Flex>
        </Flex>
        <Text mt={20}>
          Oh no, Let's do some exercise to burn more calories today🤩
        </Text>
      </Box>

      {/* Step Counts */}
      <Box
        style={{
          backgroundColor: theme.colors.customWhite[0],
          borderRadius: "20px",
        }}
        shadow="lg"
        mt={20}
        p={20}
      >
        <Flex direction>
          <Box
            style={{
              backgroundColor: theme.colors.customYellow[0],
              borderRadius: "20px",
              width: "fit-content",
            }}
            p={10}
            mr={20}
          >
            <IconWalk
              stroke={2}
              style={{
                width: "40px",
                height: "34px",
                color: theme.colors.customNavy[0],
              }}
            />
          </Box>
          <Flex direction="column" justify="center" w="100%">
            <Text fw={700} mb={10}>
              Steps Count
            </Text>
            <Progress value={stepsCount} color={stepsColor} size="sm" />
            <Flex justify="space-between" mt={5}>
              <Text size="xs">{userData.steps} steps</Text>
              <Text size="xs">Goal {userData.stepsGoal}</Text>
            </Flex>
          </Flex>
        </Flex>
        <Text mt={20}>
          You almost there, keep walking to reach your goal for today👌
        </Text>
      </Box>

      {/* Heart rate + Sleep hour */}
      <Flex align="center" h={150} mt={13}>
        <Box
          style={{
            backgroundColor: theme.colors.customWhite[0],
            borderRadius: "20px",
          }}
          shadow="lg"
          mt={20}
          p={15}
          mr={30}
          w={160}
          h="100%"
        >
          <Flex justify="space-between" mb={35}>
            <Text fw={700}>Heart rate</Text>
            <IconHeartbeat
              stroke={2}
              style={{
                color: theme.colors.customRed[0],
              }}
            />
          </Flex>
          <Flex>
            <Title order={1}>{userData.heartRate}</Title>
            <Text>BPM</Text>
          </Flex>
        </Box>
        <Box
          style={{
            backgroundColor: theme.colors.customWhite[0],
            borderRadius: "20px",
          }}
          shadow="lg"
          mt={20}
          p={15}
          w="100%"
          h="100%"
        >
          <Text fw={700} mb={10}>
            Sleep Last Night
          </Text>
          <Progress value={sleep} color={sleepColor} size="sm" />
          <Flex justify="space-between" align="center" mt={5}>
            <Text size="xs">
              {userData.sleep} {userData.sleep <= 1 ? "hour" : "hours"}
            </Text>
            <Text size="xs">
              {userData.sleepGoal} {userData.sleep <= 1 ? "hour" : "hours"}
            </Text>
          </Flex>
          <Text mt={20}>Oh no, You should sleep more next time😴</Text>
        </Box>
      </Flex>

      {/* Calendar */}
      <Flex
        style={{
          backgroundColor: theme.colors.customWhite[0],
          borderRadius: "20px",
        }}
        shadow="lg"
        mt={30}
        p={15}
        direction="column"
      >
        <Text fw={700} mb={10}>Monthly Fitness Tracking</Text>
        <Flex justify="center" align="center">
          <MiniCalendar />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default User;
