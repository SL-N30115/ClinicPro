import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import OverviewScreen from "./screens/OverviewScreen";
import SearchScreen from "./screens/SearchScreen";
import AddPatientScreen from "./screens/AddPatientScreen";
import PatientDetailScreen from "./screens/PatientDetailScreen";
import PatientRecordScreen from "./screens/PatientRecordScreen";
import store from "./redux/store";
import { Provider } from "react-redux";

const Stack = createNativeStackNavigator();

const screenOPtions = {
  headerShown: false,
};

export const SignedInStack = () => (
  <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={screenOPtions}
      >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="OverviewScreen" component={OverviewScreen} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="AddPatientScreen" component={AddPatientScreen} />
        <Stack.Screen
          name="PatientDetailScreen"
          component={PatientDetailScreen}
        />
        <Stack.Screen
          name="PatientRecordScreen"
          component={PatientRecordScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
);

export const SignedOutStack = () => {
  <NavigationContainer>
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  </NavigationContainer>;
};
