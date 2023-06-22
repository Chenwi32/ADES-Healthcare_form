import { Alert, AlertIcon, Box, Button, Flex, FormLabel, HStack, Heading, Input, Radio, RadioGroup, Select, Stack, Text } from "@chakra-ui/react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useEffect } from "react";

const PersonalData = ({
  personalInfo,
  setPersonalInfo,
  validForm,
  formData,
  handleLocalSave
}) => {

  const cityChar = ["Yaounde", "Yaoundé", "*YAOUNDE"];


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

  return (
    <Box>
      <Heading fontFamily={"Andika"} fontSize={"1.5rem"} mb={5}>
        Personal info
      </Heading>
      <Text mb={5}>
        Please provide your name, email address, and phone number.
      </Text>
      <label htmlFor="name">
        <Flex justifyContent={"space-between"}>
          <Text>
            <Text as="span" color="red">
              *
            </Text>{" "}
            Name:
          </Text>
        </Flex>
        <Input
          borderColor={"gray"}
          type="text"
          value={personalInfo?.name}
          onChange={(e) => {
            setPersonalInfo({
              ...personalInfo,
              name: e.target.value,
            });
          }}
          mb={5}
          placeholder="e.g. John Doe"
          id="name"
          name="name"
          maxLength={32}
        />
      </label>
      <FormLabel>Date of birth:</FormLabel>
      <Input
        value={personalInfo.dateOfBirth}
        onChange={(e) => {
          setPersonalInfo({
            ...personalInfo,
            dateOfBirth: e.target.value,
          });
        }}
        type={"date"}
        mb={5}
        borderColor={"gray"}
      />

      <FormLabel>Sex:</FormLabel>
      <Select
        borderColor={"gray"}
        value={personalInfo?.sex}
        onChange={(e) => {
          setPersonalInfo({
            ...personalInfo,
            sex: e.target.value,
          });
        }}
        mb={5}
        placeholder="Select Sex"
      >
        <option value="Afghanistan">Male</option>
        <option value="Aland Islands">Female</option>
        <option value="Albania">Prefer not to disclose</option>
      </Select>

      <Heading fontSize={"1.2rem"} mb={5}>
        Adress
      </Heading>

      <Alert status="info" mb={5}>
        {" "}
        <AlertIcon /> Please provide your current address
      </Alert>
      <label htmlFor="email">
        <Flex justifyContent={"space-between"}>
          <Text>
            <Text as="span" color="red">
              *
            </Text>{" "}
            Email Address:
          </Text>
          {getError(validForm.hasValidEmailAddress)}
        </Flex>
        <Input
          borderColor={!validForm.hasValidEmailAddress ? "red" : "gray"}
          type="email"
          value={personalInfo?.email}
          onChange={(e) => {
            setPersonalInfo({
              ...personalInfo,
              email: e.target.value,
            });
          }}
          mb={5}
          placeholder="e.g. example@gm.com"
          id="email"
          name="email"
        />
      </label>
      <label htmlFor="phoneNumber">
        {" "}
        <div>
          <Flex justifyContent={"space-between"}>
            <Text>
              <Text as="span" color="red">
                *
              </Text>{" "}
              Phone Number:
            </Text>
            {getError(validForm.hasValidPhoneNumber)}
          </Flex>
        </div>
        <PhoneInput
          name="phoneNumber"
          defaultCountry="CM"
          placeholder="e.g +23773767784"
          value={!personalInfo ? "" : personalInfo.phoneNumber}
          onChange={(value) =>
            setPersonalInfo({ ...personalInfo, phoneNumber: value })
          }
        />
      </label>
      <label>Country:</label>
      <Select
        borderColor={"gray"}
        value={personalInfo?.country}
        onChange={(e) => {
          setPersonalInfo({
            ...personalInfo,
            country: e.target.value,
          });
        }}
        mb={5}
        placeholder="Select country"
      >
        <option value="Afghanistan">Afghanistan</option>
        <option value="Aland Islands">Aland Islands</option>
        <option value="Albania">Albania</option>
        <option value="Algeria">Algeria</option>
        <option value="American Samoa">American Samoa</option>
        <option value="Andorra">Andorra</option>
        <option value="Angola">Angola</option>
        <option value="Anguilla">Anguilla</option>
        <option value="Antarctica">Antarctica</option>
        <option value="Antigua and Barbuda">Antigua and Barbuda</option>
        <option value="Argentina">Argentina</option>
        <option value="Armenia">Armenia</option>
        <option value="Aruba">Aruba</option>
        <option value="Australia">Australia</option>
        <option value="Austria">Austria</option>
        <option value="Azerbaijan">Azerbaijan</option>
        <option value="Bahamas">Bahamas</option>
        <option value="Bahrain">Bahrain</option>
        <option value="Bangladesh">Bangladesh</option>
        <option value="Barbados">Barbados</option>
        <option value="Belarus">Belarus</option>
        <option value="Belgium">Belgium</option>
        <option value="Belize">Belize</option>
        <option value="Benin">Benin</option>
        <option value="Bermuda">Bermuda</option>
        <option value="Bhutan">Bhutan</option>
        <option value="Bolivia">Bolivia</option>
        <option value="Bonaire, Sint Eustatius and Saba">
          Bonaire, Sint Eustatius and Saba
        </option>
        <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
        <option value="Botswana">Botswana</option>
        <option value="Bouvet Island">Bouvet Island</option>
        <option value="Brazil">Brazil</option>
        <option value="British Indian Ocean Territory">
          British Indian Ocean Territory
        </option>
        <option value="Brunei Darussalam">Brunei Darussalam</option>
        <option value="Bulgaria">Bulgaria</option>
        <option value="Burkina Faso">Burkina Faso</option>
        <option value="Burundi">Burundi</option>
        <option value="Cambodia">Cambodia</option>
        <option value="Cameroon">Cameroon</option>
        <option value="Canada">Canada</option>
        <option value="Cape Verde">Cape Verde</option>
        <option value="Cayman Islands">Cayman Islands</option>
        <option value="Central African Republic">
          Central African Republic
        </option>
        <option value="Chad">Chad</option>
        <option value="Chile">Chile</option>
        <option value="China">China</option>
        <option value="Christmas Island">Christmas Island</option>
        <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
        <option value="Colombia">Colombia</option>
        <option value="Comoros">Comoros</option>
        <option value="Congo">Congo</option>
        <option value="Congo, Democratic Republic of the Congo">
          Congo, Democratic Republic of the Congo
        </option>
        <option value="CK">Cook Islands</option>
        <option value="CR">Costa Rica</option>
        <option value="CI">Cote D'Ivoire</option>
        <option value="HR">Croatia</option>
        <option value="CU">Cuba</option>
        <option value="CW">Curacao</option>
        <option value="Cyprus">Cyprus</option>
        <option value="Czech Republic">Czech Republic</option>
        <option value="Denmark">Denmark</option>
        <option value="Djibouti">Djibouti</option>
        <option value="Dominica">Dominica</option>
        <option value="Dominican Republic">Dominican Republic</option>
        <option value="Ecuador">Ecuador</option>
        <option value="Egypt">Egypt</option>
        <option value="El Salvador">El Salvador</option>
        <option value="Equatorial Guinea">Equatorial Guinea</option>
        <option value="Eritrea">Eritrea</option>
        <option value="Estonia">Estonia</option>
        <option value="Ethiopia">Ethiopia</option>
        <option value="Falkland Islands (Malvinas)">
          Falkland Islands (Malvinas)
        </option>
        <option value="FO">Faroe Islands</option>
        <option value="FJ">Fiji</option>
        <option value="FI">Finland</option>
        <option value="FR">France</option>
        <option value="GF">French Guiana</option>
        <option value="PF">French Polynesia</option>
        <option value="TF">French Southern Territories</option>
        <option value="Gabon">Gabon</option>
        <option value="Gambia">Gambia</option>
        <option value="Georgia">Georgia</option>
        <option value="Germany">Germany</option>
        <option value="Ghana">Ghana</option>
        <option value="Gibraltar">Gibraltar</option>
        <option value="Greece">Greece</option>
        <option value="Greenland">Greenland</option>
        <option value="Grenada">Grenada</option>
        <option value="Guadeloupe">Guadeloupe</option>
        <option value="Guam">Guam</option>
        <option value="Guatemala">Guatemala</option>
        <option value="Guernsey">Guernsey</option>
        <option value="Guinea">Guinea</option>
        <option value="Guinea-Bissau">Guinea-Bissau</option>
        <option value="Guyana">Guyana</option>
        <option value="Haiti">Haiti</option>
        <option value="Heard Island and Mcdonald Islands">
          Heard Island and Mcdonald Islands
        </option>
        <option value="Holy See (Vatican City State)">
          Holy See (Vatican City State)
        </option>
        <option value="Honduras">Honduras</option>
        <option value="Hong Kong">Hong Kong</option>
        <option value="Hungary">Hungary</option>
        <option value="Iceland">Iceland</option>
        <option value="India">India</option>
        <option value="Indonesia">Indonesia</option>
        <option value="Iran, Islamic Republic of">
          Iran, Islamic Republic of
        </option>
        <option value="Iraq">Iraq</option>
        <option value="IE">Ireland</option>
        <option value="IM">Isle of Man</option>
        <option value="IL">Israel</option>
        <option value="IT">Italy</option>
        <option value="JM">Jamaica</option>
        <option value="JP">Japan</option>
        <option value="JE">Jersey</option>
        <option value="JO">Jordan</option>
        <option value="KZ">Kazakhstan</option>
        <option value="KE">Kenya</option>
        <option value="KI">Kiribati</option>
        <option value="KP">Korea, Democratic People's Republic of</option>
        <option value="KR">Korea, Republic of</option>
        <option value="XK">Kosovo</option>
        <option value="KW">Kuwait</option>
        <option value="KG">Kyrgyzstan</option>
        <option value="LA">Lao People's Democratic Republic</option>
        <option value="LV">Latvia</option>
        <option value="LB">Lebanon</option>
        <option value="LS">Lesotho</option>
        <option value="LR">Liberia</option>
        <option value="LY">Libyan Arab Jamahiriya</option>
        <option value="LI">Liechtenstein</option>
        <option value="LT">Lithuania</option>
        <option value="LU">Luxembourg</option>
        <option value="MO">Macao</option>
        <option value="MK">Macedonia, the Former Yugoslav Republic of</option>
        <option value="MG">Madagascar</option>
        <option value="MW">Malawi</option>
        <option value="MY">Malaysia</option>
        <option value="MV">Maldives</option>
        <option value="ML">Mali</option>
        <option value="MT">Malta</option>
        <option value="MH">Marshall Islands</option>
        <option value="MQ">Martinique</option>
        <option value="MR">Mauritania</option>
        <option value="MU">Mauritius</option>
        <option value="YT">Mayotte</option>
        <option value="MX">Mexico</option>
        <option value="FM">Micronesia, Federated States of</option>
        <option value="MD">Moldova, Republic of</option>
        <option value="MC">Monaco</option>
        <option value="MN">Mongolia</option>
        <option value="ME">Montenegro</option>
        <option value="MS">Montserrat</option>
        <option value="MA">Morocco</option>
        <option value="MZ">Mozambique</option>
        <option value="MM">Myanmar</option>
        <option value="NA">Namibia</option>
        <option value="NR">Nauru</option>
        <option value="NP">Nepal</option>
        <option value="NL">Netherlands</option>
        <option value="AN">Netherlands Antilles</option>
        <option value="New Caledonia">New Caledonia</option>
        <option value="New Zealand">New Zealand</option>
        <option value="Nicaragua">Nicaragua</option>
        <option value="Niger">Niger</option>
        <option value="Nigeria">Nigeria</option>
        <option value="Niue">Niue</option>
        <option value="NF">Norfolk Island</option>
        <option value="MP">Northern Mariana Islands</option>
        <option value="NO">Norway</option>
        <option value="OM">Oman</option>
        <option value="Pakistan">Pakistan</option>
        <option value="PW">Palau</option>
        <option value="PS">Palestinian Territory, Occupied</option>
        <option value="Panama">Panama</option>
        <option value="Papua New Guinea">Papua New Guinea</option>
        <option value="Paraguay">Paraguay</option>
        <option value="Peru">Peru</option>
        <option value="Philippines">Philippines</option>
        <option value="PN">Pitcairn</option>
        <option value="Poland">Poland</option>
        <option value="Portugal">Portugal</option>
        <option value="Puerto Rico">Puerto Rico</option>
        <option value="Qatar">Qatar</option>
        <option value="Reunion">Reunion</option>
        <option value="Romania">Romania</option>
        <option value="RU">Russian Federation</option>
        <option value="RW">Rwanda</option>
        <option value="BL">Saint Barthelemy</option>
        <option value="SH">Saint Helena</option>
        <option value="KN">Saint Kitts and Nevis</option>
        <option value="Saint Lucia">Saint Lucia</option>
        <option value="Saint Martin">Saint Martin</option>
        <option value="Saint Pierre and Miquelon">
          Saint Pierre and Miquelon
        </option>
        <option value="Saint Vincent and the Grenadines">
          Saint Vincent and the Grenadines
        </option>
        <option value="Samoa">Samoa</option>
        <option value="San Marino">San Marino</option>
        <option value="Sao Tome and Principe">Sao Tome and Principe</option>
        <option value="Saudi Arabia">Saudi Arabia</option>
        <option value="Senegal">Senegal</option>
        <option value="Serbia">Serbia</option>
        <option value="Serbia and Montenegro">Serbia and Montenegro</option>
        <option value="Seychelles">Seychelles</option>
        <option value="Sierra Leone">Sierra Leone</option>
        <option value="Singapore">Singapore</option>
        <option value="Sint Maarten">Sint Maarten</option>
        <option value="Slovakia">Slovakia</option>
        <option value="Slovenia">Slovenia</option>
        <option value="Solomon Islands">Solomon Islands</option>
        <option value="Somalia">Somalia</option>
        <option value="South Africa">South Africa</option>
        <option value="South Georgia and the South Sandwich Islands">
          South Georgia and the South Sandwich Islands
        </option>
        <option value="South Sudan">South Sudan</option>
        <option value="Spain">Spain</option>
        <option value="Sri Lanka">Sri Lanka</option>
        <option value="Sudan">Sudan</option>
        <option value="Suriname">Suriname</option>
        <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
        <option value="Swaziland">Swaziland</option>
        <option value="Sweden">Sweden</option>
        <option value="Switzerland">Switzerland</option>
        <option value="Syrian Arab Republic">Syrian Arab Republic</option>
        <option value="Taiwan, Province of China">
          Taiwan, Province of China
        </option>
        <option value="Tajikistan">Tajikistan</option>
        <option value="Tanzania, United Republic of">
          Tanzania, United Republic of
        </option>
        <option value="Thailand">Thailand</option>
        <option value="Timor-Leste">Timor-Leste</option>
        <option value="Togo">Togo</option>
        <option value="Tokelau">Tokelau</option>
        <option value="Tonga">Tonga</option>
        <option value="Trinidad and Tobago">Trinidad and Tobago</option>
        <option value="Tunisia">Tunisia</option>
        <option value="Turkey">Turkey</option>
        <option value="Turkmenistan">Turkmenistan</option>
        <option value="Turks and Caicos Islands">
          Turks and Caicos Islands
        </option>
        <option value="Tuvalu">Tuvalu</option>
        <option value="Uganda">Uganda</option>
        <option value="Ukraine">Ukraine</option>
        <option value="United Arab Emirates">United Arab Emirates</option>
        <option value="United Kingdom">United Kingdom</option>
        <option value="United States">United States</option>
        <option value="United States Minor Outlying Islands">
          United States Minor Outlying Islands
        </option>
        <option value="Uruguay">Uruguay</option>
        <option value="Uzbekistan">Uzbekistan</option>
        <option value="Vanuatu">Vanuatu</option>
        <option value="Venezuela">Venezuela</option>
        <option value="Viet Nam">Viet Nam</option>
        <option value="Virgin Islands, British">Virgin Islands, British</option>
        <option value="Virgin Islands, U.s.">Virgin Islands, U.s.</option>
        <option value="Wallis and Futuna">Wallis and Futuna</option>
        <option value="Western Sahara">Western Sahara</option>
        <option value="Yemen">Yemen</option>
        <option value="Zambia">Zambia</option>
        <option value="Zimbabwe">Zimbabwe</option>
      </Select>
      <label>Province/Region:</label>
      <Input
        borderColor={!validForm.hasValidPhoneNumber ? "red" : "gray"}
        value={personalInfo?.province}
        onChange={(e) => {
          setPersonalInfo({
            ...personalInfo,
            province: e.target.value,
          });
        }}
        mb={5}
        placeholder="e.g North West"
      />
      <label>City/Town:</label>
      <Input
        borderColor={!validForm.hasValidPhoneNumber ? "red" : "gray"}
        mb={5}
        value={personalInfo?.city}
        onChange={(e) => {
          setPersonalInfo({
            ...personalInfo,
            city: e.target.value.toUpperCase(),
          });
        }}
        placeholder="e.g Douala"
      />

      {
        <Box
          display={
            personalInfo.city != "YAOUNDE" && personalInfo.city != "YAOUNDÉ" && personalInfo.city != ''
              ? "block"
              : "none"
          }
        >
          <FormLabel>
            Could you move to Yaounde Cameroon for the training?
          </FormLabel>
          <RadioGroup
            value={personalInfo.move}
            onChange={(e) => {
              setPersonalInfo({ ...qualification, move: e });
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
        </Box>
      }
    </Box>
  );
};

export default PersonalData;
