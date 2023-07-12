import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Button({
  label,
  theme = "primary",
  onPress,
  height = 50,
}) {
  const colorScheme = {
    background: "",
    foreground: "",
  };
  let borderColor = "none";
  let borderWidth = 0;
  switch (theme) {
    case "primary":
      colorScheme.background = "#0B6EFD";
      colorScheme.foreground = "#fff";
      break;
    case "secondary":
      colorScheme.background = "#E9E9E9";
      colorScheme.foreground = "#000";
      break;
    case "blank":
      colorScheme.background = "#fff";
      colorScheme.foreground = "#C4C4C4";
      borderColor = "#C4C4C4";
      borderWidth = 1;
      break;
    default:
      colorScheme.background = "#0B6EFD";
      colorScheme.foreground = "#fff";
      break;
  }
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={[
          styles.button,
          {
            backgroundColor: colorScheme.background,
            height: height,
            borderColor: borderColor,
            borderWidth: borderWidth,
          },
        ]}
        onPress={onPress}
      >
        <Text style={[styles.buttonLabel, { color: colorScheme.foreground }]}>
          {label}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    display: "flex",
  },
  button: {
    borderRadius: 14,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonLabel: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
