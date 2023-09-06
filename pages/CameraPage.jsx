import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import TakePicture from "../components/TakePicture";
import { getFontSize } from "../utils/FontScaling";
import { createRequest } from "../apis/userApi";
import { useSelector } from "react-redux";

export default function CameraPage({ navigation }) {
  const [photo, setPhoto] = useState(null);
  const data = useSelector((state) => state.userData);
  const pictureSaved = () => {
    placeOrder();
  };

  const placeOrder = async () => {
    try {
      const res = await createRequest({
        username: data.email,
        pickup_text_address: data.location.pickup,
        destination_text_address: data.location.drop,
        pickup_latitude: data.location.pickupCoords.latitude,
        pickup_longitude: data.location.pickupCoords.longitude,
        destination_latitude: data.location.dropCoords.latitude,
        destination_longitude: data.location.dropCoords.longitude,
        pickup_date: data.dateTime.pickup,
        pickup_time: data.dateTime.pickup?.toLocaleTimeString("it-IT"),
        destination_date: data.dateTime.drop,
        destination_time: data.dateTime.drop?.toLocaleTimeString("it-IT"),
        // bags_image: photo?.base64,
        // bags_image:
        //   "hdgagdagdagdagdagagdagdadagdhjgdaagdagdagjgjagdjagdjagdahjgd",
        image: photo,
        number_of_bags: data.bags,
      });
      console.log(res);
      await navigation.navigate("OrderSummary", {
        cost: res.Total_Cost,
        tax: res.Tax,
        requestId: res.Request_ID,
      });
    } catch (error) {
      alert("Something went wrong!");
    }
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
