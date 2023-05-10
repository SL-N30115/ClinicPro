import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Divider } from "react-native-elements";

const TopBar = ({
  title,
  icon,
  backIcon,
  pressMethod,
  defineAction,
  navigation,
  isAdd,
}) => (
  <View>
    <View style={styles.container}>
      {backIcon && (
        <TouchableOpacity
          style={styles.leftIcon}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image source={backIcon} />
        </TouchableOpacity>
      )}
      <Text style={styles.titleText}>{title}</Text>
      {icon && (
        <TouchableOpacity
          style={styles.rightIcon}
          onPress={() => {
            pressMethod();
            if (isAdd) {
              defineAction("Add");
            }
          }}
        >
          <Image source={icon} />
        </TouchableOpacity>
      )}
    </View>
    <Divider color="#7C7C7C" width={1} orientation="horizontal" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    margin: 20,
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: 25,
    fontWeight: "700",
    color: "#35364F",
  },
  leftIcon: {
    width: 45,
    height: 35,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  rightIcon: {
    width: 45,
    height: 35,
    justifyContent: "center",
    alignItems: "flex-end",
  },
});

export default TopBar;
