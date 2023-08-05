import { ProfileFilled } from "@ant-design/icons";
import React, { useEffect } from "react";
import { Pressable, TextInput } from "react-native";
import { Image, StyleSheet, Text, View } from "react-native";
import { getMenuItems } from "../../database";

const Profile = (props) => {
  const [email, setOnChangeEmail] = React.useState("");
  const [name, setOnChangeName] = React.useState("");
  console.log("raiden", props);
  useEffect(() => {
    getMenuItems(props.route.params.email, props.route.params.password).then(
      (res) => {
        const { email, name } = res[0];
        setOnChangeEmail(email);
        setOnChangeName(name);
      }
    );
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.headerTextOne}>Profile</Text>
      <Image
        style={styles.profile}
        source={require("../../assets/splash2.jpg")}
      ></Image>
      <Pressable
        style={styles.buttonLogout}
        onPress={() => props.navigation.navigate("login")}
      >
        <Text style={styles.buttonLogoutText}>Logout </Text>
      </Pressable>
      <View style={styles.dataView}>
        <Text>E-mail</Text>
        <TextInput
          value={email}
          style={styles.inputBox}
          editable={false}
        ></TextInput>
        <Text>Name</Text>
        <TextInput
          value={name}
          style={styles.inputBox}
          editable={false}
        ></TextInput>
      </View>
      <Pressable
        style={styles.button}
        onPress={() => props.navigation.navigate("menu")}
      >
        <Text style={styles.buttonText}>Menu </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  buttonLogout: {
    width: 150,
    padding: 20,
    backgroundColor: "green",
    borderRadius: 100,
    marginTop: 20,
  },
  buttonLogoutText: {
    color: "#f5f5f5",
    textAlign: "center",
    fontSize: 18,
  },
  profile: {
    width: 150,
    height: 150,
    borderRadius: 200,
    marginTop: 10,
  },
  signup: {
    marginTop: 10,
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
    alignItems: "center",
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
  },
  dataView: {
    marginTop: 30,
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
    borderColor: "#262626",
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
    paddingTop: 30,
    paddingBottom: 10,
    fontSize: 50,
    color: "#262626",
    textAlign: "center",
    fontFamily: "Ananda",
    marginLeft: -20,
  },
  headerTextTwo: {
    paddingRight: 10,
    paddingLeft: 20,
    paddingTop: 100,
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
    marginTop: 20,
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
    marginBottom: 100,
  },
});

export default Profile;
