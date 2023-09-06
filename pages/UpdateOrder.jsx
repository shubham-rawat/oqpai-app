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
  DropDateTimeComponent,
} from "../components/OrderDetailsComponents";
import { useEffect, useState } from "react";
import { orderDetails, requestDropOff } from "../apis/userApi";
import { combineDateTime } from "../utils/DateTimeUtils";

export default function UpdateOrder({ navigation, route }) {
  const { currentRequestId } = route.params;
  const [orderData, setOrderData] = useState({});
  const [loading, setLoading] = useState(false);
  // set the order data
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        let tempdata = await orderDetails(currentRequestId);
        console.log(tempdata);
        setOrderData(tempdata);
        console.log("set the current order data");
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const dropNow = async () => {
    try {
      const res = await requestDropOff(currentRequestId);
      console.log(res);
      navigation.navigate("EtaPage", { requestId: currentRequestId });
    } catch (error) {
      alert("Something went wrong");
    }
  };
  const updateDrop = () => {
    navigation.navigate("UpdateDestination", { orderData, currentRequestId });
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
          numberOfBags={orderData?.number_of_bags}
          packageName={"Daily Package"}
        />
        <LocationComponent
          pickupLocation={orderData?.pickup_text_address}
          dropLocation={orderData?.destination_text_address}
        />
        <DropDateTimeComponent
          date={orderData?.destination_date}
          time={orderData?.destination_time}
        />
        <BillingComponent cost={orderData?.total_cost} tax={0} />
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
