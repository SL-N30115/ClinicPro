import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useEffect } from "react";
import TopBar from "../components/overview/TopBar";
import BottomTab from "../components/overview/BottomTab";
import { TapIconData } from "../data/TapIconData";
import InfoForm from "../components/addPatient/InfoForm";
import IconContextProvider from "../contexts/IconContext";
import useForm from "../utils/useForm";
import useDate from "../utils/utils";
import { postNewPatient } from "../services/services";
import { useSelector, useDispatch } from "react-redux";
import { log, setPatientList , getPatients } from "../redux/updater";


const AddPatientScreen = ({ navigation }) => {
  const notifyMessage = (message) =>
    Alert.alert("Save Failed", `${message}`, [{ text: "Noted" }]);

  const dispatch = useDispatch();

  const addPatient = async () => {
    const response = await postNewPatient(values);
    if (response.status === 200) {
      dispatch(getPatients());
      navigation.navigate("OverviewScreen");
    } else {
      notifyMessage(response.response.data.message);
    }
  };

  const { values, handleChange } = useForm();
  const { date, changeDate } = useDate();

  useEffect(() => {
    handleChange("dateOfBirth", `${date.month}-${date.day}-${date.year}`);
  }, [date]);

  const handleAddPatient = () => {
    addPatient();
  };

  return (
    <IconContextProvider>
      <View style={styles.container}>
        <TopBar
          pressMethod={handleAddPatient}
          title={"Add Patient"}
          icon={require("..//assets/icons/save.png")}
        />
        <InfoForm
          date={date}
          changeDate={changeDate}
          values={values}
          handleChange={handleChange}
        />
        <BottomTab
          navigation={navigation}
          icons={TapIconData}
          tabName={"Add"}
        />
      </View>
    </IconContextProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AddPatientScreen;
