import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./components/WelcomeScreen/RootNavigation";
import { createTable } from "./database";

export default function App() {
  createTable("master_data_user2");
  return (
    // <View style={styles.container}>
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
    // <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
