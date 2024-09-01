import { Box, Avatar, Text, Flex } from "@mantine/core";
import { Link } from "react-router-dom"; 
import GoogleTranslate from '../components/GoogleTranslate';
import { FaRegMap } from "react-icons/fa6";
import { mantine_rem as rem } from 'foxact/rem';

// PR

const Navbar = () => {
  return (
    <Flex justify="space-between" align="center" p={10}>
    <GoogleTranslate />
    <Link to="/map">
        <FaRegMap style={{ cursor: "pointer", width: rem(21), height: rem(21)}} />
      </Link>
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
