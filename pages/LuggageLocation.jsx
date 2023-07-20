import React, { useState } from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";
import { useDispatch } from "react-redux";
import { setLocation } from "../store/userDataSlice";

// custom components
import Button from "../components/Button";
import Seperator from "../components/Seperator";
import MapComponent from "../components/MapComponent";
import MiniLogo from "../assets/mini_logo.svg";

export default function LuggageLocation({ navigation }) {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const dispatch = useDispatch();

  const sendLocation = () => {
    dispatch(setLocation({ pickup, drop }));
    navigation.navigate("Bags");
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
      <View style={styles.locationForm}>
        <TextInput
          value={pickup}
          onChangeText={setPickup}
          placeholder="Pickup from"
          style={styles.locationInput}
          clearButtonMode="while-editing"
        />
        <Seperator color="black" textWidth={0} type="dashed" />
        <TextInput
          value={drop}
          onChangeText={setDrop}
          placeholder="Drop-off at"
          style={styles.locationInput}
          clearButtonMode="while-editing"
        />
      </View>
      <Button
        label={"Continue"}
        height={60}
        theme="primary"
        onPress={sendLocation}
      />
      <MapComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    paddingHorizontal: 20,
    alignItems: "stretch",
  },
  locationForm: {
    display: "flex",
    alignItems: "stretch",
    borderWidth: 1,
    borderRadius: 18,
    marginVertical: 20,
  },
  locationInput: {
    borderWidth: 0,
    padding: 10,
    fontSize: 18,
    height: 60,
  },
});
