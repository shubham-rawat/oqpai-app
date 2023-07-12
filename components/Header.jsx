import { StyleSheet, Text, View, Platform } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Logo from "../assets/mini_logo.svg";

export default function Header({ navigation, route, options }) {
  return (
    <View
      style={[
        styles.header,
        styles.generateBoxShadowStyle(0, 8, "#000", 0.25, 3, 15, "#000"),
      ]}
    >
      <Logo width={84} height={34} />
      <Ionicons name="notifications-outline" size={24} color="black" />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: 20,
    width: "100%",
    height: 96,
  },
  generateBoxShadowStyle: (
    xOffset,
    yOffset,
    shadowColorIos,
    shadowOpacity,
    shadowRadius,
    elevation,
    shadowColorAndroid
  ) => {
    if (Platform.OS === "ios") {
      styles.boxShadow = {
        shadowColor: shadowColorIos,
        shadowOffset: { width: xOffset, height: yOffset },
        shadowOpacity,
        shadowRadius,
      };
    } else if (Platform.OS === "android") {
      styles.boxShadow = {
        elevation,
        shadowColor: shadowColorAndroid,
      };
    }
  },
});
