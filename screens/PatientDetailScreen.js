import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useState } from "react";
import TopBar from "../components/overview/TopBar";
import BasicInfoBar from "../components/patientDetails/BasicInfoBar";
import MedicalNoteBox from "../components/patientDetails/MedicalNoteBox";
import PatientRecordBox from "../components/patientDetails/PatientRecordBox";
import ContactInfoBox from "../components/patientDetails/ContactInfoBox";
import { useSelector, useDispatch } from "react-redux";
import { getPatients } from "../redux/updater";

const PatientDetailScreen = ({ navigation }) => {
  const [nameModalVisible, setNameModelVisible] = useState(false);
  const editName = () => {
    setNameModelVisible(!nameModalVisible);
  };

  const [notesModalVisible, setNotesModelVisible] = useState(false);
  const editNote = () => {
    setNotesModelVisible(!notesModalVisible);
  };

  const [contactModalVisible, setContactModelVisible] = useState(false);
  const editContact = () => {
    setContactModelVisible(!contactModalVisible);
  };

  const dispatch = useDispatch();

  const selectedPatient = useSelector((state) => state.patient.selectedPatient);

  return (
    <View style={styles.container}>
      <TopBar title={"Patient Details"} />
      <ScrollView>
        <BasicInfoBar
          patient={selectedPatient}
          editable={true}
          nameEdit={nameModalVisible}
          setMethod={editName}
        />
        <MedicalNoteBox
          patient={selectedPatient}
          noteEdit={notesModalVisible}
          setMethod={editNote}
        />
        <PatientRecordBox
          patient={selectedPatient}
          navigation={navigation}
          hasHistory={true}
        />
        <ContactInfoBox
          patient={selectedPatient}
          contactEdit={contactModalVisible}
          setMethod={editContact}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            dispatch(getPatients());
            navigation.goBack();
          }}
        >
          <Text style={styles.submitButtonText}>Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  submitButton: {
    borderRadius: 10,
    backgroundColor: "#12B2B3",
    marginTop: 20,
    width: "80%",
    height: 60,
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

export default PatientDetailScreen;
