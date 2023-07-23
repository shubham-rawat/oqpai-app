import { useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { setUserData } from "../store/userDataSlice";
import { firebaseAuth } from "../firebase.config";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import Button from "../components/Button";
import OTPInput from "../components/OTPInput";
import { useEffect } from "react";

export default function VerifyPhone({ route, navigation }) {
  const { email, mobile, name } = route.params;
  const otpLength = 6;
  const [otp, setOtp] = useState(Array(otpLength).fill(""));
  const [confirmation, setConfirmation] = useState();
  const dispatch = useDispatch();

  // const verifier = new RecaptchaVerifier(firebaseAuth, "sign-in-button", {
  //   size: "invisible",
  //   callback: (response) => {},
  // });

  const handleVerifyOtp = (otp) => {
    // confirmation
    //   .confirm(otp.join(""))
    //   .then((user) => {
    //     // this.setState({ userId: user.uid });
    //     console.log(user);
    //     alert(`Verified! ${user.uid}`);
    //   })
    //   .catch((error) => {
    //     alert(error.message);
    //     console.log(error);
    //   });
    dispatch(setUserData({ email: email, name: name }));
    navigation.navigate("MainPage");
  };

  // const sendOtp = () => {
  //   try {
  //     signInWithPhoneNumber(firebaseAuth, mobile, verifier).then(
  //       (confirmationResult) => setConfirmation(confirmationResult)
  //     );
  //   } catch (error) {
  //     alert("Error sending OTP");
  //   }
  // };

  // useEffect(sendOtp, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
        <Text style={styles.title}>Verify Phone</Text>
      </View>
      <View style={styles.bodyContainer}>
        <OTPInput otp={otp} setOtp={setOtp} otpLength={otpLength} />
        <Button
          label={"Verify"}
          height={60}
          theme="primary"
          onPress={() => handleVerifyOtp(otp)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    // padding: 30,
    paddingTop: 20,
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "10%",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  bodyContainer: {
    display: "flex",
    width: "100%",
    height: "90%",
    alignItems: "stretch",
    padding: 20,
    justifyContent: "space-between",
  },
  input: {
    height: 60,
    borderRadius: 10,
    fontSize: 24,
    borderWidth: 1,
  },
});
