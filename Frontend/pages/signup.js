import React, { useState } from 'react';
import { Box, Flex, Heading, Input, Avatar, InputGroup, Text, InputLeftElement, InputRightElement, Button, FormControl, FormLabel, FormErrorMessage, IconButton, Image } from "@chakra-ui/react";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Pacifico } from 'next/font/google';
import { backendURL } from '../config/backendURL';

const pacifico = Pacifico({ subsets: ['latin'], weight: '400' });

function Signup() {
  const [name, setName] = useState('');
  const [pfp, setPfp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [x, setX] = useState(null);
  const [y, setY] = useState(null);
  const toast = useToast();
  const router = useRouter();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (confirmPassword && e.target.value !== confirmPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (password !== e.target.value) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  const handleImageChange = (e) => {
    // Handle image preview
    const file = e.target.files[0];
    // You can use FileReader to read the file and show preview
    console.log("Previewing image:", file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${backendURL}/api/hospital/registerHospital`; // Adjust the URL for adding a new doctor
      
      // Fetch geolocation information
      const position = await getCurrentPosition();
      
      // Data for creating a new doctor
      const newDoctorData = {
        name: name,
        email: email,
        password: password,
        location: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        },
        profilePicture: pfp,
      };
  
      // Send POST request to add a new doctor
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDoctorData),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error('Failed to add new doctor');
      }
  
      // Handle successful addition
      toast({
        title: 'Profile created successfully',
        status: 'success',
        duration: 3000,
        position: 'top',
        isClosable: true,
      });
      router.replace('/login');
    } catch (error) {
      console.error('Error adding new doctor:', error);
      alert('Error adding new doctor. Please check console for details.');
    }
  };

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      } else {
        reject(new Error('Geolocation is not supported by this browser'));
      }
    });
  };

  return (
    <Flex align="center" justify="center" minHeight="90vh">
      <Box width="400px" p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
        <Flex gap={'5px'} alignItems={'center'} justifyContent={'center'} w={'full'} h={'70px'}>
          <Avatar size={'sm'} src='logo.png' name='logo' />
          <h1 className={pacifico.className} style={{ fontSize: "23px" }}>
            Chikitsapran
          </h1>
        </Flex>
        <form onSubmit={handleSubmit}>
          <FormControl id="name" isRequired mb={4}>
            <FormLabel>Name</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <AiOutlineUser />
              </InputLeftElement>
              <Input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
            </InputGroup>
          </FormControl>
          <FormControl id="email" isRequired mb={4}>
            <FormLabel>Email address</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <AiOutlineMail />
              </InputLeftElement>
              <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </InputGroup>
          </FormControl>
          <FormControl id="password" isRequired mb={4}>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <AiOutlineLock />
              </InputLeftElement>
              <Input type="password" placeholder="Enter your password" value={password} onChange={handlePasswordChange} />
            </InputGroup>
          </FormControl>
          <FormControl id="confirmPassword" isRequired mb={4} isInvalid={passwordError !== ""}>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <RiLockPasswordLine />
              </InputLeftElement>
              <Input type="password" placeholder="Confirm your password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
            </InputGroup>
            <FormErrorMessage>{passwordError}</FormErrorMessage>
          </FormControl>
          <FormControl id="profilePicture" mb={4}>
            <Input type="text" placeholder="Enter your profile link" value={pfp} onChange={(e) => setPfp(e.target.value)} />
            {/* You can add an image preview here */}
          </FormControl>
          <Button type="submit" colorScheme="blue" width="full">Sign Up</Button>
        </form>
        <Text margin={'auto'} fontSize={'sm'} display={'inline-block'}>Already have an account?</Text>
        <Link href={'/login'} passHref>
          <Text color='teal' fontWeight={'bold'} margin={'auto'} fontSize={'sm'} display={'inline-block'}>&nbsp;Login</Text>
        </Link>
      </Box>
    </Flex>
  );
}

export default Signup;
