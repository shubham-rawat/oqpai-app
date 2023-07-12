import { useEffect, useState, useRef } from "react";
import { TextInput, StyleSheet, Text, View } from "react-native";

export default function OTPInput({ otp, setOtp, length, onComplete }) {
  const [timer, setTimer] = useState(59);
  const otpInputs = Array(length).fill(useRef());

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp.join(""));

    if (value !== "" && index < length - 1) {
      otpInputs[0].current.focus();
    }

    // If the OTP length is equal to the desired length, trigger the onComplete callback
    if (newOtp.length === length) {
      onComplete(newOtp.join(""));
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
      <Text>Kindly check your phone for the verification code</Text>
      <View style={styles.otpContainer}>
        {Array(length)
          .fill()
          .map((_, idx) => (
            <TextInput
              key={idx}
              style={styles.input}
              onChangeText={(value) => handleOtpChange(value, idx)}
              value={otp[idx] || ""}
              maxLength={1}
              keyboardType="numeric"
              ref={otpInputs[idx]}
            />
          ))}
      </View>
      <Text>
        Didn't recieve the code?{" "}
        <Text style={{ color: `${timer > 0 ? "black" : "#0B6EFD"}` }}>
          Resend Code
          {timer > 0 && ` in 0:${timer}`}
        </Text>
      </Text>
      <Text style={{ color: "#0B6EFD" }}>Get via call</Text>
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
    width: 40,
    height: 40,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "black",
    fontSize: 20,
    textAlign: "center",
  },
});
