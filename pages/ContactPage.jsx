import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  Linking,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { getFontSize } from "../utils/FontScaling";

export default function ContactPage({ navigation }) {
  const opneEmail = () => {
    Linking.openURL("mailto:contact.oqpai@gmail.com");
  };
  const opnenDialer = () => {
    Linking.openURL("tel:+91-9472003529");
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
        <Text style={styles.title}>Contact Us</Text>
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.msg}>For any queries, please write to us at</Text>
        <Text onPress={opneEmail} style={[styles.msg, styles.email]}>
          contact.oqpai@gmail.com
        </Text>
        <Text style={styles.msg}>or</Text>
        <Text style={styles.msg}>Contact us at</Text>
        <Text onPress={opnenDialer} style={[styles.msg, styles.phone]}>
          +91 9472003529
        </Text>
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
    alignItems: "center",
    justifyContent: "center",
    minHeight: "92%",
    paddingHorizontal: 20,
  },
  msg: {
    fontSize: getFontSize(20),
    marginVertical: 5,
  },
  email: {
    fontWeight: 700,
    textDecorationLine: "underline",
    color: "dodgerblue",
    padding: 5,
    borderRadius: 5,
    backgroundColor: "lightgray",
  },
  phone: {
    fontWeight: 700,
    color: "dodgerblue",
    padding: 5,
    borderRadius: 5,
    backgroundColor: "lightgray",
  },
});
