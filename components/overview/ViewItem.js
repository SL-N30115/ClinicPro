import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React,{useEffect} from "react";
import { useDispatch} from "react-redux";
import { setSelectedPatient , getPatientByID } from "../../redux/updater";


const getAge = (dateString) => {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

const ViewItem = ({navigation , patient}) => {

  const dispatch = useDispatch();


  return (
    <TouchableOpacity onPress={()=>{
      dispatch(setSelectedPatient(patient));
      navigation.push("PatientDetailScreen")
    }}>
      <View style={styles.container}>
        <View style={styles.leftItemContainer}>
          <Image
            style={styles.ViewImage}
            // source={require("../../assets/dummyAssets/dummyIcon.png")}
            source={{uri: patient.photoUrl.includes("http") ? patient.photoUrl : "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"}}
          />
        </View>
        <View style={styles.rightItemContainer}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.rightBoxText}>{`Name : ${patient.firstName} ${patient.lastName}`}</Text>
            <TouchableOpacity>
              <View style={{ width: 10, height: 10 }}>
                <Image source={require("../../assets/icons/Menu.png")} />
              </View>
            </TouchableOpacity>
          </View>
          <Text style={styles.rightBoxText}>{`Age: ${getAge(patient.dateOfBirth)}`}</Text>
          <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
            <Image
              style={styles.smallIcon}
              source={require("../../assets/icons/security-pass.png")}
            />
            <Text style={styles.rightBoxText}>{patient.id}</Text>
            <Text style={[styles.rightBoxText, { marginLeft: 50 }]}>{patient.gender}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    height: 90,
    marginBottom: 15,
    marginHorizontal: 25,
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
  leftItemContainer: {
    width: "30%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  ViewImage: {
    width: 55,
    height: 55,
    borderRadius: 12,
    aspectRatio: 1,
  },
  rightItemContainer: {
    justifyContent: "space-around",
    flex: 1,
    marginEnd: 15,
    marginVertical: 15,
  },
  rightBoxText: {
    fontSize: 10,
  },
  smallIcon: {
    width: 12,
    height: 12,
    marginRight: 5,
  },
});

export default ViewItem;
