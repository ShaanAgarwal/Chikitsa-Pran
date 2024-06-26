import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { BiLogoGmail } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/router";
import {
  Box,
  Flex,
  Text,
  Heading,
  Input,
  Button,
  Link as ChakraLink,
  useToast,
  Stack,
  Avatar,
} from "@chakra-ui/react";

import { Pacifico } from "next/font/google";
import { backendURL } from "./backendURL";

const pacifico = Pacifico({ subsets: ["latin"], weight: "400" });

export default function Login() { // Renamed to Login
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = `${backendURL}/api/hospital/loginHospital`;

      const loginData = {
        email: email,
        password: password,
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const responseData = await response.json();

      if (response.ok && responseData.success) {
        localStorage.setItem("email", email);
        toast({
          title: "Welcome back " + email,
          status: "success",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
        router.push("/");
      } else {
        toast({
          title: "Please enter correct credentials.",
          status: "error",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      return false;
    }
  };

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box
        textAlign={"center"}
        borderColor={"black"}
        overflow={"auto"}
        p={"8px"}
        w={"320px"}
        h={"400px"}
        borderWidth={1}
        borderRadius="md"
        shadow="lg"
      >
        <Flex
          gap={"5px"}
          alignItems={"center"}
          justifyContent={"center"}
          w={"full"}
          h={"70px"}
        >
          <Avatar size={"sm"} src="logo.png" name="logo" />
          <h1 className={pacifico.className} style={{ fontSize: "23px" }}>
            Chikitsapran
          </h1>
        </Flex>
        <form onSubmit={handleSubmit}>
          <Stack spacing={10}>
            <Input
              variant="outline"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              variant="outline"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {isLoading ? (
              <Button colorScheme="teal" isLoading>
                Login
              </Button>
            ) : (
              <Button colorScheme="teal" type="submit">
                Login
              </Button>
            )}
          </Stack>
        </form>
        <Text margin={"auto"} fontSize={"sm"} display={"inline-block"}>
          Don&apos;t have an account?
        </Text>
        <Link href="/signup" display={"inline-block"} fontSize={"sm"}>
          <Text
            color="teal"
            fontWeight={"bold"}
            margin={"auto"}
            fontSize={"sm"}
            display={"inline-block"}
          >
            &nbsp;Register
          </Text>
        </Link>
      </Box>
    </Flex>
  );
}
