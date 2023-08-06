import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getFontSize } from "../utils/FontScaling";

export default function TextField({
  value,
  onChangeText,
  placeholder,
  autoCapitalize = "none",
  keyboardType = "default",
  secure = false,
}) {
  const [focus, setFocus] = useState(false);
  const [isVisible, setIsVisible] = useState(secure);

  return (
    <View style={styles.fieldContainer}>
      <TextInput
        style={[styles.textField, focus && styles.focused]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        secureTextEntry={isVisible}
      />

      {secure && (
        <Ionicons
          name={isVisible ? "ios-eye-outline" : "ios-eye-off-outline"}
          color={"black"}
          size={24}
          style={{ position: "relative", right: 35 }}
          onPress={() => setIsVisible(!isVisible)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  fieldContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderWidth: 0,
  },
  textField: {
    width: "100%",
    height: 50,
    borderWidth: 0,
    paddingHorizontal: 30,
    paddingVertical: 10,
    fontSize: getFontSize(14),
    backgroundColor: "#EEEEFA",
    borderRadius: 10,
  },
  focused: {
    color: "#000",
    backgroundColor: "#fff",
    borderColor: "#0B6EFD",
    borderWidth: 1,
  },
});
