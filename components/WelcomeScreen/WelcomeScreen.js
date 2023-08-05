import {
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useFonts } from "expo-font";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const WelcomeScreen = ({ navigation }) => {
  const [loaded] = useFonts({
    Dancing: require("../../assets/fonts/DancingScript-Bold.ttf"),
    Ananda: require("../../assets/fonts/AnandaNamasteRegular.ttf"),
  });

  if (!loaded) {
    return null;
  }
  // const [animateTime, setAnimateTime] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.image}
        resizeMode="cover"
        accessible={true}
        accessibilityLabel={"Little Lemon Logo"}
        source={require("../../assets/splash5.jpg")}
      >
        <Text style={styles.headerTextOne}>Namaste</Text>
        <Text style={styles.headerTextTwo}>Welcome to Sweet Lemon </Text>
        <View style={styles.innerDiv}>
          <Pressable>
            <Ionicons
              style={styles.icon}
              name="ios-chevron-forward-circle-outline"
              size={100}
              color="#f5f5f5"
              onPress={() => navigation.navigate("login")}
            />
          </Pressable>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
  },
  icon: {
    display: "flex",
  },
  headerTextOne: {
    paddingRight: 10,
    paddingLeft: 20,
    paddingTop: 250,
    paddingBottom: 10,
    fontSize: 100,
    color: "#f5f5f5",
    textAlign: "center",
    fontFamily: "Ananda",
    marginLeft: -20,
  },
  headerTextTwo: {
    paddingRight: 10,
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 10,
    fontSize: 28,
    color: "#f5f5f5",
    textAlign: "center",
    fontFamily: "Dancing",
    marginLeft: -20,
  },

  regularText: {
    fontSize: 24,
    padding: 20,
    marginVertical: 8,
    color: "#EDEFEE",
    textAlign: "center",
  },
  image: {
    // flex: 1,
    width: "100%",
    height: "110%",
    marginTop: -100,
  },
  button: {
    fontSize: 22,
    padding: 10,
    width: "80%",
    backgroundColor: "rgb(0, 153, 204)",
    // borderColor: "#EE9972",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#f5f5f5",
    textAlign: "center",
    fontSize: 25,
  },
  innerDiv: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 100,
  },
});
export default WelcomeScreen;
