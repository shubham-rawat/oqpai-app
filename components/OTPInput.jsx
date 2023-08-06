import { useEffect, useState, useRef } from "react";
import { TextInput, StyleSheet, Text, View } from "react-native";
import { getFontSize } from "../utils/FontScaling";

export default function OTPInput({ otp, setOtp, otpLength }) {
  const [timer, setTimer] = useState(59);
  const otpInputRefs = useRef([]);

  const handleOnChangeText = (text, index) => {
    // Update the OTP array with the new input value
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Focus on the next input field (if available)
    if (text !== "" && index < otpLength - 1) {
      otpInputRefs.current[index + 1].focus();
    }
  };

  const handleOnKeyPress = ({ nativeEvent }, index) => {
    // Handle backspace to move to the previous input field (if available)
    if (nativeEvent.key === "Backspace" && index > 0 && otp[index] === "") {
      otpInputRefs.current[index - 1].focus();
    }
  };

  // 60 second timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          clearInterval(interval);
          return prevTimer;
        }
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View style={styles.otpMainContainer}>
      <Text style={styles.message}>
        Kindly check your phone for the verification code
      </Text>
      <View style={styles.otpContainer}>
        {otp.map((value, index) => (
          <TextInput
            key={index}
            ref={(ref) => (otpInputRefs.current[index] = ref)}
            style={styles.input}
            value={value}
            onChangeText={(text) => handleOnChangeText(text, index)}
            onKeyPress={(event) => handleOnKeyPress(event, index)}
            maxLength={1}
            keyboardType="numeric"
            autoFocus={index === 0}
            selectTextOnFocus
          />
        ))}
      </View>
      <Text style={styles.message}>
        Didn't recieve the code?{" "}
        <Text style={{ color: `${timer > 0 ? "black" : "#0B6EFD"}` }}>
          Resend Code
          {timer > 0 && ` in 0:${timer}`}
        </Text>
      </Text>
      <Text style={[styles.message, { color: "#0B6EFD" }]}>Get via call</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  otpMainContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  otpContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: 60,
    height: 60,
    borderRadius: 4,
    marginHorizontal: 5,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: "#E5E3F1",
    fontSize: getFontSize(20),
    textAlign: "center",
    backgroundColor: "#E5E3F1",
  },
  message: {
    color: "#555555",
    fontSize: getFontSize(18),
    marginBottom: 10,
  },
});
