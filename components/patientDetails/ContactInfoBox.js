import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
} from "react-native";
import React, { useEffect } from "react";
import useInfoForm from "../../utils/patientInfoForm";
import { patchPatientInfo } from "../../services/services";
import { useDispatch } from "react-redux";
import { getPatientByID } from "../../redux/updater";

const ContactInfoBox = ({ contactEdit, setMethod, patient }) => {
  const { values, handleChange, resetValue } = useInfoForm();

  return (
    <View style={styles.container}>
      <ContactBoxModal
        visible={contactEdit}
        setMethod={setMethod}
        handleChange={handleChange}
        resetValue={resetValue}
        values={values}
        patient={patient}
      />
      <View style={styles.textBox}>
        <View style={styles.splitBox}>
          <Text style={[styles.text, styles.subTitle]}>Address:</Text>
          <Text style={styles.text}>{patient.address}</Text>
          <View style={styles.iconBox}>
            <TouchableOpacity
              style={{
                width: 35,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                setMethod();
              }}
            >
              <Image
                style={styles.icon}
                source={require("../../assets/icons/pencil-alt.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.splitBox}>
          <Text style={[styles.text, styles.subTitle]}>Postal Code :</Text>
          <Text style={styles.text}>{patient.postalCode}</Text>
          <View />
        </View>
        <View style={styles.splitBox}>
          <Text style={[styles.text, styles.subTitle]}>Phone :</Text>
          <Text style={styles.text}>{patient.phoneNumber}</Text>
          <View />
        </View>
      </View>
    </View>
  );
};

const ContactBoxModal = ({
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
          <Text style={modalStyle.modalTitle}>Edit Contact</Text>
          <View style={modalStyle.modalBody}>
            <View style={modalStyle.inputItem}>
              <Text>Address</Text>
              <View style={modalStyle.roundedOutline}>
                <TextInput
                  autoCorrect={false}
                  style={modalStyle.input}
                  onChangeText={(text) => handleChange("address", text)}
                />
              </View>
            </View>
            <View style={modalStyle.inputItem}>
              <Text>Postal Code</Text>
              <View style={modalStyle.roundedOutline}>
                <TextInput
                  autoCorrect={false}
                  style={modalStyle.input}
                  onChangeText={(text) => handleChange("postalCode", text)}
                />
              </View>
            </View>
            <View style={modalStyle.inputItem}>
              <Text>Phone</Text>
              <View style={modalStyle.roundedOutline}>
                <TextInput
                  autoCorrect={false}
                  style={modalStyle.input}
                  onChangeText={(text) => handleChange("phoneNumber", text)}
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
    marginHorizontal: 25,
    borderRadius: 10,
    height: Dimensions.get("window").height * 0.15,
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
    flexDirection: "column",
    marginHorizontal: 10,
    height: "100%",
    justifyContent: "space-around",
  },
  splitBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subTitle: {},
  resultText: {
    textAlign: "left",
  },
  icon: {
    width: 20,
    height: 20,
  },
  text: {
    fontSize: 13,
    maxWidth: "50%",
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

export default ContactInfoBox;
