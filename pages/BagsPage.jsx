import { useState } from "react";
import { StyleSheet, View, TextInput, Pressable, Text } from "react-native";
import MiniLogo from "../assets/mini_logo.svg";

// custom components
import Button from "../components/Button";
import Seperator from "../components/Seperator";
import TakePicture from "../components/TakePicture";

export default function BagsPage({ navigation }) {
  const [bags, setBags] = useState("0");
  const [photo, setPhoto] = useState(null);

  const [part, setPart] = useState(1);

  // for date picker
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [dropDate, setDropDate] = useState("");

  const toggleDatePicker = () => {
    setShowDate(!showDate);
  };

  const onDateChange = ({ type }, selectedDate) => {
    if (type === "set") {
      setDate(selectedDate);
      setDropDate(selectedDate.toDateString());
    }
    toggleDatePicker();
  };

  const handleContinue = () => {
    setPart(2);
  };

  const pictureSaved = () => {
    setPart(3);
  };

  const placeOrder = () => {
    navigation.navigate("OrderSummary");
  };

  const form1 = (
    <>
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
        {!showDate && (
          <Pressable onPress={toggleDatePicker}>
            <TextInput
              value={dropDate}
              placeholder="Drop-off Date & Time"
              style={styles.locationInput}
              clearButtonMode="while-editing"
              editable={false}
              onPressIn={toggleDatePicker}
            />
          </Pressable>
        )}
        {showDate && (
          <DateTimePicker
            mode="date"
            value={date}
            display="calendar"
            onChange={onDateChange}
          />
        )}
      </View>
      <Button
        label={"Take Picture"}
        height={60}
        theme="primary"
        onPress={handleContinue}
      />
    </>
  );

  const form2 = (
    <TakePicture
      photo={photo}
      setPhoto={setPhoto}
      pictureSaved={pictureSaved}
    />
  );

  const form3 = (
    <View style={styles.locationForm}>
      <Button
        label={"Place Order"}
        height={60}
        theme="primary"
        onPress={placeOrder}
      />
    </View>
  );

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
      {part === 1 ? form1 : part === 2 ? form2 : form3}
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
