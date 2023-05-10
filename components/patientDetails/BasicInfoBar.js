import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import useInfoForm from "../../utils/patientInfoForm";
import { patchPatientInfo } from "../../services/services";
import { useDispatch } from "react-redux";
import { getPatientByID } from "../../redux/updater";

const getDate = (dateString) => {
  return String(new Date(dateString).toLocaleDateString());
};

const getGenderIcon = (gender) => {
  if (gender == "Female") {
    return require("../../assets/icons/female.png");
  } else {
    return require("../../assets/icons/male.png");
  }
};

const BasicInfoBar = ({ editable, nameEdit, setMethod, patient }) => {
  const { values, handleChange, resetValue } = useInfoForm();

  return (
    <View style={styles.container}>
      <BasicInfoBarModal
        visible={nameEdit}
        setMethod={setMethod}
        handleChange={handleChange}
        resetValue={resetValue}
        values={values}
        patient={patient}
      />
      <View style={styles.leftBox}>
        <View style={styles.leftTextBox}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={styles.leftBoxText}
            >{`Name: ${patient.firstName} ${patient.lastName}`}</Text>
            {editable && (
              <TouchableOpacity
                style={{
                  width: 25,
                  height: 25,
                  marginRight: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  setMethod();
                }}
              >
                <Image
                  style={{ width: 16, height: 16 }}
                  source={require("../../assets/icons/pencil-alt.png")}
                />
              </TouchableOpacity>
            )}
          </View>

          <Text style={styles.leftBoxText}>{`Birth: ${getDate(
            patient.dateOfBirth
          )}`}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.leftBoxText}>Blood Type : O</Text>
            <Image
              style={{ marginRight: 10 }}
              source={getGenderIcon(patient.gender)}
            />
          </View>

          <Text style={styles.leftBoxText}>{`Doctor: ${patient.doctor}`}</Text>
        </View>
      </View>
      <View style={styles.imageBox}>
        <Image style={styles.image} source={{ uri: patient.photoUrl }} />
      </View>
    </View>
  );
};

const BasicInfoBarModal = ({
  visible,
  setMethod,
  handleChange,
  resetValue,
  values,
  patient,
}) => {

  const dispatch = useDispatch();

  const updatePatientInfo = async (Payload) => {
    if (Object.keys(Payload).length > 0) {
      const response = await patchPatientInfo(Payload, patient);
      if (response.status === 200) {
        dispatch(getPatientByID(patient.id));
        setMethod();
      }
    }
  };

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
                resetValue();
                setMethod();
              }}
            >
              <Image source={require("../../assets/icons/remove.png")} />
            </TouchableOpacity>
          </View>
          <Text style={modalStyle.modalTitle}>Edit Infos</Text>
          <View style={modalStyle.modalBody}>
            <View style={modalStyle.inputItem}>
              <Text>First Name</Text>
              <View style={modalStyle.roundedOutline}>
                <TextInput
                  autoCorrect={false}
                  style={modalStyle.input}
                  onChangeText={(text) => handleChange("firstName", text)}
                />
              </View>
            </View>
            <View style={modalStyle.inputItem}>
              <Text>Last Name</Text>
              <View style={modalStyle.roundedOutline}>
                <TextInput
                  autoCorrect={false}
                  style={modalStyle.input}
                  onChangeText={(text) => handleChange("lastName", text)}
                />
              </View>
            </View>
            <View style={modalStyle.inputItem}>
              <Text>Responsible Doctor</Text>
              <View style={modalStyle.roundedOutline}>
                <TextInput autoCorrect={false} style={modalStyle.input} 
                onChangeText={(text) => handleChange("doctor", text)}
                />
              </View>
            </View>
            <TouchableOpacity
              style={modalStyle.submitButton}
              onPress={() => {
                updatePatientInfo(values);
                resetValue();
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

const styles = StyleSheet.create({
  container: {
    margin: 20,
    marginHorizontal: 25,
    height: 100,
    flexDirection: "row",
  },
  leftBox: {
    width: "55%",
    marginRight: 15,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 7,
  },
  leftTextBox: {
    height: "100%",
    justifyContent: "space-evenly",
  },
  leftBoxText: {
    fontSize: 12,
    marginLeft: 10,
  },
  imageBox: {
    width: "50%",
    //backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "100%",
    borderRadius: 12,
    aspectRatio: 1,
  },
});

const modalStyle = StyleSheet.create({
  centeredView: {
    backgroundColor: "rgba(0,0,0,0.5)",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    height: 400,
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
});

export default BasicInfoBar;
