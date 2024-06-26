import React from 'react'
import { Flex, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import { backendURL } from '../config/backendURL';

function Admin() {
    const router = useRouter();

    const handlePostMethod = () => {
        // Define the URL for your POST request
        const url = `${backendURL}/api/hospital/sendExcel`;

        // Define the data you want to send
        const postData = {
            // Your POST data here
        };

        // Make the POST request using fetch
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Set the content type
                // Add any additional headers if needed
            },
            body: JSON.stringify(postData), // Convert data to JSON string
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON response
        })
        .then(data => {
            // Handle the response data
            console.log('Post successful:', data);
        })
        .catch(error => {
            // Handle any errors
            console.error('There was a problem with your fetch operation:', error);
        });
    };

    const handleGetMethod = () => {
        // Define the URL for your POST request
        router.push(`${backendURL}/api/hospital/rejectionHospitalInformation`);
    };

    return (
        <div>
            <Flex w='100vw' h='calc(100vh - 50px)' justifyContent={'center'} alignItems={'center'} gap={'10px'}>
                <Button colorScheme={'teal'} onClick={handlePostMethod}>Excel</Button>
                <Button colorScheme={'teal'} onClick={handleGetMethod}>Decline</Button>
            </Flex>
        </div>
    );
}

export default Admin;