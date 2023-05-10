import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import TopBar from "../components/overview/TopBar";
import BottomTab from "../components/overview/BottomTab";
import { TapIconData } from "../data/TapIconData";
import ViewItem from "../components/overview/ViewItem";
import FilterArea from "../components/overview/FilterArea";
import IconContextProvider from "../contexts/IconContext";
import { fetchAllPatients } from "../services/services";
import store from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { log, setPatientList, getPatients } from "../redux/updater";

const OverviewScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [filterState, setFilterState] = useState(false);
  const closeModal = () => {
    setModalVisible(false);
  };
  // const [patientList, setPatientList] = useState([]);
  const patientList = useSelector((state) => state.patient.patientList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPatients());
    // fetchAllPatients(dispatch);
    // dispatch(log());
  }, []);

  return (
    <View style={styles.container}>
      <TopBar title={"Overview"} />
      <View style={styles.titleBar}>
        {/* Todo show no Patient when no data */}
        <Text style={styles.titleText}>All Patient</Text>
        {filterState == false ? (
          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => setModalVisible(true)}
          >
            <Image source={require("../assets/icons/filter.png")} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.resetBtn}
            onPress={() => {
              setFilterState(false);
              dispatch(getPatients());
            }}
          >
            <Image source={require("../assets/icons/trash.png")} />
          </TouchableOpacity>
        )}
      </View>
      <FilterArea
        visible={modalVisible}
        closeMethod={closeModal}
        patientList={patientList}
        setFilterState={setFilterState}
      />

      <ScrollView>
        <View style={{ paddingBottom: 80 }}>
          {patientList &&
            patientList.length > 0 &&
            patientList.map((patient, index) => (
              <ViewItem navigation={navigation} key={index} patient={patient} />
            ))}
        </View>
      </ScrollView>

      <BottomTab icons={TapIconData} navigation={navigation} tabName={"Home"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleBar: {
    paddingVertical: 20,
    paddingHorizontal: 25,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleText: {
    color: "#35364F",
    fontWeight: "500",
    fontSize: 15,
  },
  filterBtn: {
    width: 35,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  resetBtn: {
    width: 15,
    height: 15,
    justifyContent: "center",
    alignItems: "flex-end",
  },
});

export default OverviewScreen;
