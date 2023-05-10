import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

const Icon = () => (
  <View style={styles.container}>
    <View style={styles.iconContainer}>
      <Image
        style={styles.icon}
        source={require("../../assets/icons8-clinic.png")}
      />
    </View>
    <Text style={styles.iconText}>Clinic Pro</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { margin: 120,marginBottom: 150,  alignItems: "center", justifyContent: "center" },
  iconText: {
    fontSize: 19,
    marginVertical: 15,
    color: "#12B2B3",
    fontWeight: "700",
  },
  iconContainer: {
    width: 230,
    height: 230,
    borderRadius: 400,
    borderWidth: 1.5,
    borderColor: "#12B2B3",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 100,
    height: 100,
  },
});

export default Icon;
