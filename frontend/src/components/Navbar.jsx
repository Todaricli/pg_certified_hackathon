import { Box, Avatar, Text, Flex } from "@mantine/core";
import { Link } from "react-router-dom"; 

const Navbar = () => {
  return (
    <Flex justify="space-between" align="center" p={10}>
      <Link to="/home">
        <Text>Home</Text>
      </Link>
      <Link to="/user">
        <Avatar src="avatar.png" style={{ cursor: "pointer" }} />
      </Link>
      
    </Flex>
  );
};

export default Navbar;
