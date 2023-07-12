import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "../components/Button";

export default function OrderSummary({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <MaterialIcons name="keyboard-arrow-left" color="#000" size={24} />
        </Pressable>
        <Text style={styles.title}>Order Summary</Text>
      </View>
      <View style={styles.bodyContainer}>
        <Button
          size={60}
          theme="primary"
          label={"Proceed To Pay"}
          onPress={() => console.log("Proceed")}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "10%",
    paddingVertical: 20,
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  bodyContainer: {
    display: "flex",
    width: "100%",
    height: "90%",
    alignItems: "stretch",
    padding: 20,
    justifyContent: "space-between",
  },
});
