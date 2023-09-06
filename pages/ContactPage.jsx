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

export default function ContactPage({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated style="auto" />
      <View style={styles.titleContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
        <Text style={styles.title}>Contact Us</Text>
      </View>
      <View style={styles.bodyContainer}>
        <Text>
          For any queries, please write to us at contact.oqpai@gmail.com
        </Text>
        <Text>Or</Text>
        <Text>Contact us at +91-9472003529</Text>
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
    minHeight: "92%",
    paddingHorizontal: 20,
  },
});
