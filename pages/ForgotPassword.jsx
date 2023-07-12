import { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text } from "react-native";
import Button from "../components/Button";
import TextField from "../components/TextField";

export default function ForgotPassword() {
  const [mobile, setMobile] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const forgotPasswordHandler = () => {
    console.log(mobile);
    setOtpSent(true);
  };

  const message1 =
    "Please enter your phone number for the verification process.";
  const message2 =
    "Enter the 4-Digit code that we’ve sent to your registered Number.";
  const message3 = "Create a new login password.";

  return (
    <KeyboardAvoidingView
      behavior={"padding"}
      style={styles.keyboardSafeContainer}
    >
      <Text>{!otpSent ? message1 : message2}</Text>
      <TextField
        value={mobile}
        onChangeText={setMobile}
        placeholder="Registered Mobile Number"
        keyboardType="numeric"
      />
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
