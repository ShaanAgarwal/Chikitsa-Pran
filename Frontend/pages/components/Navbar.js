import React from 'react'
import {Box, Button,Icon,useColorMode,Flex,Text} from '@chakra-ui/react'
import { useRouter } from 'next/router';

import { useEffect,useState } from 'react';
import { MdSunny ,MdNightsStay} from "react-icons/md";
import { useToast } from '@chakra-ui/react';
import { Avatar } from '@chakra-ui/react';
import io from 'socket.io-client';
import { Pacifico } from 'next/font/google';
const pacifico = Pacifico({ subsets: ['latin'], weight: '400' })
function Navbar() {
    const { colorMode, toggleColorMode } = useColorMode()
    const router = useRouter();
    const [hw,setHw]=useState(null);

  const toast = useToast()

    const handleLogout = () => {
        // Remove 'email' from localStorage
        localStorage.removeItem('email');
        // Redirect to login page
        router.replace('/login'); 
        toast({
          title: 'Successfully logged out',
          status: 'success',
          duration: 3000,
          position: 'top',
          isClosable: true,
        });
        // Specify the path to your login page
    };
    
  return (
    <div>
        <Box w={'100vw'} display={'flex'}  alignItems={'center'} p={'5px'} pr={'10px'} justifyContent={'right'} h={'50px'} boxShadow={'xl'}>
          <Flex gap={'5px'} alignItems={'center'} h={'full'} mr={'auto'}>
            <Avatar size={'sm'} src='logo.png' name='logo' />
            <h1 className={pacifico.className} style={{"fontSize":"23px"}} >
        Chikitsapran
        </h1>
          </Flex>
          <Text>{hw}</Text>
        <Button onClick={handleLogout} size={'sm'} mr={'10px'} colorScheme={'teal'} variant={'solid'}>Logout</Button>
        </Box>
    </div>
  )
}

export default Navbar