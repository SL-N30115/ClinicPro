import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
  TextInput,
} from "react-native";
import React, { useEffect } from "react";
import useInfoForm from "../../utils/patientInfoForm";
import { patchPatientInfo } from "../../services/services";
import { useDispatch } from "react-redux";
import { getPatientByID } from "../../redux/updater";

const MedicalNoteBox = ({ noteEdit, setMethod, patient }) => {
  const { values, handleChange, resetValue } = useInfoForm();
  return (
    <View style={styles.container}>
      <MedicalNoteModal
        visible={noteEdit}
        setMethod={setMethod}
        handleChange={handleChange}
        resetValue={resetValue}
        values={values}
        patient={patient}
      />
      <View style={styles.textBox}>
        <Text>Medical Notes</Text>
        <TouchableOpacity
          style={{
            width: 25,
            height: 25,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            setMethod();
          }}
        >
          <Image
            style={{ width: 20, height: 20 }}
            source={require("../../assets/icons/pencil-alt.png")}
          />
        </TouchableOpacity>
      </View>
      <Text style={{ margin: 10 }}>{patient.medicalNotes}</Text>
    </View>
  );
};

const MedicalNoteModal = ({
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
          <Text style={modalStyle.modalTitle}>Edit Notes</Text>
          <View style={modalStyle.modalBody}>
            <View style={modalStyle.inputItem}>
              <View style={modalStyle.roundedOutline}>
                <TextInput
                  autoCorrect={false}
                  style={modalStyle.input}
                  onChangeText={(text) => handleChange("medicalNotes", text)}
                >
                  {patient.medicalNotes && patient.medicalNotes}
                </TextInput>
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
    marginHorizontal: 25,
    borderRadius: 10,
    height: Dimensions.get("window").height * 0.17,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 7,
  },
  textBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    margin: 10,
    marginBottom: 0,
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
    height: 200,
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

export default MedicalNoteBox;
