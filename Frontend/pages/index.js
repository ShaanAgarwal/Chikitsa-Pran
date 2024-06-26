import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
const inter = Inter({ subsets: ["latin"] });
import {
  Button,
  useColorMode,
  Box,
  Flex,
  SimpleGrid,
  Text,
  useToast,
  Divider,
  Stack,
  CircularProgress,
  CircularProgressLabel,
  Badge,
} from "@chakra-ui/react";
import Sidebar from "./components/Sidebar";
import { LuPackagePlus } from "react-icons/lu";
import { FaUserDoctor } from "react-icons/fa6";
import { IoIosAddCircleOutline } from "react-icons/io";
import { BiInjection } from "react-icons/bi";
import { BsGear } from "react-icons/bs";
import { RiStethoscopeFill } from "react-icons/ri";
import { MdAdd } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa6";
import { useRouter } from "next/router";
import { BiError } from "react-icons/bi";
import axios from "axios";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  ModalCloseButton,
  Input,
} from "@chakra-ui/react";
import { backendURL } from "../config/backendURL";
export default function Home() {
  const router = useRouter();
  const toast = useToast();
  const [data, setData] = useState(null);
  const [option, setOption] = useState(1);
  const [ind, setInd] = useState(null);
  const [records, setRecords] = useState([]);
  const [operations, setOperations] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const {
    isOpen: isDocOpen,
    onOpen: onDocOpen,
    onClose: onDocClose,
  } = useDisclosure();
  const {
    isOpen: isEqOpen,
    onOpen: onEqOpen,
    onClose: onEqClose,
  } = useDisclosure();
  const {
    isOpen: isOpOpen,
    onOpen: onOpOpen,
    onClose: onOpClose,
  } = useDisclosure();
  useEffect(() => {
    if (!localStorage.getItem("email")) {
      // Redirect to login page
      router.push("/login");
    }
    const fetchData = async () => {
      try {
        const email = localStorage.getItem("email"); // Define the email
        const url = `${backendURL}/api/hospital/getHospital?email=${encodeURIComponent(
          email
        )}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const responseData = await response.json();
        setData(responseData);
        // alert("Error fetching data. Please check console for details.");
        setRecords(responseData.hospital.medicalEquipment);
        setOperations(responseData.hospital.operationTheatres);
        setDoctors(responseData.hospital.doctors);
        // console.log(data.hospital._id);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData(null);
        alert("Error fetching data. Please check console for details.");
      }
    };

    fetchData();
  }, []);

  const updateEquipment = async (name, id, count) => {
    try {
      const email = "shaanagarwalofficial@gmail.com"; // Define the email
      const url = `${backendURL}/api/hospital/updateMedicalEquipment`;
      // Update the data
      const newData = {
        hospitalId: id,
        name: name,
        count: count,
      };

      // Send PUT request with updated data
      const putResponse = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      if (!putResponse.ok) {
        throw new Error("Failed to update data");
      }

      // Handle successful update
      toast({
        title: "Record update successful.",
        status: "success",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
      const updatedRecords = [...records];
      // Update the number property of the record at the specified index
      updatedRecords[ind].count = count;
      // Set the state with the updated records array
      setRecords(updatedRecords);
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Error updating data. Please check console for details.");
    }
  };

  const updateOperation = async (name, id, count) => {
    try {
      const email = "shaanagarwalofficial@gmail.com"; // Define the email
      const url = `${backendURL}/api/hospital/updateOperationTheatre/` + id;
      // Update the data
      const newData = {
        name: name,
        count: count,
      };

      // Send PUT request with updated data
      const putResponse = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      if (!putResponse.ok) {
        throw new Error("Failed to update data");
      }

      // Handle successful update
      toast({
        title: "Record update successful.",
        status: "success",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
      const updatedRecords = [...operations];
      // Update the number property of the record at the specified index
      updatedRecords[ind].count = count;
      // Set the state with the updated records array
      setOperations(updatedRecords);
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Error updating data. Please check console for details.");
    }
  };

  const updateDoctorcount = async (name, id, count) => {
    try {
      const email = "shaanagarwalofficial@gmail.com"; // Define the email
      const url = `${backendURL}/api/hospital/updateDoctor`;
      // Update the data
      const newData = {
        hospitalId: id,
        speciality: name,
        count: count,
      };

      // Send PUT request with updated data
      const putResponse = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      if (!putResponse.ok) {
        throw new Error("Failed to update data");
      }

      // Handle successful update
      toast({
        title: "Record update successful.",
        status: "success",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
      const updatedRecords = [...doctors];
      // Update the number property of the record at the specified index
      updatedRecords[ind].count = count;
      // Set the state with the updated records array
      setDoctors(updatedRecords);
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Error updating data. Please check console for details.");
    }
  };
  const addDoctor = async (id) => {
    try {
      const email = "shaanagarwalofficial@gmail.com"; // Define the email
      const url = `${backendURL}/api/hospital/createDoctor`; // Adjust the URL for adding a new doctor

      // Data for creating a new doctor

      var c = document.getElementById("doc_count").value;
      var t = document.getElementById("doc_threshold").value;
      if (c <= t && c > -1 && t > -1) {
        const newDoctorData = {
          hospitalId: id,
          speciality: document.getElementById("speciality").value,
          count: document.getElementById("doc_count").value,
          threshold: document.getElementById("doc_threshold").value,
        };

        // Send POST request to add a new doctor
        const response = await fetch(url, {
          method: "POST", // Change the method to "POST"
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newDoctorData),
        });

        if (!response.ok) {
          throw new Error("Failed to add new doctor");
        }

        // Handle successful addition
        toast({
          title: "Doctor added successfully.",
          status: "success",
          duration: 3000,
          position: "top",
          isClosable: true,
        });

        // Optionally update the state with the new data
        const addedDoctor = JSON.stringify(newDoctorData);
        // alert(addedD)
        setDoctors([...doctors, JSON.parse(addedDoctor)]);
      } else {
        toast({
          title: "Please add valid inputs.",
          status: "error",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error adding new doctor:", error);
      alert("Error adding new doctor. Please check console for details.");
    }
  };

  const addEquipment = async (id) => {
    try {
      const email = "shaanagarwalofficial@gmail.com"; // Define the email
      const url = `${backendURL}/api/hospital/addMedicalEquipment`; // Adjust the URL for adding a new doctor

      // Data for creating a new doctor

      var c = document.getElementById("eq_count").value;
      var t = document.getElementById("eq_threshold").value;
      if (c <= t && c > -1 && t > -1) {
        const newDoctorData = {
          hospitalId: id,
          name: document.getElementById("doc_name").value,
          count: document.getElementById("eq_count").value,
          threshold: document.getElementById("eq_threshold").value,
          imageUrl: document.getElementById("doc_imgurl").value,
        };

        // Send POST request to add a new doctor
        const response = await fetch(url, {
          method: "POST", // Change the method to "POST"
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newDoctorData),
        });
        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to add new doctor");
        }

        // Handle successful addition
        toast({
          title: "Equipment added successfully.",
          status: "success",
          duration: 3000,
          position: "top",
          isClosable: true,
        });

        // Optionally update the state with the new data
        const addedDoctor = JSON.stringify(newDoctorData);
        // alert(addedD)
        setRecords([...records, JSON.parse(addedDoctor)]);
      } else {
        toast({
          title: "Please add valid inputs.",
          status: "error",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error adding new doctor:", error);
      alert("Error adding new doctor. Please check console for details.");
    }
  };

  const addOperationTheater = async (id) => {
    try {
      const email = "shaanagarwalofficial@gmail.com"; // Define the email
      const url = `${backendURL}/api/hospital/` + id + "/operation-theatre"; // Adjust the URL for adding a new doctor

      // Data for creating a new doctor

      var c = document.getElementById("op_count").value;
      var t = document.getElementById("op_threshold").value;
      if (c <= t && c > -1 && t > -1) {
        const newDoctorData = {
          name: document.getElementById("op_name").value,
          count: document.getElementById("op_count").value,
          threshold: document.getElementById("op_threshold").value,
        };

        // Send POST request to add a new doctor
        const response = await fetch(url, {
          method: "POST", // Change the method to "POST"
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newDoctorData),
        });

        if (!response.ok) {
          throw new Error("Failed to add new doctor");
        }

        // Handle successful addition
        toast({
          title: "Operation theatre added successfully.",
          status: "success",
          duration: 3000,
          position: "top",
          isClosable: true,
        });

        // Optionally update the state with the new data
        const addedDoctor = JSON.stringify(newDoctorData);
        // alert(addedD)
        setOperations([...operations, JSON.parse(addedDoctor)]);
      } else {
        toast({
          title: "Please add valid inputs.",
          status: "error",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error adding new doctor:", error);
      alert("Error adding new doctor. Please check console for details.");
    }
  };

  function methodDistribution(ind, id) {
    var count = document.getElementById("neweq").value;
    if (option === 1 && count <= records[ind].threshold && count > -1) {
      updateEquipment(records[ind].name, id, count);
    } else if (
      option === 2 &&
      count <= operations[ind].threshold &&
      count > -1
    ) {
      updateOperation(operations[ind].name, id, count);
    } else if (option === 3 && count <= doctors[ind].threshold && count > -1) {
      updateDoctorcount(doctors[ind].speciality, id, count);
    } else {
      toast({
        title: "Please enter a valid number!!!",
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    }
  }
  const { colorMode, toggleColorMode } = useColorMode();
  // val=Math.round((record.num*100)/record.threshold)
  // val=17;
  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isModalOpen}
        onClose={onModalClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Set new value</ModalHeader>
          <ModalCloseButton
            onClick={() => {
              onModalClose();
              setInd(null);
            }}
          />
          <ModalBody>
            <Input type="number" id="neweq" placeholder="Enter new number..." />
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme={"orange"}
              onClick={() => {
                onModalClose();
                methodDistribution(ind, data.hospital._id);
              }}
              variant="solid"
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal closeOnOverlayClick={false} isOpen={isEqOpen} onClose={onEqClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new doctor</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={5}>
              <Input type="text" id="speciality" placeholder="Speciality..." />
              <Input type="number" id="doc_count" placeholder="Count..." />
              <Input
                type="number"
                id="doc_threshold"
                placeholder="Total doctors..."
              />
              <Button
                onClick={() => {
                  onEqClose();
                  addDoctor(data.hospital._id);
                }}
                colorScheme={"orange"}
              >
                Add
              </Button>
            </Stack>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        closeOnOverlayClick={false}
        isOpen={isDocOpen}
        onClose={onDocClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new equipment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={5}>
              <Input type="text" id="doc_name" placeholder="Name..." />
              <Input type="number" id="eq_count" placeholder="Inventory..." />
              <Input
                type="number"
                id="eq_threshold"
                placeholder="Max capacity..."
              />
              <Input type="text" id="doc_imgurl" placeholder="Image URL..." />
              <Button
                onClick={() => {
                  onDocClose();
                  addEquipment(data.hospital._id);
                }}
                colorScheme={"orange"}
              >
                Add
              </Button>
            </Stack>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>

      <Modal closeOnOverlayClick={false} isOpen={isOpOpen} onClose={onOpClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new operation theater</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={5}>
              <Input type="text" id="op_name" placeholder="Name..." />
              <Input type="number" id="op_count" placeholder="Inventory..." />
              <Input
                type="number"
                id="op_threshold"
                placeholder="Max capacity..."
              />
              <Button
                onClick={() => {
                  onOpClose();
                  addOperationTheater(data.hospital._id);
                }}
                colorScheme={"orange"}
              >
                Add
              </Button>
            </Stack>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>

      <Flex w={"100vw"} h={"calc(100vh - 50px)"}>
        {/* Sidebar */}
        <Box
          boxShadow={"2xl"}
          borderRadius={"10px"}
          w={"250px"}
          h={"full"}
          p={"10px"}
        >
          <Button
            onClick={() => {
              setOption(1);
            }}
            display={"flex"}
            justifyContent={"left"}
            colorScheme={"teal"}
            variant={option === 1 ? "solid" : "outline"}
            leftIcon={<BiInjection />}
            w={"full"}
            mt={"5px"}
            mb={"5px"}
          >
            Equipments
          </Button>
          <Button
            onClick={() => {
              setOption(2);
            }}
            display={"flex"}
            justifyContent={"left"}
            colorScheme={"teal"}
            variant={option === 2 ? "solid" : "outline"}
            leftIcon={<BsGear />}
            w={"full"}
            mt={"5px"}
            mb={"5px"}
          >
            Operation theatres
          </Button>
          <Button
            onClick={() => {
              setOption(3);
            }}
            display={"flex"}
            justifyContent={"left"}
            colorScheme={"teal"}
            variant={option === 3 ? "solid" : "outline"}
            leftIcon={<RiStethoscopeFill />}
            w={"full"}
            mt={"5px"}
            mb={"15px"}
          >
            Doctors
          </Button>
          <Divider border={"1px solid rgba(0,128,128,0.3)"} />
          <Button
            onClick={onDocOpen}
            display={"flex"}
            justifyContent={"left"}
            colorScheme={"teal"}
            variant={"ghost"}
            leftIcon={<MdAdd />}
            w={"full"}
            mt={"15px"}
            mb={"5px"}
          >
            Add Equipment
          </Button>
          <Button
            onClick={onOpOpen}
            display={"flex"}
            justifyContent={"left"}
            colorScheme={"teal"}
            variant={"ghost"}
            leftIcon={<IoIosAddCircleOutline />}
            w={"full"}
            mt={"5px"}
            mb={"5px"}
          >
            Add operation theater
          </Button>
          <Button
            onClick={onEqOpen}
            display={"flex"}
            justifyContent={"left"}
            colorScheme={"teal"}
            variant={"ghost"}
            leftIcon={<FaUserPlus />}
            w={"full"}
            mt={"5px"}
            mb={"5px"}
          >
            Add Doctor
          </Button>
        </Box>

        <Box w={"full"} h={"full"} overflow={"auto"}>
          {/* Equipments */}
          {option === 1 ? (
            <>
              <SimpleGrid minChildWidth="340px" spacing="10px" p={"20px"}>
                {records.map((record, index) => (
                  <Box
                    key={record.id}
                    _hover={{ boxShadow: "dark-lg" }}
                    w="340px"
                    border={"1px solid black"}
                    cursor={"pointer"}
                    height="300px"
                    borderRadius={"15px"}
                    transitionDuration={"0.3s"}
                    p={"10px"}
                  >
                    <Box w={"full"} h={"50%"} borderBottom={"1px solid black"}>
                      <img
                        src={record.imageUrl}
                        alt="eq1"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </Box>
                    <Text mb={"5px"} w={"full"} fontWeight={"bold"}>
                      {record.name}
                    </Text>
                    <Badge
                      mb={"5px"}
                      mr={"5px"}
                      p={"5px"}
                      pl={"10px"}
                      pr={"10px"}
                      borderRadius={"8px"}
                      size={"md"}
                      colorScheme={
                        Math.round((record.count * 100) / record.threshold) <=
                        20
                          ? "red"
                          : Math.round(
                              (record.count * 100) / record.threshold
                            ) <= 50
                          ? "orange"
                          : "green"
                      }
                    >
                      Inventory: {record.count}
                    </Badge>
                    <Badge
                      mb={"5px"}
                      p={"5px"}
                      pl={"10px"}
                      pr={"10px"}
                      borderRadius={"8px"}
                      size={"md"}
                      colorScheme={"blue"}
                    >
                      Max capacity: {record.threshold}
                    </Badge>

                    <br />
                    <CircularProgress
                      mb={"5px"}
                      value={Math.round(
                        (record.count * 100) / record.threshold
                      )}
                      color={
                        Math.round((record.num * 100) / record.threshold) <= 20
                          ? "red.400"
                          : Math.round(
                              (record.count * 100) / record.threshold
                            ) <= 50
                          ? "orange.400"
                          : "green.400"
                      }
                    >
                      <CircularProgressLabel>
                        {Math.round((record.count * 100) / record.threshold)}%
                      </CircularProgressLabel>
                    </CircularProgress>
                    <br />
                    <Button
                      onClick={() => {
                        setInd(index);
                        onModalOpen();
                      }}
                      leftIcon={<LuPackagePlus />}
                      m={"auto"}
                      size={"xs"}
                      colorScheme={"teal"}
                    >
                      Update inventory
                    </Button>
                  </Box>
                ))}
              </SimpleGrid>
            </>
          ) : (
            <></>
          )}

          {/* Operation theatres */}
          {option === 2 ? (
            <>
              <SimpleGrid minChildWidth="340px" spacing="10px" p={"20px"}>
                {operations.map((operation, index) => (
                  <Box
                    key={operation.id}
                    _hover={{ boxShadow: "dark-lg" }}
                    w="340px"
                    border={"1px solid black"}
                    cursor={"pointer"}
                    height="300px"
                    borderRadius={"15px"}
                    transitionDuration={"0.3s"}
                    p={"10px"}
                  >
                    <Text mb={"5px"} w={"full"} fontWeight={"bold"}>
                      {operation.name}
                    </Text>
                    <Badge
                      mb={"5px"}
                      mr={"5px"}
                      p={"5px"}
                      pl={"10px"}
                      pr={"10px"}
                      borderRadius={"8px"}
                      size={"md"}
                      colorScheme={
                        Math.round(
                          (operation.count * 100) / operation.threshold
                        ) <= 20
                          ? "red"
                          : Math.round(
                              (operation.count * 100) / operation.threshold
                            ) <= 50
                          ? "orange"
                          : "green"
                      }
                    >
                      Free rooms: {operation.count}
                    </Badge>
                    <Badge
                      mb={"5px"}
                      p={"5px"}
                      pl={"10px"}
                      pr={"10px"}
                      borderRadius={"8px"}
                      size={"md"}
                      colorScheme={"blue"}
                    >
                      Total rooms: {operation.threshold}
                    </Badge>

                    <br />
                    <CircularProgress
                      mb={"5px"}
                      value={Math.round(
                        (operation.count * 100) / operation.threshold
                      )}
                      color={
                        Math.round(
                          (operation.count * 100) / operation.threshold
                        ) <= 20
                          ? "red.400"
                          : Math.round(
                              (operation.count * 100) / operation.threshold
                            ) <= 50
                          ? "orange.400"
                          : "green.400"
                      }
                    >
                      <CircularProgressLabel>
                        {Math.round(
                          (operation.count * 100) / operation.threshold
                        )}
                        %
                      </CircularProgressLabel>
                    </CircularProgress>
                    <br />
                    <Button
                      onClick={() => {
                        setInd(index);
                        onModalOpen();
                      }}
                      leftIcon={<LuPackagePlus />}
                      m={"auto"}
                      size={"xs"}
                      colorScheme={"teal"}
                    >
                      Update room count
                    </Button>
                  </Box>
                ))}
              </SimpleGrid>
            </>
          ) : (
            <></>
          )}

          {/* Doctors */}
          {option === 3 ? (
            <>
              <SimpleGrid minChildWidth="340px" spacing="10px" p={"20px"}>
                {doctors.map((doctor, index) => (
                  <Box
                    key={doctor.id}
                    _hover={{ boxShadow: "dark-lg" }}
                    w="340px"
                    border={"1px solid black"}
                    cursor={"pointer"}
                    height="300px"
                    borderRadius={"15px"}
                    transitionDuration={"0.3s"}
                    p={"10px"}
                  >
                    <Text mb={"5px"} w={"full"} fontWeight={"bold"}>
                      {doctor.speciality}
                    </Text>
                    <Badge
                      mb={"5px"}
                      mr={"5px"}
                      p={"5px"}
                      pl={"10px"}
                      pr={"10px"}
                      borderRadius={"8px"}
                      size={"md"}
                      colorScheme={
                        Math.round((doctor.count * 100) / doctor.threshold) <=
                        20
                          ? "red"
                          : Math.round(
                              (doctor.count * 100) / doctor.threshold
                            ) <= 50
                          ? "orange"
                          : "green"
                      }
                    >
                      Available doctors: {doctor.count}
                    </Badge>
                    <Badge
                      mb={"5px"}
                      p={"5px"}
                      pl={"10px"}
                      pr={"10px"}
                      borderRadius={"8px"}
                      size={"md"}
                      colorScheme={"blue"}
                    >
                      Total doctors: {doctor.threshold}
                    </Badge>

                    <br />
                    <CircularProgress
                      mb={"5px"}
                      value={Math.round(
                        (doctor.count * 100) / doctor.threshold
                      )}
                      color={
                        Math.round((doctor.count * 100) / doctor.threshold) <=
                        20
                          ? "red.400"
                          : Math.round(
                              (doctor.count * 100) / doctor.threshold
                            ) <= 50
                          ? "orange.400"
                          : "green.400"
                      }
                    >
                      <CircularProgressLabel>
                        {Math.round((doctor.count * 100) / doctor.threshold)}%
                      </CircularProgressLabel>
                    </CircularProgress>
                    <br />
                    <Button
                      onClick={() => {
                        setInd(index);
                        onModalOpen();
                      }}
                      leftIcon={<FaUserDoctor />}
                      m={"auto"}
                      size={"xs"}
                      colorScheme={"teal"}
                    >
                      Update doctor count
                    </Button>
                  </Box>
                ))}
              </SimpleGrid>
            </>
          ) : (
            <></>
          )}
        </Box>
      </Flex>
    </>
  );
}
