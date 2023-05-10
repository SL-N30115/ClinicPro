import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";

const LoginForm = ({navigation}) => (
  <View>
    <View style={styles.inputField}>
      <TextInput
        placeholder="Your Access Code"
        autoCapitalize="none"
        placeholderTextColor={"#1E1F20"}
        secureTextEntry={true}
      />
    </View>
      <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('OverviewScreen')}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

  </View>
);

const styles = StyleSheet.create({
  inputField: {
    padding: 14,
    borderColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: "rgba(132,132,168,0.2)",
    marginHorizontal: 50,
    marginBottom    : 20,
  },
  button: {
    backgroundColor: "#12B2B3",
    minHeight: 50,
    borderRadius: 25,
    alignContent : "center",
    justifyContent : "center",
    marginHorizontal: 50,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  }
});

export default LoginForm;
