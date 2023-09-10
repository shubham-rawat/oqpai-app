import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import TakePicture from "../components/TakePicture";
import { getFontSize } from "../utils/FontScaling";
import { createRequest } from "../apis/userApi";
import { useSelector } from "react-redux";
import { UNKNOWN_ERROR } from "../constants/ErrorMessages";

export default function CameraPage({ navigation }) {
  const [photo, setPhoto] = useState(null);
  const data = useSelector((state) => state.userData);

  const placeOrder = async () => {
    const requestdata = new FormData();
    try {
      requestdata.append("username", data.email);
      requestdata.append("pickup_text_address", data.location.pickup);
      requestdata.append("destination_text_address", data.location.drop);
      requestdata.append(
        "pickup_latitude",
        data.location.pickupCoords.latitude
      );
      requestdata.append(
        "pickup_longitude",
        data.location.pickupCoords.longitude
      );
      requestdata.append(
        "destination_latitude",
        data.location.dropCoords.latitude
      );
      requestdata.append(
        "destination_longitude",
        data.location.dropCoords.longitude
      );
      requestdata.append(
        "pickup_date",
        data.dateTime.pickup.toLocaleDateString("it-IT")
      );
      requestdata.append(
        "pickup_time",
        data.dateTime.pickup?.toLocaleTimeString("it-IT")
      );
      requestdata.append(
        "destination_date",
        data.dateTime.drop.toLocaleDateString("it-IT")
      );
      requestdata.append(
        "destination_time",
        data.dateTime.drop?.toLocaleTimeString("it-IT")
      );
      requestdata.append("number_of_bags", data.bags);
      requestdata.append("image", {
        name: "luggage_image.jpg",
        uri: photo.uri,
        type: "image/jpg",
      });
      const res = await createRequest(requestdata);
      console.log(res);
      await navigation.navigate("OrderSummary", {
        cost: res.Total_Cost,
        tax: res.Tax,
        requestId: res.Request_ID,
      });
    } catch (error) {
      console.log(error);
      alert(UNKNOWN_ERROR);
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
        pictureSaved={placeOrder}
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
