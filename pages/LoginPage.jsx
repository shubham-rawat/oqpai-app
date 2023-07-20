import { useState } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
// firebase authentication
import { firebaseAuth } from "../firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
// redux
import { useDispatch } from "react-redux";
import { setUserData } from "../store/userDataSlice";
// custom comps
import Button from "../components/Button";
import Seperator from "../components/Seperator";
import CustomModal from "../components/CustomModal";
import TextField from "../components/TextField";
import ForgotPassword from "./ForgotPassword";

export default function LoginPage({ navigation }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [forgot, setForgot] = useState(false);

  const loginHandler = async () => {
    setLoading(true);
    try {
      const res = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      dispatch(setUserData({ email, name: "Name" }));
      navigation.navigate("MainPage");
    } catch (error) {
      alert("Invalid Email or Password");
      setEmail("");
      setPassword("");
    } finally {
      setLoading(false);
    }
  };

  const forgotPasswordHandler = () => {
    setForgot(true);
  };

  return (
    <>
      <View style={styles.loginContainer}>
        <View style={styles.messageContainer}>
          <Text style={styles.heading}>Welcome!</Text>
          <Text style={styles.subheading}>Sign in to continue</Text>
        </View>
        <View style={styles.loginForm}>
          {/* <TextField
            value={mobile}
            onChangeText={setMobile}
            placeholder="Mobile Number"
            keyboardType="numeric"
          /> */}
          <TextField
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
          />
          <TextField
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secure={true}
          />
          {loading ? (
            <ActivityIndicator size="large" color="#0B6EFD" />
          ) : (
            <Button
              theme={"primary"}
              label={"Login"}
              onPress={loginHandler}
              height={60}
            />
          )}
        </View>
        <Text onPress={forgotPasswordHandler} style={styles.forgotPass}>
          Forgot Password?
        </Text>
        <View style={styles.messageContainer}>
          <Seperator color={"#0B6EFD"} text={"or"} textWidth={30} />
        </View>
        <View style={styles.bottomContainer}>
          <Button
            theme={"blank"}
            label={"Sign In With Google"}
            onPress={loginHandler}
            height={60}
          />
        </View>
        <Text style={styles.signUp}>
          Dont have an account?
          <Text
            style={{ color: "#0B6EFD" }}
            onPress={() => navigation.navigate("SignupPage")}
          >
            {" "}
            Sign Up
          </Text>
        </Text>
      </View>
      <CustomModal
        modalName={"Forgot Password"}
        isVisible={forgot}
        onClose={() => setForgot(false)}
      >
        <ForgotPassword />
      </CustomModal>
    </>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
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
  loginForm: {
    display: "flex",
    paddingHorizontal: 30,
    marginBottom: 10,
    justifyContent: "space-between",
    alignItems: "stretch",
    width: "100%",
    height: "22%",
  },
  forgotPass: {
    color: "#0B6EFD",
    fontSize: 16,
    marginBottom: 20,
  },
  bottomContainer: {
    display: "flex",
    paddingHorizontal: 30,
    justifyContent: "space-between",
    alignItems: "stretch",
    width: "100%",
    height: "10%",
  },
  signUp: {
    color: "#000",
    fontSize: 16,
    position: "absolute",
    bottom: 10,
  },
});
