import React from 'react'
import { Box,Button } from '@chakra-ui/react'
import { BiInjection } from "react-icons/bi";
import { BsGear } from "react-icons/bs";
import { RiStethoscopeFill } from "react-icons/ri";

function Sidebar() {
  return (
    <div>
        <Box border={'1px solid black'} w={'250px'} h={'full'} p={'5px'}>
            <Button display={'flex'} justifyContent={'left'} colorScheme={'teal'} variant={'outline'} leftIcon={<BiInjection />} w={'full'} mt={'5px'} mb={'5px'}>Equipments</Button>
            <Button display={'flex'} justifyContent={'left'} colorScheme={'teal'} variant={'outline'} leftIcon={<BsGear />} w={'full'} mt={'5px'} mb={'5px'}>Operation theatres</Button>
            <Button display={'flex'} justifyContent={'left'} colorScheme={'teal'} variant={'outline'} leftIcon={<RiStethoscopeFill />} w={'full'} mt={'5px'} mb={'5px'}>Doctors</Button>
        </Box>
    </div>
  )
}

export default Sidebar