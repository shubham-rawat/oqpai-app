import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import TakePicture from "../components/TakePicture";
import { getFontSize } from "../utils/FontScaling";

export default function CameraPage({ navigation }) {
  const [photo, setPhoto] = useState(null);

  const pictureSaved = () => {
    placeOrder();
  };

  const placeOrder = () => {
    navigation.navigate("OrderSummary");
  };

  return (
    <View style={styles.formContainer}>
      <Text
        style={{
          fontSize: getFontSize(24),
          flexWrap: "wrap",
          flexDirection: "row",
          paddingVertical: 10,
          color: "#3C3C3C",
        }}
      >
        Take a pictue
      </Text>
      <TakePicture
        photo={photo}
        setPhoto={setPhoto}
        pictureSaved={pictureSaved}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    paddingHorizontal: 20,
  },
});
