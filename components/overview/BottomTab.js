import { View, Text, StyleSheet, Image } from "react-native";
import React, { useState , useContext} from "react";
import { TouchableOpacity } from "react-native";
import { Divider } from "react-native-elements";
import { IconContext } from "../../contexts/IconContext"

const tapNavigation = (navigation, name) => {
    if(name === 'Home'){
        navigation.navigate('OverviewScreen')
    }
    else if(name === 'Search'){
        navigation.navigate('SearchScreen')
    }
    else if(name === 'Add'){
        navigation.navigate('AddPatientScreen')
    }
}

const BottomTab = ({ icons, navigation , tabName }) => {

  const TapIcon = ({ icon }) => (
    <TouchableOpacity
      onPress={() => {
        //setActiveTab(icon.name);
        tapNavigation(navigation, icon.name)
      }}
    >
      <Image
        source={icon.name === tabName ? icon.active : icon.inactive}
        style={styles.icon}
      ></Image>
    </TouchableOpacity>
  );

  return (
    <View style={styles.wrapper}>
      <Divider width={1} orientation="horizontal" />
      <View style={styles.container}>
        {icons.map((icon, index) => (
          <TapIcon icon={icon} key={index} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    width: "100%",
    bottom: "0%",
    zIndex: 998,
    backgroundColor: "#12B2B3",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 90,
    alignItems: "center",
  },
  icon: {
    width: 20,
    height: 20,
    marginBottom: 10,
  },
});

export default BottomTab;
