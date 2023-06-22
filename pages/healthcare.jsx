import {
  Container,
  Flex,
  Heading,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Head from "next/head";
import Step from "../components/step";
import Form from "../components/forms/form";

const stepTitles = [
  "Personal info",
  "Qualification",
  "Civil Status",
  "Financial Status",
  "Confirm",
  "Finish",
];

const Healthcare = () => {
  const [isLargerThan700] = useMediaQuery("(min-width: 700px)");

  const [formData, setFormData] = useState({
    personalInfo: {
      name: "",
      dateOfBirth: "",
      sex: "",
      email: "",
      phoneNumber: "",
      country: "",
      province: "",
      city: "",
      move: "",
    },
    qualification: {
      qualification: "",
      othersSpecific: "",
      certificate: "",
      CV: "",
      subject: "",
      institution: "",
      date: "",
      lanOfInstruct: "",
      englishProff: "",
      experience: "",
    },
    civilStatus: {
      marital: "",
      numOfChildren: "",
      ageGroup: "",
      bringingThem: "",
      drivingSkills: "",
    },
    financialStatus: {
      signature: "",
      date: "",
    },
  });
  const [step, setStep] = useState(1);

  const updateFormData = (data) => {
    if (step == 1) {
      setFormData({
        ...formData,
        // Probably better to add each individual key:value of personalInfo but oh well
        personalInfo: data,
      });
    } else if (step == 2) {
      setFormData({
        ...formData,
        // add the data from the next component
        qualification: data,
      });
    } else if (step == 3) {
      setFormData({
        ...formData,
        // Add data from next component
        civilStatus: data,
      });
    } else if (step == 4) {
      setFormData({
        ...formData,
        // Add data from next component
        financialStatus: data,
      });
    }
  };

  const sendNotification = async (data) => {
    const response = await axios.post("/api/sendgrid", data);
  };

  const sendData = async (e) => {
    const timestamp = Date.now().toString();

    const candidate = doc(db, `candidates/${timestamp}`);

    const candidateData = formData;

    try {
      await setDoc(candidate, candidateData).then(() => {});
      sendNotification(candidateData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLocalSave = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("healthFormData", JSON.stringify(formData));

      const data = JSON.parse(localStorage.getItem("healthFormData"));

      setFormData(data);
    }
  };

  return (
    <>
      <Head>
        <title>ADES-UK-Foms | Healthcare</title>
        <meta name="description" content="ADES-UK healthcare form" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container
        boxShadow={"2xl"}
        bg={"brand.300"}
        maxW={900}
        borderRadius={isLargerThan700 ? "xl" : "unset"}
        p={isLargerThan700 ? 10 : 3}
      >
        <Heading
          color={"brand.100"}
          fontFamily={"Andika"}
          mb={5}
          textAlign={"center"}
        >
          {step === 6 ? "Success" : "ADES Healthcare Form"}
        </Heading>
        <Flex flexDirection={isLargerThan700 ? "row" : "column"}>
          <aside>
            <Flex
              flexDirection={isLargerThan700 ? "column" : "row"}
              gap={isLargerThan700 ? 5 : 2}
              justifyContent={"space-between"}
              mb={1}
            >
              {stepTitles.map((title, i) => {
                return (
                  <Step key={title} step={step} stepNumber={i + 1}>
                    {title}
                  </Step>
                );
              })}
            </Flex>
            <Text mb={5} fontSize={"0.8rem"}>
              Progress Bar
            </Text>
          </aside>
          <Form
            step={step}
            setStep={setStep}
            formData={formData}
            updateFormData={updateFormData}
            sendData={sendData}
            handleLocalSave={handleLocalSave}
          />
        </Flex>
      </Container>
    </>
  );
};

export default Healthcare;
