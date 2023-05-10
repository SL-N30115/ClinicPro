import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import RadioButton from "../overview/RadioButton";
import SwitchType from "./SwitchType";

const InfoForm = ({ handleChange, changeDate }) => {
  const [gender, setGender] = useState("");
  const setCurrentGender = (_gender) => {
    setGender(_gender);
    handleChange("gender",_gender)
  };

  const [isDisabled, setIsDisable] = useState(false);
  const [isAllergies, setIsAllergies] = useState(false);

  const disableToggleSwitch = () => {
    handleChange("disabled",!isDisabled)
    setIsDisable((previousvalue) => !previousvalue); 
  };

  const allergiesToggleSwitch = () => {
    handleChange("medicalAllergies",!isAllergies)
    setIsAllergies((previousvalue) => !previousvalue); 
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.inputItem}>
          <Text>First Name</Text>
          <View style={styles.roundedOutline}>
            <TextInput
              onChangeText={(text) => {
                handleChange("firstName", text);
              }}
              autoCorrect={false}
              style={styles.input}
            />
          </View>
        </View>
        <View style={styles.inputItem}>
          <Text>Last Name</Text>
          <View style={styles.roundedOutline}>
            <TextInput
              onChangeText={(text) => {
                handleChange("lastName", text);
              }}
              style={styles.input}
            />
          </View>
        </View>
        <View style={styles.inputItem}>
          <Text>ID Number</Text>
          <View style={styles.roundedOutline}>
            <TextInput
              onChangeText={(text) => {
                handleChange("idCardNumber", text);
              }}
              style={styles.input}
            />
          </View>
        </View>
        <View style={styles.inputItem}>
          <Text>Birth</Text>
          <View style={styles.splitBox}>
            <View style={[styles.roundedOutline, styles.birthInputField]}>
              <TextInput
                autoCorrect={false}
                keyboardType="numeric"
                maxLength={4}
                placeholder="YYYY"
                style={styles.input}
                onChangeText={(text) => {
                  changeDate("year", text);
                  // handleChange("dateOfBirth", date.month + "-" + date.day + "-" + date.year);
                }}
              />
            </View>
            <View style={[styles.roundedOutline, styles.birthInputField]}>
              <TextInput
                autoCorrect={false}
                keyboardType="numeric"
                maxLength={2}
                placeholder="MM"
                style={styles.input}
                onChangeText={(text) => {
                  changeDate("month", text);
                }}
              />
            </View>
            <View style={[styles.roundedOutline, styles.birthInputField]}>
              <TextInput
                keyboardType="numeric"
                maxLength={2}
                placeholder="DD"
                style={styles.input}
                onChangeText={(text) => {
                  changeDate("day", text);
                }}
              />
            </View>
          </View>
        </View>
        <View style={styles.inputItem}>
          <Text>Address</Text>
          <View style={styles.roundedOutline}>
            <TextInput
              onChangeText={(text) => {
                handleChange("address", text);
              }}
              style={styles.input}
            />
          </View>
        </View>
        <View style={styles.splitBox}>
          <View style={[styles.inputItem, styles.phoneInputField]}>
            <Text>Phone</Text>
            <View style={styles.roundedOutline}>
              <TextInput
                onChangeText={(text) => {
                  handleChange("phoneNumber", text);
                }}
                autoCorrect={false}
                keyboardType="numeric"
                maxLength={10}
                style={styles.input}
              />
            </View>
          </View>
          <View style={[styles.inputItem, styles.phoneInputField]}>
            <Text>Postal Code</Text>
            <View style={styles.roundedOutline}>
              <TextInput
                onChangeText={(text) => {
                  handleChange("postalCode", text);
                }}
                TextInput
                autoCorrect={false}
                maxLength={6}
                style={styles.input}
              />
            </View>
          </View>
        </View>
        <View style={styles.splitBox}>
          <View style={[styles.inputItem, styles.phoneInputField]}>
            <Text>Height</Text>
            <View style={styles.roundedOutline}>
              <TextInput
                onChangeText={(text) => {
                  handleChange("height", text);
                }}
                autoCorrect={false}
                keyboardType="numeric"
                maxLength={10}
                style={styles.input}
              />
            </View>
          </View>
          <View style={[styles.inputItem, styles.phoneInputField]}>
            <Text>Weight</Text>
            <View style={styles.roundedOutline}>
              <TextInput
                onChangeText={(text) => {
                  handleChange("weight", text);
                }}
                autoCorrect={false}
                maxLength={6}
                style={styles.input}
              />
            </View>
          </View>
        </View>
        <View style={styles.inputItem}>
          <Text>Diseases</Text>
          <View style={styles.roundedOutline}>
            <TextInput
              onChangeText={(text) => {
                handleChange("medicalNotes", text);
              }}
              style={styles.input}
            />
          </View>
        </View>
        <View style={[styles.inputItem, styles.radioGroup]}>
          <RadioButton
            inputGender={gender}
            setMethod={setCurrentGender}
            optionList={genderList}
          />
        </View>
        <View style={styles.inputItem}>
          <SwitchType
            value={isDisabled}
            setMethod={disableToggleSwitch}
            title={"Disabled?"}
          />
        </View>
        <View style={styles.inputItem}>
          <SwitchType
            value={isAllergies}
            setMethod={allergiesToggleSwitch}
            title={"Medical Allergies?"}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const genderList = ["Male", "Female"];

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    margin: 20,
    marginBottom: 0,
    paddingBottom: 80,
  },
  inputItem: {
    marginBottom: 10,
  },
  roundedOutline: {
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#DCDCDC",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    paddingHorizontal: 10,
    width: "100%",
    height: "100%",
  },
  splitBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  birthInputField: {
    width: "30%",
  },
  phoneInputField: {
    width: "45%",
  },
  radioGroup: {
    height: 45,
  },
});

export default InfoForm;
