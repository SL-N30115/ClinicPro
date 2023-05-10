import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";

const CustomPicker = ({
  category,
  editable,
  handleChange,
  passData,
  changeCategory,
  setCategory,
  formData,
}) => {
  const actions = category;
  const [selectedValue, setSelectedValue] = useState(0);
  const selectAction = (action) => {
    if (action == "Add") {
      var index = selectedValue + 1;
      if (index >= actions.length) {
        index = 0;
      }
      setSelectedValue(index);
      if (passData) {
        handleChange("category", actions[index]);
      }

      if (changeCategory) {
        setCategory(actions[index]);
      }
    } else {
      var index = selectedValue - 1;
      if (index < 0) {
        index = actions.length - 1;
      }
      setSelectedValue(index);
      if (passData) {
        handleChange("category", actions[index]);
      }

      if (changeCategory) {
        setCategory(actions[index]);
      }
    }
  };

  return (
    <View style={pickerStyles.container(editable)}>
      {editable && (
        <>
          <TouchableOpacity
            onPress={() => {
              if (editable) {
                selectAction("Add");
              }
            }}
            style={pickerStyles.touchableArea}
          >
            <Image
              style={pickerStyles.pickerIcon}
              source={require("../../assets/icons/arrow-left.png")}
            />
          </TouchableOpacity>

          <Text style={pickerStyles.pickerText}>{actions[selectedValue]}</Text>

          <TouchableOpacity
            onPress={() => {
              if (editable) {
                selectAction("Minus");
              }
            }}
            style={pickerStyles.touchableArea}
          >
            <Image
              style={pickerStyles.pickerIcon}
              source={require("../../assets/icons/arrow-right.png")}
            />
          </TouchableOpacity>
        </>
      )}

      {!editable && (
        <Text style={pickerStyles.pickerText}>{formData.category}</Text>
      )}
    </View>
  );
};

const pickerStyles = StyleSheet.create({
  container: (editable) => ({
    width: "80%",
    height: "100%",
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: editable ? "space-between" : "center",
  }),
  touchableArea: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  pickerIcon: {
    width: 15,
    height: 15,
  },
  pickerText: {},
});

export default CustomPicker;
