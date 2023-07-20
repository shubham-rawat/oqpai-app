import { useState } from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";
import { useDispatch } from "react-redux";
import { setDateTime } from "../store/userDataSlice";
import { combineDateTime, convertUtcToLocal } from "../utils/DateTimeUtils";
// custom components
import MiniLogo from "../assets/mini_logo.svg";
import Button from "../components/Button";
import Seperator from "../components/Seperator";
import CustomDateTimePicker from "../components/CustomDateTimePicker";

export default function BagsPage({ navigation }) {
  const [bags, setBags] = useState();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const dispatch = useDispatch();

  const handleContinue = () => {
    const dropDateTime = convertUtcToLocal(combineDateTime(date, time));
    const pickupDateTime = convertUtcToLocal(new Date());
    dispatch(setDateTime({ bags, dropDateTime, pickupDateTime }));
    navigation.navigate("CameraPage");
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
          value={bags}
          onChangeText={setBags}
          placeholder="Number Of bags"
          style={styles.locationInput}
          clearButtonMode="while-editing"
          keyboardType="numeric"
        />
        <Seperator color="black" textWidth={0} type="dashed" />
        <CustomDateTimePicker
          pickerType="date"
          style={styles.locationInput}
          placeholder={"Drop-off Date"}
          value={date}
          setValue={setDate}
        />
        <Seperator color="black" textWidth={0} type="dashed" />
        <CustomDateTimePicker
          pickerType="time"
          style={styles.locationInput}
          placeholder={"Drop-off Time"}
          value={time}
          setValue={setTime}
        />
      </View>
      <Button
        label={"Take Picture"}
        height={60}
        theme="primary"
        onPress={handleContinue}
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
