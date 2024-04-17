import React from 'react'
// import PocketBase from 'pocketbase'
import Link from "next/link";
import Image from 'next/image';
import { useState } from 'react';
import { BiLogoGmail } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
// import { useSession,signIn,signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { Box, Flex,Text, Heading, Input, Button, Link as ChakraLink,useToast,Stack,Avatar } from "@chakra-ui/react";

import { Pacifico } from 'next/font/google';
const pacifico = Pacifico({ subsets: ['latin'], weight: '400' });



export default function login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading,setIsLoading]= useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Call your submit function here with email and password
    try {
      const url = 'http://192.168.242.52:8080/api/hospital/loginHospital'; // Adjust the URL for the login endpoint
  
      // Construct the request payload
      const loginData = {
        email: email,
        password: password
      };
  
      // Send POST request to login endpoint
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });
  
      // Parse JSON response
      const responseData = await response.json();
  
      // Check if login was successful
      if (response.ok && responseData.success) {
        // Save email in local storage
        localStorage.setItem('email', email);
        toast({
          title: 'Welcome back '+email,
          status: 'success',
          duration: 3000,
          position: 'top',
          isClosable: true,
        });
        router.push('/');
      } else {
        toast({
          title: 'Please enter correct credentials.',
          status: 'error',
          duration: 3000,
          position: 'top',
          isClosable: true,
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      return false; // Login failed due to error
    }
  };
  
//   const { data:session } = useSession();

  const toast = useToast();

    // if(session && session.user){
    //   // router.push('/feed');
    // }


  return (
    <Flex align="center" justify="center" height="100vh">
         <Box textAlign={'center'} borderColor={'black'} overflow={'auto'} p={'8px'} w={'320px'} h={'400px'} borderWidth={1} borderRadius="md" shadow="lg">
         <Flex gap={'5px'} alignItems={'center'} justifyContent={'center'} w={'full'} h={'70px'}>
            <Avatar size={'sm'} src='logo.png' name='logo' />
            <h1 className={pacifico.className} style={{"fontSize":"23px"}} >
        Chikitsapran
        </h1>
          </Flex>
        <form onSubmit={handleSubmit}>
      <Stack spacing={10}>
        <Input
          variant='outline'
          id='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          variant='outline'
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        { isLoading===true ?
        
        <Button colorScheme='teal' isLoading >Login</Button>
        
        :
        
         <Button colorScheme='teal' type="submit">Login</Button>
        
        }
      </Stack>
    </form>
      <Text margin={'auto'} fontSize={'sm'} display={'inline-block'}>Don't have an account?</Text>
      <Link href={'/signup'} display={'inline-block'} fontSize={'sm'}><Text color='teal' fontWeight={'bold'} margin={'auto'} fontSize={'sm'} display={'inline-block'}>&nbsp;Register</Text></Link>
       
       
        

      </Box>

    </Flex>
  )
}
