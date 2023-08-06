import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  ScrollView,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { getFontSize } from "../utils/FontScaling";
import { StatusBar } from "expo-status-bar";
// custom compnents
import Button from "../components/Button";
import {
  BagDetailsComponent,
  LocationComponent,
  HoldingTimeComponent,
  BillingComponent,
} from "../components/OrderDetailsComponents";

export default function UpdateOrder({ navigation, route }) {
  const { orderData } = route.params;
  const dropNow = () => {};
  const updateDrop = () => {
    navigation.navigate("UpdateDestination", { orderData });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated style="auto" />
      <View style={styles.titleContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
        <Text style={styles.title}>Update Order</Text>
      </View>
      <ScrollView contentContainerStyle={styles.bodyContainer}>
        <BagDetailsComponent
          numberOfBags={orderData?.bags}
          packageName={"Daily Package"}
        />
        <LocationComponent
          pickupLocation={orderData?.location.pickup}
          dropLocation={orderData?.location.drop}
        />
        <HoldingTimeComponent
          pickDateTime={orderData?.dateTime.pickup}
          dropDateTime={orderData?.dateTime.drop}
        />
        <BillingComponent />
      </ScrollView>
      <View style={styles.bottomContainer}>
        <Button
          size={60}
          theme="primary"
          label={"Update Drop Location"}
          onPress={updateDrop}
        />
        <Button
          size={60}
          theme="primary"
          label={"Drop Now"}
          onPress={dropNow}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: Dimensions.get("screen").width,
    height: "100%",
    backgroundColor: "#fff",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "8%",
    alignItems: "flex-end",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: getFontSize(20),
    fontWeight: "bold",
    marginLeft: 10,
  },
  bodyContainer: {
    display: "flex",
    width: "100%",
    alignItems: "stretch",
    minHeight: "75%",
  },
  bottomContainer: {
    display: "flex",
    width: "100%",
    alignItems: "stretch",
    height: "17%",
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
});
