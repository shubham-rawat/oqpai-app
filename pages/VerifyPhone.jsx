import { useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "../components/Button";
// import OTPInput from "../components/OTPInput";

export default function VerifyPhone({ navigation }) {
  const [otp, setOtp] = useState("");

  const handleVerifyOtp = (otp) => {
    Alert.alert("OTP", otp);
    navigation.navigate("MainPage");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <MaterialIcons name="keyboard-arrow-left" color="#000" size={24} />
        <Text style={styles.title}>Verify Phone</Text>
      </View>
      <View style={styles.bodyContainer}>
        <Text>Enter OTP</Text>
        <TextInput
          value={otp}
          onChangeText={setOtp}
          keyboardType="numeric"
          style={styles.input}
          textAlign="center"
          maxLength={4}
        />
        {/* <OTPInput
          otp={otp}
          setOtp={setOtp}
          length={4}
          onComplete={handleVerifyOtp}
        /> */}
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
    padding: 30,
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "10%",
    paddingVertical: 20,
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  bodyContainer: {
    display: "flex",
    width: "100%",
    height: "90%",
    alignItems: "stretch",
    paddingVertical: 20,
    justifyContent: "space-between",
  },
  input: {
    height: 60,
    borderRadius: 10,
    fontSize: 24,
    borderWidth: 1,
  },
});
