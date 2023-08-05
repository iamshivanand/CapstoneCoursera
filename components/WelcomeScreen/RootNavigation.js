import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./WelcomeScreen";
import Login from "./Login";
import Profile from "./Profile";
import Menu from "./Menu";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="login"
        component={Login}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen name="profile" component={Profile}></Stack.Screen>
      <Stack.Screen name="menu" component={Menu}></Stack.Screen>
      {/* Set up stack navigation to move between welcome screen and subscribe screen here */}
    </Stack.Navigator>
  );
};

export default RootNavigator;
