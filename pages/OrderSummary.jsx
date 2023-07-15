import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Button from "../components/Button";
import DailyPackIcon from "../assets/daily_pack_logo.svg";
import PickupIcon from "../assets/pickup_location.svg";
import DropIcon from "../assets/drop_location.svg";
import ClockIcon from "../assets/clock.svg";

export default function OrderSummary({ navigation }) {
  const proceedToPay = () => {
    console.log("Proceed");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
        <Text style={styles.title}>Order Summary</Text>
      </View>
      <View style={styles.bodyContainer}>
        <BagDetailsComponent numberOfBags={4} packageName={"Daily Package"} />
        <LocationComponent
          pickupLocation={"Address 1"}
          dropLocation={"Address 2"}
        />
        <HoldingTimeComponent
          pickDateTime={new Date("2023-07-15T13:00:00")}
          dropDateTime={new Date("2023-07-15T16:30:00")}
        />
        <BillingComponent />
        <View
          style={{
            padding: 20,
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: "#FF4F4F" }}>
            You will be notified 15 mins prior to your drop off time
          </Text>
          <Text style={{ color: "#88ABDA" }}>*T&C applied</Text>
          <Button
            size={60}
            theme="primary"
            label={"Proceed To Pay"}
            onPress={proceedToPay}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

// component to display no of bags and selected package
function BagDetailsComponent({ numberOfBags, packageName }) {
  return (
    <View style={{ display: "flex", flexDirection: "row", padding: 20 }}>
      <View style={styles.packageIcon}>
        <DailyPackIcon width={80} height={80} />
      </View>
      <View style={[styles.textSection, { flex: 1 }]}>
        <Text style={{ fontWeight: "400", fontSize: 18, color: "#777777" }}>
          {packageName}
        </Text>
        <Text style={[styles.numberOfBags, styles.sectionHeading]}>
          {numberOfBags} {numberOfBags > 1 ? "luggages" : "luggage"}
        </Text>
      </View>
    </View>
  );
}

// component to display pick and drop locations
function LocationComponent({ pickupLocation, dropLocation }) {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeading}>Location</Text>
      <View style={{ flexDirection: "row", paddingVertical: 10 }}>
        <View>
          <PickupIcon width={35} height={70} />
          <DropIcon width={35} height={35} />
        </View>
        <View style={styles.textSection}>
          <View>
            <Text style={styles.label}>Pickup at</Text>
            <Text style={styles.labelData}>{pickupLocation}</Text>
          </View>
          <View>
            <Text style={styles.label}>Drop-off at</Text>
            <Text style={styles.labelData}>{dropLocation}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

// component to display pick and drop date and time
function HoldingTimeComponent({ pickDateTime, dropDateTime }) {
  const holdingTime = (dt2, dt1) => {
    let diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60 * 60;
    return Math.abs(Math.round(diff));
  };

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.holdingTimeHeadingContainer}>
        <Text style={styles.sectionHeading}>Holding Time</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ClockIcon width={30} height={30} />
          <Text style={{ fontSize: 18, fontWeight: "400", color: "#3C3C3C" }}>
            {holdingTime(pickDateTime, dropDateTime)} hours
          </Text>
        </View>
      </View>
      <Text style={[styles.label, { paddingTop: 10 }]}>From Date & Time</Text>
      <View style={styles.dateTimeContainer}>
        <Text style={styles.dateTimeData}>{pickDateTime?.toDateString()}</Text>
        <Text style={styles.dateTimeData}>{pickDateTime?.toTimeString()}</Text>
      </View>
      <Text style={[styles.label, { paddingTop: 10 }]}>To Date & Time</Text>
      <View style={styles.dateTimeContainer}>
        <Text style={styles.dateTimeData}>{dropDateTime?.toDateString()}</Text>
        <Text style={styles.dateTimeData}>{dropDateTime?.toTimeString()}</Text>
      </View>
    </View>
  );
}

function BillingComponent() {
  return (
    <View style={[styles.sectionContainer, { backgroundColor: "#F0FBFD" }]}>
      <View style={styles.billigLableContainer}>
        <Text style={[styles.billigLable, { fontSize: 18, color: "#3C3C3C" }]}>
          Sub-Total
        </Text>
        <Text style={[styles.billigLable, { fontSize: 18, color: "#3C3C3C" }]}>
          ₹120
        </Text>
      </View>
      <View style={styles.billigLableContainer}>
        <Text style={styles.billigLable}>Delivery fee</Text>
        <Text style={styles.billigLable}>₹38</Text>
      </View>
      <View style={styles.billigLableContainer}>
        <Text style={styles.billigLable}>Taxes and charges</Text>
        <Text style={styles.billigLable}>₹18.96</Text>
      </View>
      <View style={styles.billigLableContainer}>
        <Text style={styles.billigLable}>Service fee</Text>
        <Text style={styles.billigLable}>₹10</Text>
      </View>
      <View style={styles.billigLableContainer}>
        <Text style={[styles.billigLable, { color: "#32CD99" }]}>Discount</Text>
        <Text style={[styles.billigLable, { color: "#32CD99" }]}>-₹16</Text>
      </View>
      <View style={styles.billigLableContainer}>
        <Text style={styles.billingTotal}>Grand Total</Text>
        <Text style={styles.billingTotal}>₹170.96</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    paddingTop: 20,
    backgroundColor: "#fff",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "10%",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  bodyContainer: {
    display: "flex",
    width: "100%",
    height: "90%",
    alignItems: "stretch",
  },
  sectionContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    borderBottomWidth: 1,
    borderColor: "#EDEDED",
    paddingHorizontal: 20,
  },
  sectionHeading: {
    fontWeight: "700",
    fontSize: 22,
    color: "#3C3C3C",
  },
  label: { color: "#777777", fontSize: 16 },
  labelData: { color: "#3C3C3C", fontSize: 18, fontWeight: "400" },
  dateTimeContainer: {
    flexDirection: "row",
    paddingVertical: 5,
    justifyContent: "space-between",
  },
  dateTimeData: {
    display: "flex",
    width: "47%",
    backgroundColor: "#EDEDED",
    borderRadius: 6,
    padding: 10,
    fontSize: 18,
    color: "#3C3C3C",
  },
  holdingTimeHeadingContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  numberOfBags: {
    borderRadius: 6,
    backgroundColor: "#F0FBFD",
    padding: 10,
    width: "100%",
  },
  textSection: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  packageIcon: {
    width: 82,
    height: 82,
    backgroundColor: "#E7F1FF",
    borderRadius: 6,
    padding: 1,
  },
  billigLableContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  billigLable: {
    color: "#777777",
    fontWeight: "400",
    fontSize: 16,
    paddingBottom: 5,
  },
  billingTotal: {
    paddingBottom: 5,
    fontWeight: "700",
    fontSize: 20,
    color: "#3C3C3C",
  },
});
