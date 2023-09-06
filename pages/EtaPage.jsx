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
import { StatusBar } from "expo-status-bar";
import { getFontSize } from "../utils/FontScaling";
import { useDispatch, useSelector } from "react-redux";
import {
  BagDetailsComponent,
  DriverDetails,
  LocationComponent,
} from "../components/OrderDetailsComponents";
import Button from "../components/Button";
import { clearFormData } from "../store/userDataSlice";
import { orderDetails } from "../apis/userApi";

export default function EtaPage({ navigation, route }) {
  const { requestId } = route.params;
  const data = useSelector((state) => state.userData);
  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState({
    min: 15,
    sec: 64,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(async () => {
      const driverData = await orderDetails(requestId);
      console.log("name of driver", driverData.username_of_driver);
      if (driverData.username_of_driver) {
        setLoading(false);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer.sec > 0) {
          return { min: prevTimer.min, sec: prevTimer.sec - 1 };
        } else if (prevTimer.sec === 0) {
          return { min: prevTimer.min - 1, sec: 59 };
        }
        if (prevTimer.min === 0 && prevTimer.sec === 0) {
          clearInterval(interval);
          return prevTimer;
        }
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const backToHome = () => {
    // dispatch(clearFormData());
    navigation.navigate("MainPage", { screen: "History" });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated style="auto" />
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
              <Text style={styles.timerContainer}>
                {timer.min} : {timer.sec}
              </Text>
            </View>
            <BagDetailsComponent
              numberOfBags={data?.bags}
              packageName={"Daily Package"}
            />
            <LocationComponent
              pickupLocation={data?.location.pickup}
              dropLocation={data?.location.drop}
            />
            <DriverDetails />
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionHeading}>OTP</Text>
              <Text style={styles.timerContainer}>123456</Text>
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
