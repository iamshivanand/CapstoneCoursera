import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./WelcomeScreen";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import PagerView from "react-native-pager-view";
import { BoldOutlined } from "@ant-design/icons";
import { createTable, getMenuItems, saveMenuItems } from "../../database";

const Stack = createNativeStackNavigator();

const MenuScreen = ({ navigation }) => {
  const [email, setOnChangeEmail] = React.useState("");
  const [password, setOnChangePassword] = React.useState("");
  const [confirmPassword, setOnChangeConfirmPassword] = React.useState("");
  const [name, setOnChangeName] = React.useState("");
  const [emailValidate, setEmailValidate] = React.useState(true);
  const [passValidate, setPassValidate] = React.useState(true);
  const [cPassValidate, setCPassValidate] = React.useState(true);
  const [nameValidate, setNameValidate] = React.useState(true);
  const [userData, setUserData] = React.useState({});

  const [pageType, setPageType] = React.useState(1);

  React.useEffect(() => {
    setOnChangeConfirmPassword("");
    setOnChangeEmail("");
    setOnChangePassword("");
    setOnChangeName("");
  }, [pageType]);

  const process = () => {
    if (pageType === 2) {
      if (
        name === "" ||
        confirmPassword === "" ||
        password === "" ||
        email === ""
      ) {
        if (name === "") setNameValidate(false);
        else setNameValidate(true);
        if (email === "") setEmailValidate(false);
        else setPassValidate(true);
        if (confirmPassword === "") setCPassValidate(false);
        else setCPassValidate(true);
        if (password === "") setPassValidate(false);
        else setPassValidate(true);
        return;
      } else {
        if (password !== confirmPassword) alert("Confirm password mismatch");
        else {
          if (authenticateUser()) {
            alert("Account already exists, Please Login");
          } else {
            saveMenuItems(email, name, password);
            alert("Voilaa! It was this simple");
          }
          setPageType(1);
        }
      }
    } else {
      if (email === "" || password === "") {
        if (email === "") setEmailValidate(false);
        else setEmailValidate(true);
        if (password === "") setPassValidate(false);
        else setPassValidate(true);
        return;
      } else {
        getMenuItems(email, password)
          .then((res) => {
            if (res.length > 0) {
              setUserData(res[0]);
              navigation.navigate("profile", res[0]);
            } else {
              alert("No user found");
            }
          })
          .catch((err) => {
            alert(err);
          });
      }
    }
  };

  function authenticateUser() {
    getMenuItems(email, password).then((res) => {
      return res.length > 0;
    });
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardDismissMode="on-drag"
      >
        <Text style={styles.headerTextTwo}>Give us some information</Text>
        {pageType === 1 ? (
          <View style={styles.dataView}>
            <TextInput
              style={!emailValidate ? styles.inputBoxError : styles.inputBox}
              placeholder="Email"
              value={email}
              onChangeText={setOnChangeEmail}
              onChange={() => setEmailValidate(true)}
              onBlur={() =>
                email === "" ? setEmailValidate(false) : setEmailValidate(true)
              }
            ></TextInput>
            <TextInput
              style={!passValidate ? styles.inputBoxError : styles.inputBox}
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChange={() => setPassValidate(true)}
              onChangeText={setOnChangePassword}
              onBlur={() =>
                password === "" ? setPassValidate(false) : setPassValidate(true)
              }
            ></TextInput>
          </View>
        ) : (
          <View style={styles.dataView}>
            <TextInput
              style={!emailValidate ? styles.inputBoxError : styles.inputBox}
              placeholder="Email"
              value={email}
              onChangeText={setOnChangeEmail}
              onChange={() => setEmailValidate(true)}
            ></TextInput>
            <TextInput
              style={!nameValidate ? styles.inputBoxError : styles.inputBox}
              placeholder="Name"
              value={name}
              onChangeText={setOnChangeName}
              onChange={() => setNameValidate(true)}
            ></TextInput>

            <TextInput
              style={!passValidate ? styles.inputBoxError : styles.inputBox}
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={setOnChangePassword}
              onChange={() => setPassValidate(true)}
            ></TextInput>
            <TextInput
              style={!cPassValidate ? styles.inputBoxError : styles.inputBox}
              placeholder="Confirm Password"
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={setOnChangeConfirmPassword}
              onChange={() => setCPassValidate(true)}
            ></TextInput>
          </View>
        )}
        <PagerView style={styles.viewPager} initialPage={1}>
          <View style={styles.page} key="1">
            <Text style={styles.pagerText}>Everyting at one place</Text>
            <Text>
              Swipe to see{" "}
              <Ionicons style={styles.arrowIcon} name="play-forward"></Ionicons>
            </Text>
          </View>
          <View style={styles.page} key="2">
            <Text style={styles.pagerText}>The most delicious</Text>
          </View>
          <View style={styles.page} key="3">
            <Text style={styles.pagerText}>Finger lickin good</Text>
          </View>
        </PagerView>
        <View style={styles.innerDiv}>
          <Pressable style={styles.button} onPress={() => process()}>
            <Text style={styles.buttonText}>
              {pageType === 1 ? "Login " : "SignUp "}
            </Text>
          </Pressable>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: 100,
            }}
          >
            <Pressable
              style={{ height: 100 }}
              onPress={() => setPageType((prev) => (prev === 1 ? 2 : 1))}
            >
              <Text style={styles.signup}>
                {pageType === 1 ? "New to little lemon?" : "Connect with us!"}
                <Text style={styles.signupLink}>
                  &nbsp;{pageType === 1 ? "SignUp" : "Login"}
                </Text>
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  signup: {
    marginLeft: 50,
    height: 50,
    width: 200,
  },
  signupLink: {
    fontSize: 18,
    fontWeight: "bold",
  },
  arrowIcon: {
    marginLeft: 50,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
  pagerText: {
    color: "#262626",
    fontFamily: "Dancing",
    fontSize: 24,
  },
  container: {
    flex: 1,
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
  },
  dataView: {
    marginTop: 70,
    width: "100%",
    alignItems: "center",
  },
  icon: {
    display: "flex",
  },
  inputBox: {
    alignItems: "center",
    height: 60,
    width: "80%",
    margin: 10,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderRadius: 50,
    borderColor: "#EDEFEE",
    backgroundColor: "#EDEFEE",
  },
  inputBoxError: {
    alignItems: "center",
    height: 60,
    width: "80%",
    margin: 10,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderRadius: 50,
    borderColor: "red",
    backgroundColor: "#EDEFEE",
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
    paddingTop: 60,
    paddingBottom: 10,
    fontSize: 36,
    color: "#262626",
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
    padding: 20,
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
    width: "100%",
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
  },
});

export default MenuScreen;
