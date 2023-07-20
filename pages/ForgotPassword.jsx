import { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text } from "react-native";
import Button from "../components/Button";
import TextField from "../components/TextField";
import OTPInput from "../components/OTPInput";

export default function ForgotPassword() {
  const [mobile, setMobile] = useState("");
  const otpLength = 4;
  const [otp, setOtp] = useState(Array(4).fill(""));
  const [otpSent, setOtpSent] = useState(false);

  const forgotPasswordHandler = () => {
    console.log(mobile);
    setOtpSent(true);
  };

  const message1 =
    "Please enter your phone number for the verification process.";
  const message2 = "Create a new login password.";

  return (
    <KeyboardAvoidingView
      behavior={"padding"}
      style={styles.keyboardSafeContainer}
    >
      {!otpSent && <Text>{message1}</Text>}
      {!otpSent ? (
        <TextField
          value={mobile}
          onChangeText={setMobile}
          placeholder="Registered Mobile Number"
          keyboardType="numeric"
        />
      ) : (
        <OTPInput otp={otp} otpLength={otpLength} setOtp={setOtp} />
      )}
      <Button
        theme={"primary"}
        label={"Continue"}
        onPress={forgotPasswordHandler}
        height={60}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardSafeContainer: {
    height: "100%",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
