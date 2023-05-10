import { View, StyleSheet, ScrollView, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import TopBar from "../components/overview/TopBar";
import BasicInfoBar from "../components/patientDetails/BasicInfoBar";
import { Divider } from "react-native-elements";
import CustomPicker from "../components/overview/CustomPicker";
import ModifyRecordModal from "../components/patientRecord/ModifyRecordModal";
import PatientTestItem from "../components/patientDetails/PatientTestItem";
import { useSelector, useDispatch } from "react-redux";
import { log, getPatientValidTests, setSelectedTest } from "../redux/updater";
import { Test_Category } from "../data/TestCategoryEnum";
import useTestForm from "../utils/patientTestState";
import { deletePatientTest } from "../services/services";

const filterTest = (testList, category) => {
  return testList.filter((test) => test.category === category);
};

const PatientRecordScreen = ({ navigation }) => {
  const [recordModalVisible, setRecordModelVisible] = useState(false);
  const editRecord = () => {
    setRecordModelVisible(!recordModalVisible);
  };
  const [action, setAction] = useState("");
  const [viewingCategory, setViewingCategory] = useState(
    Test_Category.Blood_Pressure
  );

  const dispatch = useDispatch();
  const selectedPatient = useSelector((state) => state.patient.selectedPatient);
  const patientValidTests = useSelector((state) => state.patient.testList);

  const { values, handleChange } = useTestForm();

  const deleteAction = async (medicalTest) => {
    const response = await deletePatientTest(medicalTest);
    if (response.status === 200) {
      dispatch(getPatientValidTests(selectedPatient.id));
    }
  };

  useEffect(() => {
    dispatch(getPatientValidTests(selectedPatient.id));
  }, []);

  return (
    <View style={styles.container}>
      <ModifyRecordModal
        visible={recordModalVisible}
        setMethod={editRecord}
        action={action}
        patient={selectedPatient}
        values={values}
        handleChange={handleChange}
      />
      <TopBar
        backIcon={require("..//assets/icons/back.png")}
        title={"Patient Record"}
        icon={require("..//assets/icons/plus_pRecord.png")}
        pressMethod={editRecord}
        defineAction={setAction}
        navigation={navigation}
        isAdd={true}
      />
      <BasicInfoBar
        patient={selectedPatient}
        editable={false}
        nameEdit={false}
      />
      <View style={styles.pickerContainer}>
        <CustomPicker
          category={Object.values(Test_Category)}
          editable={true}
          changeCategory={true}
          setCategory={setViewingCategory}
        />
      </View>

      <Divider width={1} orientation="horizontal" color="#7C7C7C" />

      {patientValidTests && patientValidTests.length > 0 && (
        <FlatList
          data={patientValidTests.filter(
            (test) => test.category === viewingCategory && test.isValid == true
          )}
          renderItem={(test) => (
            <PatientTestItem
              medicalTest={test.item}
              setMethod={editRecord}
              defineAction={setAction}
              isEdit={true}
              handleChange={handleChange}
              deleteAction={deleteAction}
            />
          )}
          keyExtractor={(test) => test.id}
        />
      )}

      {/* <ScrollView>
        {patientValidTests &&
          patientValidTests
            .filter(
              (test) =>
                test.category === viewingCategory && test.isValid == true
            )
            .map((test) => (
              <PatientTestItem
                key={test.id}
                setMethod={editRecord}
                defineAction={setAction}
                medicalTest={test}
                isEdit={true}
                handleChange={handleChange}
              />
            ))}
      </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pickerContainer: {
    width: "80%",
    height: "5%",
    alignSelf: "center",
  },
});

export default PatientRecordScreen;
