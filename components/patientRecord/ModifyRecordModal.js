import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import CustomPicker from "../overview/CustomPicker";
import { Test_Category } from "../../data/TestCategoryEnum";
import useTestForm from "../../utils/patientTestState";
import { patchPatientLatestRecord, patchPatientTest, postNewPatientTest } from "../../services/services";
import { useDispatch, useSelector } from "react-redux";
import { getPatientValidTests, getPatientByID } from "../../redux/updater";
var lowerInput;
var upperInput;

const multipleInput = (recordType, handleChange) => {
  if (recordType === Test_Category.Blood_Pressure) {
    return (
      <View style={modalStyle.inputItem}>
        <View style={modalStyle.splitBox}>
          <View style={[modalStyle.roundedOutline, modalStyle.bloodPressure]}>
            <TextInput
              autoCorrect={false}
              style={modalStyle.input}
              placeholder={"Lower"}
              onChangeText={(value) => {
                lowerInput = value;
                handleChange("readings", `${lowerInput},${upperInput}`);
              }}
            />
          </View>
          <View style={[modalStyle.roundedOutline, modalStyle.bloodPressure]}>
            <TextInput
              autoCorrect={false}
              style={modalStyle.input}
              placeholder={"Upper"}
              onChangeText={(value) => {
                upperInput = value;
                handleChange("readings", `${lowerInput},${upperInput}`);
              }}
            />
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={modalStyle.inputItem}>
        <View style={modalStyle.roundedOutline}>
          <TextInput
            autoCorrect={false}
            style={modalStyle.input}
            onChangeText={(value) => {
              handleChange("readings", value);
            }}
          />
        </View>
      </View>
    );
  }
};

const ModifyRecordModal = ({
  visible,
  setMethod,
  action,
  patient,
  values,
  handleChange,
}) => {
  // const { values, handleChange } = useTestForm();

  const selectedTest = useSelector((state) => state.patient.selectedTest);

  const notifyMessage = (message) =>
    Alert.alert("Save Failed", `${message}`, [{ text: "Noted" }]);

  const dispatch = useDispatch();
  const addPatientTest = async () => {
    const response = await postNewPatientTest(values);
    if (response.status === 200) {
      await patchPatientLatestRecord(patient, response.data.data.id, values.category);
      dispatch(getPatientByID(patient.id));
      dispatch(getPatientValidTests(patient.id));
      setMethod();
    } else {
      notifyMessage(response.response.data.message);
    }
  };

  const editPatientTest = async () => {
    const response = await patchPatientTest(values);
    if (response.status === 200) {
      dispatch(getPatientValidTests(patient.id));
      setMethod();
    } else {
      notifyMessage(response.response.data.message);
    }
  };

  const checkTextInput = () => {
    if (values.readings === undefined || values.readings === "") {
      alert("Please enter a value");
      return;
    }
  };

  useEffect(() => {
    // console.log(values);
    // console.log(selectedTest);
    handleChange("readings", "");
  }, [values.category]);

  useEffect(() => {
    handleChange("category", Test_Category.Blood_Pressure);
  }, []);

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={modalStyle.centeredView}>
        <View style={modalStyle.modalView}>
          <View style={modalStyle.modelHeader}>
            <TouchableOpacity
              style={{
                width: 35,
                height: 35,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                setMethod();
              }}
            >
              <Image source={require("../../assets/icons/remove.png")} />
            </TouchableOpacity>
          </View>
          <Text style={modalStyle.modalTitle}>
            {action === "Add" ? "Add Record" : "Edit Record"}
          </Text>
          <View style={modalStyle.modalBody}>
            <View style={modalStyle.pickerContainer}>
              <CustomPicker
                category={Object.values(Test_Category)}
                editable={action === "Add"}
                formData={values}
                handleChange={handleChange}
                passData={true}
              />
            </View>
            {multipleInput(values.category, handleChange)}
            <TouchableOpacity
              style={modalStyle.submitButton}
              onPress={() => {
                // To do: check text input is correct
                if (action === "Add") {
                  // To do : add nurse name
                  delete values.id;
                  values.nurseName = "Steven";
                  values.patientId = patient.id;
                  addPatientTest();
                } else {
                  values.patientId = patient.id;
                  values.id = selectedTest.id;
                  editPatientTest();
                }
              }}
            >
              <Text style={modalStyle.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const modalStyle = StyleSheet.create({
  centeredView: {
    backgroundColor: "rgba(0,0,0,0.5)",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    height: 280,
    width: "85%",
    backgroundColor: "white",
    borderRadius: 20,
  },
  modelHeader: {
    marginRight: 10,
    marginTop: 5,
    alignSelf: "flex-end",
  },
  modalTitle: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "700",
    color: "#35364F",
  },
  modalBody: {
    margin: 20,
    marginBottom: 0,
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
    textAlign: "center",
  },
  submitButton: {
    borderRadius: 10,
    backgroundColor: "#12B2B3",
    marginTop: 20,
    width: "100%",
    height: 50,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  splitBox: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  bloodPressure: {
    width: "45%",
  },
  pickerContainer: {
    width: "100%",
    height: "10%",
    alignSelf: "center",
    marginBottom: 20,
  },
});

export default ModifyRecordModal;
