import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Test_Category } from "../../data/TestCategoryEnum";
import { setSelectedTest } from "../../redux/updater";
import { useDispatch } from "react-redux";
import { Swipeable } from "react-native-gesture-handler";

const multipleText = (record) => {
  if (record.category === Test_Category.Blood_Pressure) {
    var readings = record.readings.split(",");
    return (
      <View style={styles.splitBox}>
        <Text style={[styles.text, styles.subTitle]}>Readings:</Text>
        <Text style={styles.text}>{readings[0]}</Text>
        <Text style={styles.text}>{readings[1]}</Text>
        <View style={styles.iconBox} />
      </View>
    );
  } else {
    return (
      <View style={styles.splitBox}>
        <Text style={[styles.text, styles.subTitle]}>Readings:</Text>
        <Text style={styles.text}>{record.readings}</Text>
        <View style={styles.iconBox}></View>
      </View>
    );
  }
};

const convertDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString();
};

const PatientTestItem = ({
  values,
  handleChange,
  isEdit,
  setMethod,
  defineAction,
  medicalTest,
  deleteAction,
}) => {
  const dispatch = useDispatch();



  const rightSwipe = () => {
    return (
      <TouchableOpacity onPress={() => {
        deleteAction(medicalTest);
      }} style={styles.swipeArea}>
        <View style={styles.rightSwipe}>
          <Text style={styles.swipeBtnText}>Delete</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderRightActions={rightSwipe}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            if (isEdit) {
              dispatch(setSelectedTest(medicalTest));
              setMethod();
              defineAction("Edit");
              handleChange("category", medicalTest.category);
            }
          }}
        >
          <View style={styles.textBox}>
            <View style={styles.splitBox}>
              <Text style={[styles.text, styles.subTitle]}>Category:</Text>
              <Text style={styles.text}>{medicalTest.category}</Text>
              <View style={styles.iconBox}></View>
            </View>
            {multipleText(medicalTest)}
            <View style={styles.splitBox}>
              <Text style={[styles.text, styles.subTitle]}>Nurse :</Text>
              <Text style={styles.text}>{medicalTest.nurseName}</Text>
              <View style={styles.iconBox} />
            </View>
            <View style={styles.splitBox}>
              <Text style={[styles.text, styles.subTitle]}>
                Last updated time :
              </Text>
              <Text style={styles.text}>
                {convertDate(medicalTest.modifyDate)}
              </Text>
              <View style={styles.iconBox} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
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
  swipeArea: {
    height: "60%",
    alignSelf: "center",
  },
  rightSwipe: {
    borderRadius: 10,
    backgroundColor: "red",
    height: "100%",
    width: 75,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 7,
  },
  swipeBtnText: {
    fontSize: 13,
    color: "white",
    fontWeight: "bold",
  },
});

export default PatientTestItem;
