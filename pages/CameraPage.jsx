import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import TakePicture from "../components/TakePicture";
import MiniLogo from "../assets/mini_logo.svg";

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
          fontSize: 24,
          flexWrap: "wrap",
          flexDirection: "row",
          width: 230,
          height: 65,
        }}
      >
        Drop your luggage with <MiniLogo width={84} height={34} />
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
