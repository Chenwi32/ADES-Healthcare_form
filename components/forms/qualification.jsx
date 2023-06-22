import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Checkbox,
  CloseButton,
  Container,
  FormLabel,
  HStack,
  Heading,
  Image,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";
import storage from "../../firebase";

const Qualification = ({
  qualification,
  setQualification,
  component,
  handleLocalSave,
}) => {
  // File upload functionality

  const [selectedFile, setSelectedFile] = useState();
  const [selectedCv, setSelectedCv] = useState();
  const [preview, setPreview] = useState("");
  const [previewCV, setPreviewCV] = useState("");

  const [downloadUrl, setDownloadUrl] = useState("");
  const [cvDownloadUrl, setCvDownloadUrl] = useState("");
  const [uploadbtnText, setUploadBtntext] = useState("Upload");
  const [uploadCvbtnText, setUploadCvBtntext] = useState("Upload");

  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: true });
  const {
    isOpen: isVisible2,
    onClose: onClose2,
    onOpen: onOpen2,
  } = useDisclosure({ defaultIsOpen: true });

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile || !selectedCv) {
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    const cvUrl = URL.createObjectURL(selectedCv);

    setPreviewCV(cvUrl);

    // free memory when ever this component is unmounted
    return () => {
      URL.revokeObjectURL(objectUrl);
      URL.revokeObjectURL(cvUrl);
    };
  }, [selectedFile, selectedCv]);

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedCv) {
      return;
    }

    const cvUrl = URL.createObjectURL(selectedCv);

    setPreviewCV(cvUrl);

    // free memory when ever this component is unmounted
    return () => {
      URL.revokeObjectURL(cvUrl);
    };
  }, [selectedCv]);

  const getError = (validator) => {
    if (!validator)
      return (
        <Text color={"red"}>
          {validator === undefined
            ? "This field is required"
            : "Invalid format"}
        </Text>
      );
  };

  const handleUpload = () => {
    const mountainsRef = ref(storage, "canditCertif/" + selectedFile.name);
    uploadBytesResumable(mountainsRef, selectedFile).then((snapshot) => {
      setUploadBtntext("Uploading...");
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        setDownloadUrl(downloadURL);
        setQualification({
          ...qualification,
          certificate: downloadURL,
        });
        setUploadBtntext("Uploaded");
      });
    });
  };

  const handleUploadCv = () => {
    const mountainsRef = ref(storage, "canditCertif/" + selectedCv.name);
    uploadBytesResumable(mountainsRef, selectedCv).then((snapshot) => {
      setUploadCvBtntext("Uploading...");
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        setCvDownloadUrl(downloadURL);
        setQualification({
          ...qualification,
          CV: downloadURL,
        });
        setUploadCvBtntext("Uploaded");
      });
    });
  };

  ////////////////////////////////

  return (
    <Container maxW={"unset"} p={0}>
      <Heading fontFamily={"Andika"} fontSize={"1.5rem"} mb={5}>
        Qualification
      </Heading>
      {component === "healthcare" ? (
        <>
          <Text mb={5}>
            To qualify for this program, you must have at least a high school
            certificate or a higher education qualification such as the HND,
            Bachelor's degree, etc., in any field.
          </Text>
          <FormLabel>
            <Text as="span" color="red">
              *
            </Text>{" "}
            What is your highest qualification?
          </FormLabel>
          <Select
            value={qualification.qualification}
            onChange={(e) => {
              setQualification({
                ...qualification,
                qualification: e.target.value,
              });
            }}
            mb={5}
            placeholder="Select Qualification"
            borderColor={"gray"}
          >
            <option value={"GCE A-level"}>GCE A-level</option>
            <option value={"Brevet"}>Brevet</option>
            <option value={"HND"}>HND</option>
            <option value={"BSC"}>BSC</option>
            <option value={"Others"}>Others</option>
          </Select>

          <Box
            display={qualification.qualification != "Others" ? "none" : "block"}
          >
            <FormLabel>If you chosed others, please specify here:</FormLabel>
            <Input
              value={qualification.othersSpecific}
              onChange={(e) => {
                setQualification({
                  ...qualification,
                  othersSpecific: e.target.value,
                });
              }}
              mb={5}
              borderColor={"gray"}
            />
          </Box>

          <FormLabel>
            <Text as="span" color="red">
              *
            </Text>{" "}
            Upload Highest Certificate ( PDF or image( jpg, jpeg, png ) )
          </FormLabel>

          {isVisible2 ? (
            <Alert status="warning" mb={10}>
              <AlertIcon />
              <Box>
                <AlertDescription>
                  Please don't forget to click on the upload button
                </AlertDescription>
              </Box>
              <CloseButton
                alignSelf="flex-start"
                position="absolute"
                right={0}
                top={0}
                onClick={onClose2}
              />
            </Alert>
          ) : (
            <></>
          )}
          <Input
            onChange={(e) => {
              if (!e.target.files || e.target.files.length === 0) {
                setSelectedFile(undefined);
                return;
              }

              // Selects just one file

              setSelectedFile(e.target.files[0]);
            }}
            mb={5}
            border={"none"}
            type="file"
          />

          <Box mt={5} mb={5} w={"100%"}>
            {selectedFile && (
              <>
                <Heading mb={5} fontSize={"1.1rem"}>
                  Preview
                </Heading>
                {selectedFile.name.includes(".pdf") === true ? (
                  <iframe src={preview} />
                ) : (
                  <Image
                    src={preview}
                    width={300}
                    height={300}
                    alt="There seems to be a problem with the file you selected"
                    mb={10}
                  />
                )}
                <Button
                  mt={5}
                  bg={"brand.100"}
                  color={"white"}
                  _hover={{
                    bg: "default",
                  }}
                  onClick={handleUpload}
                >
                  {uploadbtnText}
                </Button>
              </>
            )}
          </Box>

          <FormLabel>
            <Text as="span" color="red">
              *
            </Text>{" "}
            What is the subject (specialization) of your diploma or degree?
          </FormLabel>
          <Input
            value={qualification.subject}
            onChange={(e) => {
              setQualification({
                ...qualification,
                subject: e.target.value,
              });
            }}
            mb={5}
            borderColor={"gray"}
          />
          <FormLabel>
            In which institution(s) did you obtain your qualification(s)?
          </FormLabel>
          <Input
            value={qualification.institution}
            onChange={(e) => {
              setQualification({
                ...qualification,
                institution: e.target.value,
              });
            }}
            mb={5}
            borderColor={"gray"}
          />
          <FormLabel>In what year did you graduate?</FormLabel>
          <Input
            value={qualification.date}
            onChange={(e) => {
              setQualification({
                ...qualification,
                date: e.target.value,
              });
            }}
            type={"date"}
            mb={5}
            borderColor={"gray"}
          />
          <FormLabel>
            Was English your language of instruction and are your transcripts
            and certificates issued in English?*
          </FormLabel>
          <RadioGroup
            value={qualification.lanOfInstruct}
            onChange={(e) => {
              setQualification({ ...qualification, lanOfInstruct: e });
            }}
          >
            <Stack direction="row">
              <Radio borderColor={"gray.400"} value="Yes">
                Yes
              </Radio>
              <Radio borderColor={"gray.400"} value="No">
                No
              </Radio>
            </Stack>
          </RadioGroup>
          <FormLabel>
            Do you have a valid English language profficiency certificate?
          </FormLabel>
          <RadioGroup
            mb={5}
            value={qualification.englishProff}
            onChange={(e) => {
              setQualification({ ...qualification, englishProff: e });
            }}
          >
            <Stack direction="row">
              <Radio borderColor={"gray.400"} value="Yes">
                Yes
              </Radio>
              <Radio borderColor={"gray.400"} value="No">
                No
              </Radio>
            </Stack>
          </RadioGroup>

          <FormLabel>Briefly describe any work experience you have</FormLabel>
          <Input
            value={qualification.experience}
            onChange={(e) => {
              setQualification({
                ...qualification,
                experience: e.target.value,
              });
            }}
            mb={5}
            borderColor={"gray"}
          />

          {/*   <HStack>
            <Button onClick={() => handleLocalSave()}>
              Save and continue Later
            </Button>
          </HStack> */}

          <FormLabel>
            <Text as="span" color="red">
              *
            </Text>{" "}
            Upload Your CV ( PDF or image( jpg, jpeg, png ) )
          </FormLabel>

          {isVisible ? (
            <Alert status="warning" mb={10}>
              <AlertIcon />
              <Box>
                <AlertDescription>
                  Please don't forget to click on the upload button
                </AlertDescription>
              </Box>
              <CloseButton
                alignSelf="flex-start"
                position="absolute"
                right={0}
                top={0}
                onClick={onClose}
              />
            </Alert>
          ) : (
            <></>
          )}
          <Input
            onChange={(e) => {
              if (!e.target.files || e.target.files.length === 0) {
                setSelectedCv(undefined);
                return;
              }

              // Selects just one file

              setSelectedCv(e.target.files[0]);
            }}
            mb={5}
            border={"none"}
            type="file"
          />

          <Box mt={5} mb={5} w={"100%"}>
            {selectedCv && (
              <>
                <Heading mb={5} fontSize={"1.1rem"}>
                  Preview
                </Heading>
                {selectedCv.name.includes(".pdf") === true ? (
                  <iframe src={previewCV} />
                ) : (
                  <Image
                    src={previewCV}
                    width={300}
                    height={300}
                    alt="There seems to be a problem with the file you selected"
                    mb={10}
                  />
                )}
                <Button
                  mt={5}
                  bg={"brand.100"}
                  color={"white"}
                  _hover={{
                    bg: "default",
                  }}
                  onClick={handleUploadCv}
                >
                  {uploadCvbtnText}
                </Button>
              </>
            )}
          </Box>
        </>
      ) : component === "solartraining" ? (
        <>
          <Text mb={5}>
            Having good a knowledge in electricity or electronics is a great
            advantage
          </Text>

          <FormLabel>What is your highest level of education?</FormLabel>
          <Input
            value={qualification.highestQual}
            onChange={(e) => {
              setQualification({
                ...qualification,
                highestQual: e.target.value,
              });
            }}
            mb={5}
            borderColor={"gray"}
          />

          <FormLabel>
            Do you have any knowledge in electricity, electronics or any related
            fields?
          </FormLabel>
          <RadioGroup
            value={qualification.elecKnowledge}
            onChange={(e) => {
              setQualification({ ...qualification, elecKnowledge: e });
            }}
            mb={5}
          >
            <Stack direction="row">
              <Radio borderColor={"gray.400"} value="Yes">
                Yes
              </Radio>
              <Radio borderColor={"gray.400"} value="No">
                No
              </Radio>
            </Stack>
          </RadioGroup>

          <Box
            display={qualification.elecKnowledge != "Yes" ? "none" : "block"}
          >
            <FormLabel>What is your highest qualification obtained?</FormLabel>
            <Input
              value={qualification.highestQual}
              onChange={(e) => {
                setQualification({
                  ...qualification,
                  highestQual: e.target.value,
                });
              }}
              mb={5}
              borderColor={"gray"}
            />
          </Box>

          <HStack>
            <Button onClick={() => handleLocalSave()}>
              Save and continue Later
            </Button>
          </HStack>
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default Qualification;
