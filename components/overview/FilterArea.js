import {
  View,
  Text,
  Modal,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import CustomPicker from "./CustomPicker";
import { Divider } from "react-native-elements";
import RadioButton from "./RadioButton";
import { useDispatch } from "react-redux";
import { getPatientTestReadingById } from "../../services/services";
import { filterPatientList } from "../../redux/updater";

const notifyMessage = (message) =>
    Alert.alert("Invalid Filter Value", `${message}`, [{ text: "Noted" }]);

const convertToNumber = (text, isPressure, pressureType) => {
  if (isPressure) {
    var pressure = text.split(",");
    if (pressureType === "lower") {
      pressure[0] = pressure[0].replace(/[&\\\#, +()$~%'"*?<>{}]/g, "");
      // console.log("response value", pressure[0]);
      return Number(pressure[0]);
    } else {
      pressure[1] = pressure[1].replace(/[&\\\#, +()$~%'"*?<>{}]/g, "");
      // console.log("response value", pressure[1]);
      return Number(pressure[1]);
    }
  } else {
    text = text.replace(/[&\\\#, +()$~%'"*?<>{}]/g, "");
    return Number(text);
  }
};

const checkEqual = (val1, val2) => {
  // console.log("checkEqual", val1, val2);
  return val1 == val2;
};

const checkGreater = (val1, val2) => {
  // console.log("checkGreater", val1, val2);
  return val2 > val1;
};

const checkLower = (val1, val2) => {
  // console.log("checkLower", val1, val2);
  return val2 < val1;
};

const FilterArea = ({ visible, closeMethod, patientList ,setFilterState}) => {
  const [gender, setGender] = useState("");
  const [lowerPressure, setLowerPressure] = useState("");
  const [lPickerState, setLPickerState] = useState("Equal");
  const [upperPressure, setUpperPressure] = useState("");
  const [uPickerState, setUPickerState] = useState("Equal");
  const [bloodOxygenLevel, setBloodOxygenLevel] = useState("");
  const [bPickerState, setBPickerState] = useState("Equal");
  const [RespiratoryRate, setRespiratoryRate] = useState("");
  const [rPickerState, setRPickerState] = useState("Equal");
  const [HeartBeatRate, setHeartBeatRate] = useState("");
  const [hPickerState, setHPickerState] = useState("Equal");

  const dispatch = useDispatch();

  const resetState = () => {
    setGender("");
    setLowerPressure("");
    setLPickerState("Equal");
    setUpperPressure("");
    setUPickerState("Equal");
    setBloodOxygenLevel("");
    setBPickerState("Equal");
    setRespiratoryRate("");
    setRPickerState("Equal");
    setHeartBeatRate("");
    setHPickerState("Equal");
  }

  const setCurrentGender = (_gender) => {
    setGender(_gender);
  };

  const genderList = ["Male", "Female", "Both"];
  // loop through filterList and get the target test reading
  // if the target test reading is not null, then add the patient to the filtered list
  async function testCheck(sourceList, Type) {
    var filteredList = [];

    for (let index = 0; index < sourceList.length; index++) {
      var response = await getPatientTestReadingById(
        sourceList[index],
        getTestType(sourceList[index], Type)
      );

      switch (Type) {
        case "Lower Blood Pressure":
          if (response != "No record") {
            if (lPickerState == "Equal") {
              if (
                checkEqual(
                  lowerPressure,
                  convertToNumber(response, true, "lower")
                )
              ) {
                filteredList.push(sourceList[index]);
              }
            } else if (lPickerState == "Greater Than") {
              if (
                checkGreater(
                  lowerPressure,
                  convertToNumber(response, true, "lower")
                )
              ) {
                filteredList.push(sourceList[index]);
              }
            } else if (lPickerState == "Less Than") {
              if (
                checkLower(
                  lowerPressure,
                  convertToNumber(response, true, "lower")
                )
              ) {
                filteredList.push(sourceList[index]);
              }
            }
          }
          break;
        case "Upper Blood Pressure":
          if (response != "No record") {
            if (uPickerState == "Equal") {
              if (
                checkEqual(
                  upperPressure,
                  convertToNumber(response, true, "upper")
                )
              ) {
                filteredList.push(sourceList[index]);
              }
            } else if (uPickerState == "Greater Than") {
              if (
                checkGreater(
                  upperPressure,
                  convertToNumber(response, true, "upper")
                )
              ) {
                filteredList.push(sourceList[index]);
              }
            } else if (uPickerState == "Less Than") {
              if (
                checkLower(
                  upperPressure,
                  convertToNumber(response, true, "upper")
                )
              ) {
                filteredList.push(sourceList[index]);
              }
            }
          }
          break;
        case "Blood Oxygen Level":
          if (response != "No record") {
            if (bPickerState == "Equal") {
              if (checkEqual(bloodOxygenLevel, convertToNumber(response))) {
                filteredList.push(sourceList[index]);
              }
            } else if (bPickerState == "Greater Than") {
              if (checkGreater(bloodOxygenLevel, convertToNumber(response))) {
                filteredList.push(sourceList[index]);
              }
            } else if (bPickerState == "Less Than") {
              if (checkLower(bloodOxygenLevel, convertToNumber(response))) {
                filteredList.push(sourceList[index]);
              }
            }
          }
          break;
        case "Respiratory Rate":
          if (response != "No record") {
            if (rPickerState == "Equal") {
              if (checkEqual(RespiratoryRate, convertToNumber(response))) {
                filteredList.push(sourceList[index]);
              }
            } else if (rPickerState == "Greater Than") {
              if (checkGreater(RespiratoryRate, convertToNumber(response))) {
                filteredList.push(sourceList[index]);
              }
            } else if (rPickerState == "Less Than") {
              if (checkLower(RespiratoryRate, convertToNumber(response))) {
                filteredList.push(sourceList[index]);
              }
            }
          }
          break;
        case "Heart Beat Rate":
          if (response != "No record") {
            if (hPickerState == "Equal") {
              if (checkEqual(HeartBeatRate, convertToNumber(response))) {
                filteredList.push(sourceList[index]);
              }
            } else if (hPickerState == "Greater Than") {
              if (checkGreater(HeartBeatRate, convertToNumber(response))) {
                filteredList.push(sourceList[index]);
              }
            } else if (hPickerState == "Less Than") {
              if (checkLower(HeartBeatRate, convertToNumber(response))) {
                filteredList.push(sourceList[index]);
              }
            }
          }
          break;
      }
    }
    return filteredList;
  }

  const getTestType = (patient, type) => {
    switch (type) {
      case "Lower Blood Pressure": 
      case "Upper Blood Pressure":
        return patient.latestRecord.BLOOD_PRESSURE;
      case "Blood Oxygen Level":
        return patient.latestRecord.BLOOD_OXYGEN_LEVEL;
      case "Respiratory Rate":
        return patient.latestRecord.RESPIRATORY_RATE;
      case "Heart Beat Rate":
        return patient.latestRecord.HEARTBEAT_RATE;
    }
  };

  const filterPatient = async (patients) => {

     // Filter gender
    // Todo filter validation to check empty input
    if(gender == ""){
      notifyMessage("Please select gender");
      return
    }
    var filteredPatients = patients.filter((patient) => patient.gender.toUpperCase()  === gender.toUpperCase()  || gender == "Both");

    if(lowerPressure == "" && upperPressure == "" && bloodOxygenLevel == "" && RespiratoryRate == "" && HeartBeatRate == ""){
      notifyMessage("Please enter at least one test reading");
      return
    }

    // Filter without latest record
      filteredPatients = filteredPatients.filter((patient) =>
      patient.hasOwnProperty("latestRecord")
    );

    // Filter Blood Pressure
    if (lowerPressure !== "") {
      filteredPatients = filteredPatients.filter((patient) =>
        patient.latestRecord.hasOwnProperty("BLOOD_PRESSURE")
      );

      // Filter by lower pressure
      filteredPatients = await testCheck(filteredPatients, "Lower Blood Pressure");
    }

    if (upperPressure !== "") {
      filteredPatients = filteredPatients.filter((patient) =>
        patient.latestRecord.hasOwnProperty("BLOOD_PRESSURE")
      );

      filteredPatients = await testCheck(filteredPatients, "Upper Blood Pressure");
    }

    // Filter Oxygen Level
    if (bloodOxygenLevel !== "") {
      filteredPatients = filteredPatients.filter((patient) =>
        patient.latestRecord.hasOwnProperty("BLOOD_OXYGEN_LEVEL")
      );

      filteredPatients = await testCheck(
        filteredPatients,
        "Blood Oxygen Level"
      );
    }
    // Filter Respiratory Rate
    if (RespiratoryRate !== "") {
      filteredPatients = filteredPatients.filter((patient) =>
        patient.latestRecord.hasOwnProperty("RESPIRATORY_RATE")
      );

      filteredPatients = await testCheck(filteredPatients, "Respiratory Rate");
    }
    // Filter Heart Beat Rate
    if (HeartBeatRate !== "") {
      filteredPatients = filteredPatients.filter((patient) =>
        patient.latestRecord.hasOwnProperty("HEARTBEAT_RATE")
      );

      filteredPatients = await testCheck(filteredPatients, "Heart Beat Rate");
    }
   
    // filteredPatients.map ((patient) => {
    //   console.log(patient.firstName);
    // })
    dispatch(filterPatientList(filteredPatients));
    setFilterState(true);
  };

  return (
    <Modal visible={visible} transparent={true} animationType={"slide"}>
      <View style={styles.container}>
        <View style={styles.filterBox}>
          <View style={styles.contentBox}>
            <View style={styles.topBar}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "500",
                  color: "#1E1F20",
                  marginBottom: 10,
                }}
              >
                Filter by
              </Text>
              <TouchableOpacity
                onPress={() => {
                  closeMethod();
                }}
              >
                <Image
                  source={require("../../assets/icons/window-close.png")}
                />
              </TouchableOpacity>
            </View>
            <FilterItem
              itemName={"Lower Blood Pressure"}
              changeCategory={true}
              setCategory={setLPickerState}
              setText={setLowerPressure}
            />
            <FilterItem
              itemName={"Upper Blood Pressure"}
              changeCategory={true}
              setCategory={setUPickerState}
              setText={setUpperPressure}
            />
            <FilterItem
              itemName={"Blood Oxygen Level"}
              changeCategory={true}
              setCategory={setBPickerState}
              setText={setBloodOxygenLevel}
            />
            <FilterItem
              itemName={"Respiratory Rate"}
              changeCategory={true}
              setCategory={setRPickerState}
              setText={setRespiratoryRate}
            />
            <FilterItem
              itemName={"Heart Beat Rate"}
              changeCategory={true}
              setCategory={setHPickerState}
              setText={setHeartBeatRate}
            />
            <View style={styles.radioGroup}>
              <Text>Gender :</Text>
              <RadioButton
                inputGender={gender}
                setMethod={setCurrentGender}
                optionList={genderList}
              />
            </View>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => {
                filterPatient(patientList);
                //testCheck(patientList, "Blood Pressure");
                closeMethod();
                resetState();
              }}
            >
              <Text style={styles.submitButtonText}>Filter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const FilterItem = ({ itemName, setCategory, changeCategory, setText }) => (
  <View style={{ marginBottom: 10 }}>
    <Text style={styles.filterItemText}>{itemName}</Text>
    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
      <View style={styles.rightRoundedOutline}>
        <CustomPicker
          category={["Equal", "Greater Than", "Less Than"]}
          editable={true}
          setCategory={setCategory}
          changeCategory={changeCategory}
        />
      </View>
      <View style={styles.leftRoundedOutline}>
        <TextInput
          style={{ textAlign: "center", width: "100%" }}
          keyboardType="numeric"
          onChangeText={(text) => setText(text)}
        />
      </View>
    </View>
  </View>
);

const placeholder = {
  label: "Select Condition",
  value: null,
  color: "#9EA0A4",
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-end",
  },
  filterBox: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#fff",
    height: "65%",
    width: "100%",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  handleImage: {
    alignSelf: "center",
    marginTop: 10,
  },
  contentBox: {
    margin: 30,
  },
  rightRoundedOutline: {
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#DCDCDC",
    width: "55%",
    height: 30,
    marginRight: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  leftRoundedOutline: {
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#DCDCDC",
    width: "40%",
    height: 30,
    marginRight: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  filterItemText: {
    fontSize: 10,
    color: "#9393AA",
  },
  pickerModal: {
    width: 20,
    height: 20,
    margin: 500,
    backgroundColor: "red",
  },
  radioGroup: {
    marginTop: 10,
    flexDirection: "row",
  },
  submitButton: {
    borderRadius: 10,
    backgroundColor: "#12B2B3",
    marginTop: 20,
    alignSelf: "center",
    width: "100%",
    height: "12%",
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default FilterArea;
