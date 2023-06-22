import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { collection, getDocs, limit, orderBy, query, startAt } from "firebase/firestore";
import { db } from "../firebase";
import { useRouter } from "next/router";
import Head from "next/head";

import ProtectedRoute from "../components/protectedroute";
import { useEffect, useState } from "react";
import { useAuth } from "../components/authcontprov";

const Dash_board = (props) => {
  const { user, logOut } = useAuth();

  const [userName, setUserName] = useState("");

  const [isLargerThan700] = useMediaQuery("(min-width: 700px)");

  /* Modal */
  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();

  const { results } = props;

  useEffect(() => {
    if (user.email !== null) {
      const string = user.email.toString();
      const firstTwo = string.substring(0, 6);
      setUserName(firstTwo);
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await logOut();
      router.push("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <ProtectedRoute>
        <Head>
          <title>ADES-UK-Forms | Healthcare Candidates</title>
          <meta
            name="description"
            content="ADES-UK healthcare List of candidates"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Container maxW={1200}>
          <HStack mb={5} justifyContent={"flex-end"}>
            <Button
              onClick={onOpen}
              bg={"brand.100"}
              color={"brand.300"}
              _hover={{ bg: "" }}
            >
              Log Out
            </Button>
          </HStack>

          <Container
            bg={"brand.300"}
            p={isLargerThan700 ? 10 : 5}
            borderRadius={isLargerThan700 ? "xl" : "none"}
          >
            <Heading fontSize={"1.5rem"} fontFamily={"Andika"} mb={5}>
              Hey {userName}, welcome back
            </Heading>
            <Heading fontFamily={"Andika"} mb={5}>
              Names of Candidates
            </Heading>
            <Heading fontFamily={"Andika"} fontSize={"1.1rem"} mb={5}>
              {results.length === 0
                ? "Sorry, no one has registered yet"
                : "Click on a candidate to view more information."}
            </Heading>
            <VStack align={"left"} gap={3}>
              {results.map((candit, i) => {
                const canNumber = i + 1;
                return (
                  <Text
                    borderRadius={"lg"}
                    border={"2px"}
                    borderColor={"brand.200"}
                    boxShadow={"xl"}
                    fontWeight={800}
                    p={2}
                    bg={"brand.100"}
                    color={"brand.300"}
                    key={candit.personalInfo.phoneNumber}
                    cursor={"pointer"}
                    onClick={() => {
                      router.push(`/${candit.personalInfo.phoneNumber}`);
                    }}
                  >
                    <Button
                      _hover={{
                        bg: "",
                      }}
                      mr={3}
                      color={"brand.300"}
                      bg={"brand.200"}
                    >
                      {canNumber}
                    </Button>{" "}
                    {candit.personalInfo.name}
                  </Text>
                );
              })}
            </VStack>
          </Container>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton
                color={"brand.200"}
                _hover={{
                  color: "red",
                }}
              />
              <ModalBody
                display={"flex"}
                justifyContent="center"
                minH={"30vh"}
                alignItems="center"
              >
                <Text>Are you sure you want to Log out?</Text>
              </ModalBody>

              <ModalFooter display={"flex"} justifyContent="space-between">
                <Button
                  bg={"brand.200"}
                  _hover={{
                    bg: "brand.200",
                  }}
                  color={"brand.300"}
                  mr={3}
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    onClose();
                    handleLogout();
                  }}
                  _hover={{
                    bg: "brand.100",
                  }}
                  bg={"brand.100"}
                  color={"brand.300"}
                >
                  Yes
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Container>
      </ProtectedRoute>
    </>
  );
};

export const getServerSideProps = async () => {
  const candidatescollection = collection(db, "candidates");
  // Query all Id cards
  const candidateQuery = query(
    candidatescollection,
    /* limit(10) */
  );

  // get id cards
  const querySnapshot = await getDocs(candidateQuery);

  // Map through the ids and add them to a new array
  const results = [];

  querySnapshot.forEach((snapshot) => {
    results.push(snapshot.data());
  });

  return {
    props: {
      results: JSON.parse(JSON.stringify(results)),
    },
  };
};

export default Dash_board;
