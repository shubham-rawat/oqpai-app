import { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useDispatch } from "react-redux";
import { setUserData } from "../store/userDataSlice";
// firebase authentication
import auth from "@react-native-firebase/auth";
// components
import Button from "../components/Button";
import OTPInput from "../components/OTPInput";
import { getFontSize } from "../utils/FontScaling";

export default function VerifyPhone({ route, navigation }) {
  const { email, mobile, name } = route.params;
  const otpLength = 6;
  const [otp, setOtp] = useState(Array(otpLength).fill(""));
  const [confirm, setConfirm] = useState(null);

  const dispatch = useDispatch();

  const handleVerifyOtp = async () => {
    try {
      const credential = auth.PhoneAuthProvider.credential(
        confirm.verificationId,
        otp.join("")
      );
      let userData = await auth().currentUser.linkWithCredential(credential);
      dispatch(
        setUserData({
          email: email,
          name: name,
          mobile: userData.user.phoneNumber,
        })
      );
    } catch (error) {
      if (error.code == "auth/invalid-verification-code") {
        alert("Invalid code.");
      } else {
        console.log("Account linking error");
      }
    }
  };

  const sendOtp = async () => {
    const confirmation = await auth().verifyPhoneNumber(`+91${mobile}`);
    setConfirm(confirmation);
  };

  useEffect(sendOtp, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated style="auto" />
      <View style={styles.titleContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
        <Text style={styles.title}>Verify Phone</Text>
      </View>
      <View style={styles.bodyContainer}>
        <OTPInput otp={otp} setOtp={setOtp} otpLength={otpLength} />
      </View>
      <View style={styles.bottomContainer}>
        <Button
          label={"Verify"}
          height={60}
          theme="primary"
          onPress={handleVerifyOtp}
        />
      </View>
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
