import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Divider } from "react-native-elements";
import ViewItem from "../overview/ViewItem";
import { useSelector, useDispatch } from "react-redux";
import { log, setPatientList, getPatients } from "../../redux/updater";

const SearchBar = ({ placeHolder, setMethod, filterMethod }) => (
  <View style={styles.inputField}>
    <View style={{ flexDirection: "row" }}>
      <Image
        style={styles.iconContainer}
        source={require("../../assets/icons/searchBar.png")}
      />
      <TextInput
        style={{ width: "90%" }}
        placeholder={placeHolder}
        color="#8C8A9A"
        autoCorrect={false}
        autoCapitalize="none"
        onChangeText={(text) => setMethod(text)}
        // onChange = {()=> {
        //   filterMethod();
        // }}
        // onEndEditing={() => {
        //   filterMethod();
        // }}
      />
    </View>
  </View>
);

const SearchArea = ({ navigation }) => {
  const patientList = useSelector((state) => state.patient.patientList);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [patientID, setPatientID] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    setSearchResult(patientList);
  }, [patientList]);

  const filterPatient = () => {
    if (patientList && patientList.length > 0) {
      setSearchResult(
        patientList.filter((patient) => {
          return (
            patient.firstName.toLowerCase().includes(firstName.toLowerCase()) &&
            patient.lastName.toLowerCase().includes(lastName.toLowerCase())
          );
        })
      );
    }
  };

  return (
    <View style={{ marginTop: 15 }}>
      <SearchBar
        placeHolder={"First Name"}
        setMethod={setFirstName}
        filterMethod={filterPatient}
      />
      <SearchBar
        placeHolder={"Last Name"}
        setMethod={setLastName}
        filterMethod={filterPatient}
      />
      {/* <SearchBar
        placeHolder={"Patient's ID"}
        setMethod={setPatientID}
        filterMethod={filterPatient}
      /> */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => {
          filterPatient();
        }}
      >
        <Text style={styles.submitButtonText}>Search</Text>
      </TouchableOpacity>
      <Divider color="#7C7C7C" width={1} orientation="horizontal" />
      <ScrollView>
        <View style={{ marginTop: 15, paddingBottom: 420 }}>
          {searchResult &&
            searchResult.map((patient, index) => (
              <ViewItem navigation={navigation} key={index} patient={patient} />
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  inputField: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#8C8A9A",
    padding: 12,
    marginHorizontal: 40,
    marginBottom: 15,
  },
  iconContainer: {
    marginRight: 10,
    width: 20,
    height: 20,
  },
  submitButton: {
    borderRadius: 10,
    backgroundColor: "#12B2B3",
    marginBottom: 10,
    alignSelf: "center",
    width: "55%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default SearchArea;
