import { useState } from "react";
import PersonalData from "./personalData";
import {
  Button,
  Container,
  Flex,
  Heading,
  ScaleFade,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import CivilStatus from "./civil_satus";
import {
  emailRegex,
  nameRegex,
  phoneNumberRegex,
} from "../../constants/regexConstants";
import Qualification from "./qualification";
import FinancialStatus from "./financial_status";
import Success from "./success";
import Confirm from "../confirm";

const Form = ({
  step,
  setStep,
  formData,
  updateFormData,
  sendData,
  handleLocalSave,
}) => {
  const { isOpen, onToggle } = useDisclosure();

  // Handle Data
  const [personalInfo, setPersonalInfo] = useState({
    ...formData?.personalInfo,
  });

  const [qualification, setQualification] = useState({
    ...formData?.qualification,
  });

  const [civilStatus, setCivilStatus] = useState({
    ...formData?.civilStatus,
  });

  const [financialStatus, setFinancialStatus] = useState({
    ...formData?.financialStatus,
  });

  const [validForm, setValidForm] = useState({
    hasValidEmailAddress: true,
    hasValidPhoneNumber: true,
  });

  let hasValidPhoneNumber = phoneNumberRegex.test(personalInfo?.phoneNumber);

  const formValidation = (e) => {
    let hasValidEmailAddress = emailRegex.test(personalInfo?.email);

    if (personalInfo.email === "") hasValidEmailAddress = undefined;
    if (personalInfo.phoneNumber === "") hasValidPhoneNumber = undefined;
    setValidForm({
      hasValidEmailAddress,
      hasValidPhoneNumber,
    });
    if (
      [hasValidEmailAddress, hasValidPhoneNumber].every(
        (value) => value === true
      )
    ) {
      if (step === 1) {
        updateFormData(personalInfo);
      } else if (step === 2) {
        updateFormData(qualification);
      } else if (step === 3) {
        updateFormData(civilStatus);
      } else if (step === 4) {
        updateFormData(financialStatus);
      } /*else if (step === 5) {
        
         sendData(); 
      }*/
      setStep((s) => s + 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formValidation(e);
  };

  const handleGoBack = () => {
    if (step <= 1) return;
    setStep((s) => s - 1);
  };

  if (step != 6)
    return (
      <Container transition={"0.5s"}>
        <Text mb={5} display={step === 5 ? "none" : "block"}>
          {" "}
          All fields with an asterisk (
          <Text as="span" color="red">
            *
          </Text>
          ) are mandatory.
        </Text>
        {step === 1 && (
          <ScaleFade initialScale={0.9} in={onToggle}>
            <PersonalData
              personalInfo={personalInfo}
              setPersonalInfo={setPersonalInfo}
              validForm={validForm}
            />
          </ScaleFade>
        )}

        {step === 2 && (
          <ScaleFade initialScale={0.9} in={onToggle}>
            <Qualification
              qualification={qualification}
              setQualification={setQualification}
              component={"healthcare"}
              handleLocalSave={handleLocalSave}
            />
          </ScaleFade>
        )}

        {step === 3 && (
          <ScaleFade initialScale={0.9} in={onToggle}>
            <CivilStatus
              civilStatus={civilStatus}
              setCivilStatus={setCivilStatus}
            />
          </ScaleFade>
        )}
        {step === 4 && (
          <ScaleFade initialScale={0.9} in={onToggle}>
            <FinancialStatus
              financialStatus={financialStatus}
              setFinancialStatus={setFinancialStatus}
              updateFormData={updateFormData}
            />
          </ScaleFade>
        )}

        {step === 5 && (
          <ScaleFade initialScale={0.9} in={onToggle}>
            <Confirm formData={formData} />
          </ScaleFade>
        )}

        <Flex justifyContent={"space-between"} mt={5}>
          <Button
            type="button"
            bg={"brand.200"}
            _hover={{
              bg: "",
            }}
            color={"brand.300"}
            onClick={handleGoBack}
            isDisabled={step <= 1}
          >
            Go Back
          </Button>
          <Button
            onClick={(e) => {
              handleSubmit(e);
              onToggle();
            }}
            type="submit"
            bg={"brand.100"}
            color={"brand.300"}
            _hover={{
              bg: "",
            }}
            isDisabled={hasValidPhoneNumber != true}
            display={step >= 5 ? "none" : "block"}
          >
            {step === 4 ? "Confirm" : "Next Step"}
          </Button>

          <Button
            display={step >= 5 ? "block" : "none"}
            bg={"brand.100"}
            color={"brand.300"}
            onClick={(e) => {
              sendData(e);
              setStep((s) => s + 1);
            }}
          >
            send
          </Button>
        </Flex>
      </Container>
    );
  else return <Success />;
};

export default Form;
