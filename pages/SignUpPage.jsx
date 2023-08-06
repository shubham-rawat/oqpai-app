import { useState } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
// firebase authentication
import auth from "@react-native-firebase/auth";
// custom comps
import Button from "../components/Button";
import TextField from "../components/TextField";
import {
  validateEmail,
  validateMobileNumber,
  validatePassword,
} from "../utils/ValidationUtils";
import { getFontSize } from "../utils/FontScaling";

export default function SignUpPage({ navigation }) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [loading, setLoading] = useState(false);

  const signupHandler = async () => {
    setLoading(true);
    try {
      if (validateForm()) {
        const res = await auth().createUserWithEmailAndPassword(email, pass1);
        await auth().currentUser.updateProfile({ displayName: name });
        alert(auth().currentUser.email);
        navigation.navigate("VerifyPhone", { email, mobile, name });
      }
    } catch (error) {
      alert(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    if (!name || !mobile || !email || !pass1 || !pass2) {
      alert("All fields are required");
      return false;
    } else if (pass1 !== pass2) {
      alert("Passwords Not Matching");
      return false;
    } else if (!validateEmail(email)) {
      alert("Invalid Email");
      return false;
    } else if (!validatePassword(pass1)) {
      alert(
        "Password must contain 1 UpperCase, 1 Lowecase, 1 Digit, 1 Special character and must have min length of 8"
      );
      return false;
    } else if (!validateMobileNumber(mobile)) {
      alert("Invalid Mobile Number");
      return false;
    }
    return true;
  };

  return (
    <>
      <StatusBar animated style="auto" />
      <View style={styles.signupContainer}>
        <View style={styles.messageContainer}>
          <Text style={styles.heading}>Hi!</Text>
          <Text style={styles.subheading}>Create a new account</Text>
        </View>
        <View style={styles.signupForm}>
          <TextField
            value={name}
            onChangeText={setName}
            placeholder="Name"
            autoCapitalize="words"
          />
          <TextField
            value={mobile}
            onChangeText={setMobile}
            placeholder="Mobile Number"
            keyboardType="number-pad"
          />
          <TextField
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
          />
          <TextField
            value={pass1}
            onChangeText={setPass1}
            placeholder="Password"
            secure={true}
          />
          <TextField
            value={pass2}
            onChangeText={setPass2}
            placeholder="Confirm Password"
            secure={true}
          />
          {loading ? (
            <ActivityIndicator size="large" color="#0B6EFD" />
          ) : (
            <Button
              theme={"primary"}
              label={"Signup"}
              onPress={signupHandler}
              height={60}
            />
          )}
        </View>
        <Text style={styles.loginMsg}>
          Already have an account?
          <Text
            style={{ color: "#0B6EFD" }}
            onPress={() => navigation.navigate("LoginPage")}
          >
            {" "}
            Login
          </Text>
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  signupContainer: {
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  messageContainer: {
    display: "flex",
    width: "100%",
    paddingHorizontal: 30,
    aspectRatio: 3 / 1,
    alignItems: "flex-start",
  },
  heading: {
    fontWeight: "bold",
    fontSize: getFontSize(48),
  },
  subheading: {
    fontSize: getFontSize(18),
  },
  signupForm: {
    display: "flex",
    width: "100%",
    paddingHorizontal: 30,
    justifyContent: "space-between",
    alignItems: "stretch",
    aspectRatio: 1 / 1,
  },
  loginMsg: {
    color: "#000",
    fontSize: getFontSize(14),
    position: "absolute",
    bottom: 10,
  },
});
