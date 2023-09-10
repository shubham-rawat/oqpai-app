import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../store/userDataSlice";
// firebase authentication
import auth from "@react-native-firebase/auth";
// components
import Button from "../components/Button";
import OTPInput from "../components/OTPInput";
import { getFontSize } from "../utils/FontScaling";
import { registerUser } from "../apis/userApi";
import { saveValue } from "../utils/SecureDataStoreUtils";
import {
  LOGGED_IN_VALUE,
  LOGIN_STORE_KEY,
  USEREMAIL_STORE_KEY,
  USERMOBILE_STORE_KEY,
  USERNAME_STORE_KEY,
} from "../constants/AllConstants";
import {
  FIREBASE_LINKING_ERROR,
  INVALID_CODE,
  UNKNOWN_ERROR,
} from "../constants/ErrorMessages";
import { ActivityIndicator } from "react-native";

export default function VerifyPhone({ route, navigation }) {
  const { email, mobile, name, lastName } = route.params;
  const otpLength = 6;
  const [otp, setOtp] = useState(Array(otpLength).fill(""));
  const [confirm, setConfirm] = useState(null);
  const [loading, setLoading] = useState(false);
  const { fcmToken } = useSelector((state) => state.userData);

  const dispatch = useDispatch();

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const credential = auth.PhoneAuthProvider.credential(
        confirm.verificationId,
        otp.join("")
      );
      // link the verified phone number to the user
      await auth().currentUser.linkWithCredential(credential);
      try {
        // registering the user in the backend
        const res = await registerUser({
          firstName: name,
          lastName: lastName,
          username: email,
          phoneNumber: mobile,
          hash: "",
          city: "",
          fcm_token: fcmToken,
        });
        console.log(res);
        // saving the value locally
        await saveValue(LOGIN_STORE_KEY, LOGGED_IN_VALUE);
        await saveValue(USEREMAIL_STORE_KEY, email);
        await saveValue(USERNAME_STORE_KEY, name);
        await saveValue(USERMOBILE_STORE_KEY, mobile);
        dispatch(
          setUserData({
            email: email,
            name: name,
            mobile: mobile,
            isLoggedIn: LOGGED_IN_VALUE,
          })
        );
      } catch (error) {
        console.log(error);
        alert(UNKNOWN_ERROR);
      }
    } catch (error) {
      if (error.code == "auth/invalid-verification-code") {
        alert(INVALID_CODE);
      } else {
        console.log(FIREBASE_LINKING_ERROR);
      }
    } finally {
      setLoading(false);
    }
  };

  const cancelVerification = async () => {
    await auth().currentUser.delete();
    navigation.navigate("SignUpPage");
  };

  const sendOtp = async () => {
    const confirmation = await auth().verifyPhoneNumber(`+91${mobile}`);
    console.log("sent!");
    setConfirm(confirmation);
  };

  useEffect(() => {
    sendOtp();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Pressable onPress={cancelVerification}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
        <Text style={styles.title}>Verify Phone</Text>
      </View>
      <View style={styles.bodyContainer}>
        <OTPInput otp={otp} setOtp={setOtp} otpLength={otpLength} />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0B6EFD" />
      ) : (
        <View style={styles.bottomContainer}>
          <Button
            label={"Verify"}
            height={60}
            theme="primary"
            onPress={handleVerifyOtp}
          />
          <Button
            label={"Change Mobile Number"}
            height={60}
            theme="secondary"
            onPress={cancelVerification}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: Dimensions.get("screen").width,
    height: "100%",
    backgroundColor: "#fff",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "8%",
    alignItems: "flex-end",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: getFontSize(20),
    fontWeight: "bold",
    marginLeft: 10,
  },
  bodyContainer: {
    display: "flex",
    width: "100%",
    alignItems: "stretch",
    minHeight: "75%",
    paddingHorizontal: 20,
  },
  bottomContainer: {
    display: "flex",
    width: "100%",
    alignItems: "stretch",
    height: "17%",
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
  input: {
    height: 60,
    borderRadius: 10,
    fontSize: getFontSize(24),
    borderWidth: 1,
  },
});
