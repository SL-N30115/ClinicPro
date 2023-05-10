import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";

const RadioButton = ({ inputGender, setMethod, optionList }) => {
  return (
    <View style={RadioButtonStyles.wrapper}>
      {optionList.map((gender) => (
        <View key={gender} style={RadioButtonStyles.container}>
          <View key={gender}>
            <TouchableOpacity
              style={RadioButtonStyles.outer}
              key={gender}
              onPress={() => {
                setMethod(gender);
              }}
            >
              {inputGender === gender && (
                <View key={gender} style={RadioButtonStyles.inner}>
                  <Image source={require("../../assets/icons/Tick.png")} />
                </View>
              )}
            </TouchableOpacity>
          </View>
          <Text style={RadioButtonStyles.buttonText}>{gender}</Text>
        </View>
      ))}
    </View>
  );
};

const RadioButtonStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 12,
    marginLeft: 8,
  },
  outer: {
    width: 20,
    height: 20,
    borderRadius: 15,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    width: 20,
    height: 20,
    borderRadius: 15,
    backgroundColor: "#12B2B3",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RadioButton;
