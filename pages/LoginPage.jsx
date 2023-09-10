import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  PermissionsAndroid,
} from "react-native";
// firebase authentication
import auth from "@react-native-firebase/auth";
// firebase messaging
import messaging from "@react-native-firebase/messaging";
// redux
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUserData } from "../store/userDataSlice";
// custom comps
import Button from "../components/Button";
import Seperator from "../components/Seperator";
import CustomModal from "../components/CustomModal";
import TextField from "../components/TextField";
import ForgotPassword from "./ForgotPassword";
import { saveFcmToken } from "../apis/userApi";
import { getFontSize } from "../utils/FontScaling";
import { saveValue } from "../utils/SecureDataStoreUtils";
import {
  LOGGED_IN_VALUE,
  LOGIN_STORE_KEY,
  USEREMAIL_STORE_KEY,
  USERMOBILE_STORE_KEY,
  USERNAME_STORE_KEY,
} from "../constants/AllConstants";
import {
  INVALID_CREDENTIALS,
  MISSING_FIELDS,
} from "../constants/ErrorMessages";

export default function LoginPage({ navigation }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgot, setForgot] = useState(false);
  const { fcmToken } = useSelector((state) => state.userData);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
    );
  };

  useEffect(() => {
    if (requestUserPermission()) {
      messaging()
        .getToken()
        .then((token) => {
          dispatch(setToken({ fcmToken: token }));
        })
        .catch((reason) => console.log(reason));
    } else {
      console.log("Failed to get token");
    }
  }, []);

  // function to handle user login
  const loginHandler = async () => {
    if (!email || !password) {
      alert(MISSING_FIELDS);
      return;
    }
    try {
      setLoading(true);
      const res = await auth().signInWithEmailAndPassword(email, password);
      await saveValue(LOGIN_STORE_KEY, LOGGED_IN_VALUE);
      await saveValue(USEREMAIL_STORE_KEY, email);
      await saveValue(USERNAME_STORE_KEY, res.user.displayName);
      await saveValue(USERMOBILE_STORE_KEY, res.user.phoneNumber);
      await saveFcmToken(email, fcmToken);
      dispatch(
        setUserData({
          email,
          name: res.user.displayName,
          mobile: res.user.phoneNumber,
          isLoggedIn: LOGGED_IN_VALUE,
        })
      );
    } catch (error) {
      console.error("", error);
      alert(INVALID_CREDENTIALS);
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
            onPress={() => navigation.navigate("SignUpPage")}
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
    aspectRatio: 3 / 1,
    alignItems: "flex-start",
  },
  heading: {
    fontWeight: "700",
    fontSize: getFontSize(48),
  },
  subheading: {
    fontWeight: "400",
    fontSize: getFontSize(18),
  },
  loginForm: {
    display: "flex",
    paddingHorizontal: 30,
    justifyContent: "space-between",
    alignItems: "stretch",
    width: "100%",
    aspectRatio: 2 / 1,
  },
  forgotPass: {
    color: "#0B6EFD",
    fontSize: getFontSize(14),
    fontWeight: "400",
    marginVertical: 20,
  },
  bottomContainer: {
    display: "flex",
    paddingHorizontal: 30,
    justifyContent: "space-between",
    alignItems: "stretch",
    width: "100%",
  },
  signUp: {
    color: "#000",
    fontSize: getFontSize(14),
    position: "absolute",
    bottom: 10,
  },
});
