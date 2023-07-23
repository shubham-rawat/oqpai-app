import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
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

export default function SignUpPage({ navigation }) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");

  const signupHandler = async () => {
    if (validateForm()) {
      try {
        const res = await auth().createUserWithEmailAndPassword(email, pass1);
        await auth().currentUser.updateProfile({ displayName: name });
        navigation.navigate("VerifyPhone", {
          email,
          mobile,
          name,
        });
      } catch (error) {
        console.log(error);
      }
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
          keyboardType="numeric"
        />
        <TextField value={email} onChangeText={setEmail} placeholder="Email" />
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
        <Button
          theme={"primary"}
          label={"Signup"}
          onPress={signupHandler}
          height={60}
        />
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
    marginBottom: 50,
    alignItems: "flex-start",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 64,
  },
  subheading: {
    fontSize: 24,
  },
  signupForm: {
    display: "flex",
    paddingHorizontal: 30,
    marginBottom: 10,
    justifyContent: "space-between",
    alignItems: "stretch",
    width: "100%",
    height: "50%",
  },
  input: {
    height: 50,
    borderWidth: 0,
    paddingHorizontal: 30,
    paddingVertical: 10,
    fontSize: 18,
    backgroundColor: "#EEEEFA",
    borderRadius: 10,
  },
  loginMsg: {
    color: "#000",
    fontSize: 16,
    position: "absolute",
    bottom: 10,
  },
});
