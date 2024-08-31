import { Box, Avatar, Text, Flex } from "@mantine/core";
import { Link } from "react-router-dom"; 

const Navbar = () => {
  return (
    <Flex justify="flex-end" align="center" p={10}>
      <Link to="/user">
        <Avatar src="avatar.png" style={{ cursor: "pointer" }} />
      </Link>
    </Flex>
  );
};

export default Navbar;
