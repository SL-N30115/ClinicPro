import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getPatientTestReadingById } from "../../services/services";

const PatientRecordBox = ({
  hasHistory,
  defineAction,
  setMethod,
  navigation,
  isEdit,
  patient,
}) => {
  useEffect(() => {
    getTestReading();
  }, [patient]);

  const getTestReading = async () => {
    if (patient.hasOwnProperty("latestRecord")) {
      if (patient.latestRecord.hasOwnProperty("BLOOD_PRESSURE")) {
        const response = await getPatientTestReadingById(
          patient,
          patient.latestRecord.BLOOD_PRESSURE
        );
        setBloodPressureValue(response);
      }
      if (patient.latestRecord.hasOwnProperty("BLOOD_OXYGEN_LEVEL")) {
        const oResponse = await getPatientTestReadingById(
          patient,
          patient.latestRecord.BLOOD_OXYGEN_LEVEL
        );
        setOxygenLevelValue(oResponse);
      }

      if (patient.latestRecord.hasOwnProperty("RESPIRATORY_RATE")) {
        const rResponse = await getPatientTestReadingById(
          patient,
          patient.latestRecord.RESPIRATORY_RATE
        );
        setRespiratoryRateValue(rResponse);
      }

      if (patient.latestRecord.hasOwnProperty("HEARTBEAT_RATE")) {
        const hResponse = await getPatientTestReadingById(
          patient,
          patient.latestRecord.HEARTBEAT_RATE
        );
        setHeartBeatRateValue(hResponse);
      }
    }
  };

  const [bloodPressure, setBloodPressureValue] = useState("No Record");
  const [oxygenLevel, setOxygenLevelValue] = useState("No Record");
  const [respiratoryRate, setRespiratoryRateValue] = useState("No Record");
  const [heartBeatRate, setHeartBeatRateValue] = useState("No Record");

  const showHistoryButton = () => {
    if (hasHistory === true) {
      return (
        <TouchableOpacity
          style={{
            width: 35,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            navigation.push("PatientRecordScreen");
          }}
        >
          <Image
            style={styles.icon}
            source={require("../../assets/icons/list-alt.png")}
          />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity>
          <Image style={styles.icon} />
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          if (isEdit) {
            setMethod();
            defineAction("Edit");
          }
        }}
      >
        <View style={styles.textBox}>
          <View style={styles.splitBox}>
            <Text style={[styles.text, styles.subTitle]}>Blood Pressure (X/Y mmHg):</Text>
            <Text style={styles.text}>{bloodPressure}</Text>
            <View style={styles.iconBox}>
              {showHistoryButton()}
              {/* <TouchableOpacity>
              <Image
                style={styles.icon}
                source={require("../../assets/icons/plus_record.png")}
              />
            </TouchableOpacity> */}
            </View>
          </View>
          <View style={styles.splitBox}>
            <Text style={[styles.text, styles.subTitle]}>
              Blood Oxygen Level (X/min):
            </Text>
            <Text style={styles.text}>{oxygenLevel}</Text>
            <View style={styles.iconBox} />
          </View>
          <View style={styles.splitBox}>
            <Text style={[styles.text, styles.subTitle]}>
              Respiratory Rate (X%):
            </Text>
            <Text style={styles.text}>{respiratoryRate}</Text>
            <View style={styles.iconBox} />
          </View>
          <View style={styles.splitBox}>
            <Text style={[styles.text, styles.subTitle]}>
              Heart Beat Rate (X/min):{" "}
            </Text>
            <Text style={styles.text}>{heartBeatRate}</Text>
            <View style={styles.iconBox} />
          </View>
          {/* <View style={styles.splitBox}>
            <Text style={[styles.text, styles.subTitle]}>
              Last updated time :
            </Text>
            <Text style={styles.text}>2022/10/04 19:52</Text>
            <View style={styles.iconBox} />
          </View> */}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    marginHorizontal: 25,
    borderRadius: 10,
    height: Dimensions.get("window").height * 0.22,
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
    height: "100%",
    marginHorizontal: 10,
    justifyContent: "space-around",
  },
  splitBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subTitle: {
    minWidth: "40%",
  },
  resultText: {
    textAlign: "left",
  },
  icon: {
    width: 20,
    height: 20,
  },
  text: {
    fontSize: 13,
  },
});

export default PatientRecordBox;
