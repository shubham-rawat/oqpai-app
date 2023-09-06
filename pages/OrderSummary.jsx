import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  ScrollView,
  Dimensions,
} from "react-native";
import { useSelector } from "react-redux";
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
import { placeNewOrder } from "../apis/userApi";

export default function OrderSummary({ route, navigation }) {
  const { cost, tax, requestId } = route.params;
  const data = useSelector((state) => state.userData);
  const placeOrder = async () => {
    console.log(requestId);
    try {
      const res = await placeNewOrder(requestId);
      console.log(res);
      navigation.navigate("EtaPage", { requestId });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated style="auto" />
      <View style={styles.titleContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
        <Text style={styles.title}>Order Summary</Text>
      </View>
      <ScrollView contentContainerStyle={styles.bodyContainer}>
        <BagDetailsComponent
          numberOfBags={data?.bags}
          packageName={"Daily Package"}
        />
        <LocationComponent
          pickupLocation={data?.location.pickup}
          dropLocation={data?.location.drop}
        />
        <HoldingTimeComponent
          pickDateTime={data?.dateTime.pickup}
          dropDateTime={data?.dateTime.drop}
        />
        <BillingComponent cost={cost} tax={tax} />
      </ScrollView>
      <View style={styles.bottomContainer}>
        <Button
          size={60}
          theme="primary"
          label={"Place Order"}
          onPress={placeOrder}
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
