import Head from "next/head";
import {
  Container,
  Flex,
  Heading,
  Input,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  const [isLargerThan700] = useMediaQuery("(min-width: 700px)");

  return (
    <>
      <Head>
        <title>ADES-UK | Forms</title>
        <meta name="description" content="ADES-UK forms" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW={1000}>
        <Heading
          fontSize={"2rem"}
          mb={10}
          fontFamily={"Andika"}
          color={"brand.200"}
          textAlign={"center"}
        >
          ADES Forms
        </Heading>
        <Flex
          gap={5}
          flexDirection={isLargerThan700 ? "row" : "column"}
          justifyContent={"space-evenly"}
        >
          <Link href={"/healthcare"}>
            <Flex
              boxShadow={"xl"}
              flexDirection={"column"}
              justifyContent={"space-evenly"}
              bg={"brand.300"}
              p={isLargerThan700 ? "2rem" : "1.2rem"}
              borderRadius={"lg"}
              h={isLargerThan700 ? 250 : "fit-content"}
            >
              <Heading
                color={"brand.200"}
                fontFamily={"Andika"}
                mb={5}
                fontSize={"1.3rem"}
              >
                Healthcare
              </Heading>

              <Input
                _disabled={{ cursor: "pointer" }}
                _hover={{ border: "" }}
                border={"1px"}
                disabled
                mb={5}
              />
              <Flex
                alignItems={"center"}
                color={"brand.100"}
                justifyContent={"space-between"}
                w={isLargerThan700 ? "80%" : "100%"}
              >
                <Text fontFamily={"Andika"}>
                  Fill and Submit your application for the ADES healthcare
                  services
                </Text>
                <Text ml={3} fontSize={"1.5rem"}>
                  &#x27A1;
                </Text>
              </Flex>
            </Flex>
          </Link>
          <Link href={"/solar_training"}>
            <Flex
              flexDirection={"column"}
              justifyContent={"space-evenly"}
              bg={"brand.300"}
              p={isLargerThan700 ? "2rem" : "1.2rem"}
              borderRadius={"lg"}
              h={isLargerThan700 ? 250 : "fit-content"}
              boxShadow={"xl"}
            >
              <Heading
                color={"brand.200"}
                fontFamily={"Andika"}
                mb={5}
                fontSize={"1.3rem"}
              >
                Solar Training
              </Heading>

              <Input
                _disabled={{ cursor: "pointer" }}
                _hover={{ border: "" }}
                border={"1px"}
                disabled
                mb={5}
              />
              <Flex
                alignItems={"center"}
                color={"brand.100"}
                justifyContent={"space-between"}
                w={isLargerThan700 ? "80%" : "100%"}
              >
                <Text fontFamily={"Andika"}>
                  Fill and Submit your application for the ADES Solar Training
                </Text>
                <Text ml={3} fontSize={"1.5rem"}>
                  &#x27A1;
                </Text>
              </Flex>
            </Flex>
          </Link>
        </Flex>
      </Container>
    </>
  );
}
