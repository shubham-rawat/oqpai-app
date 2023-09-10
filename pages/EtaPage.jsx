import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getFontSize } from "../utils/FontScaling";
import { useDispatch } from "react-redux";
import {
  BagDetailsComponent,
  DriverDetails,
  LocationComponent,
} from "../components/OrderDetailsComponents";
import Button from "../components/Button";
import { clearFormData } from "../store/userDataSlice";
import { orderDetails } from "../apis/userApi";
import CountdownTimer from "../components/CountdownTimer";

export default function EtaPage({ navigation, route }) {
  const { requestId } = route.params;
  const [loading, setLoading] = useState(true);
  const [driver, setDriver] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(async () => {
      const driverData = await orderDetails(requestId);
      console.log("driver data updated", driverData);
      if (driverData.username_of_driver) {
        setDriver({ ...driverData });
        setLoading(false);
      }
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const backToHome = () => {
    // dispatch(clearFormData());
    navigation.navigate("MainPage", { screen: "History" });
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <>
          <ActivityIndicator size={"large"} color={"grey"} />
          <Text style={styles.sectionHeading}>Searching for drivers</Text>
        </>
      ) : (
        <>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Order Confirmed</Text>
          </View>
          <ScrollView contentContainerStyle={styles.bodyContainer}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionHeading}>ETA</Text>
              <CountdownTimer countdownSeconds={driver.eta_time} />
            </View>
            <BagDetailsComponent
              numberOfBags={driver?.number_of_bags}
              packageName={"Daily Package"}
            />
            <LocationComponent
              pickupLocation={driver?.pickup_text_address}
              dropLocation={driver?.destination_text_address}
            />
            <DriverDetails name={driver?.firstname_of_driver} />
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionHeading}>OTP</Text>
              <Text style={styles.timerContainer}>{driver?.otps}</Text>
            </View>
          </ScrollView>
          <View style={styles.bottomContainer}>
            <Button
              size={60}
              theme="primary"
              label={"Go to orders"}
              onPress={backToHome}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: Dimensions.get("screen").width,
    height: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
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
  sectionContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    borderBottomWidth: 1,
    borderColor: "#EDEDED",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  sectionHeading: {
    fontWeight: "700",
    fontSize: getFontSize(22),
    color: "#3C3C3C",
    textAlign: "center",
  },
  timerContainer: {
    display: "flex",
    backgroundColor: "#EDEDED",
    borderRadius: 6,
    padding: 10,
    fontWeight: "700",
    fontFamily: "monospace",
    fontSize: getFontSize(32),
    alignSelf: "center",
    color: "#3C3C3C",
  },
});
