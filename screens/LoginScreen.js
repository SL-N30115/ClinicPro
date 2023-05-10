import { View, StyleSheet} from "react-native";
import React from "react";
import Icon from "../components/login/Icon";
import LoginForm from "../components/login/LoginForm";

const LoginScreen = ({navigation}) => (
  <View style={styles.container}>
    <Icon></Icon>
    <LoginForm navigation={navigation} ></LoginForm>
  </View>
);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});




export default LoginScreen;
