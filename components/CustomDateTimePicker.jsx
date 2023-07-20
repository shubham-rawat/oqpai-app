import { useState } from "react";
import { StyleSheet, Pressable, TextInput } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function CustomDateTimePicker({
  pickerType = "date",
  style,
  placeholder = "Select Date",
  value,
  setValue,
}) {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedData, setSelectedData] = useState("");

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }, selectedDateTime) => {
    if (type === "set") {
      setValue(selectedDateTime);
      if (pickerType === "date") {
        setSelectedData(selectedDateTime.toDateString());
      } else if (pickerType === "time") {
        setSelectedData(selectedDateTime.toTimeString());
      }
    }
    togglePicker();
  };

  return (
    <>
      {!showPicker && (
        <Pressable onPress={togglePicker}>
          <TextInput
            value={selectedData}
            placeholder={placeholder}
            style={[style, { color: "black" }]}
            clearButtonMode="while-editing"
            editable={false}
            onPressIn={togglePicker}
          />
        </Pressable>
      )}
      {showPicker && (
        <DateTimePicker
          mode={pickerType}
          value={value}
          display="spinner"
          onChange={onChange}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  dateTimeinput: {},
});
