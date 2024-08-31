import { Box, Flex, Title, Text } from "@mantine/core";
import { useState } from "react";

function User() {
  const [userData, setUserData] = useState({
    name: "Grace",
  });

  return (
    <Flex p={20}>
      <Flex justify='flex-start' align='flex-start' direction='column'>
        <Title>Hi, {userData.name}</Title>
        <Text>Monday, 24th August 2024</Text>
      </Flex>
    </Flex>
  );
}

export default User;
