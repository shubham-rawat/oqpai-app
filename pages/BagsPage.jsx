import { useState } from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";
import { useDispatch } from "react-redux";
import { setDateTime } from "../store/userDataSlice";
import { combineDateTime } from "../utils/DateTimeUtils";
// custom components
import Button from "../components/Button";
import Seperator from "../components/Seperator";
import CustomDateTimePicker from "../components/CustomDateTimePicker";
import { getFontSize } from "../utils/FontScaling";

export default function BagsPage({ navigation }) {
  const [bags, setBags] = useState();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const dispatch = useDispatch();

  const handleContinue = () => {
    if (bags > 2 || bags < 1) {
      alert("Number of bags should be 1 or 2");
    } else {
      const dropDateTime = combineDateTime(date, time);
      const pickupDateTime = new Date();
      dispatch(setDateTime({ bags, dropDateTime, pickupDateTime }));
      navigation.navigate("CameraPage");
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
        Select
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
    fontSize: getFontSize(18),
    height: 60,
  },
});
