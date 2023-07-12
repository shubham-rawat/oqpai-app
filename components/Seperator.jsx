import { StyleSheet, View, Text } from "react-native";

export default function Seperator({
  text = "",
  color = "black",
  textWidth = 30,
  type = "normal",
}) {
  if (type === "normal") {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ flex: 1, height: 2, backgroundColor: color }} />
        <View>
          <Text
            style={{
              width: textWidth,
              textAlign: "center",
              color: color,
              fontSize: 18,
              fontWeight: 500,
            }}
          >
            {text}
          </Text>
        </View>
        <View style={{ flex: 1, height: 2, backgroundColor: color }} />
      </View>
    );
  } else if (type === "dashed") {
    return (
      <View
        style={{
          width: "100%",
          height: 1,
          borderBottomWidth: 1,
          borderStyle: "dashed",
        }}
      />
    );
  }
}

const styles = StyleSheet.create({});
