import { StyleSheet, Text, View } from "react-native";
import { getTimeDifferenceInHours } from "../utils/DateTimeUtils";
import { getFontSize } from "../utils/FontScaling";

// icons
import DailyPackIcon from "../assets/daily_pack_logo.svg";
import PickupIcon from "../assets/pickup_location.svg";
import DropIcon from "../assets/drop_location.svg";
import ClockIcon from "../assets/clock.svg";

// component to display no of bags and selected package
export function BagDetailsComponent({ numberOfBags, packageName }) {
  return (
    <View style={{ display: "flex", flexDirection: "row", padding: 20 }}>
      <View style={styles.packageIcon}>
        <DailyPackIcon width={80} height={80} />
      </View>
      <View style={[styles.textSection, { flex: 1 }]}>
        <Text
          style={{
            fontWeight: "400",
            fontSize: getFontSize(14),
            color: "#777777",
          }}
        >
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
export function LocationComponent({ pickupLocation, dropLocation }) {
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
export function HoldingTimeComponent({ pickDateTime, dropDateTime }) {
  const holdingTime = getTimeDifferenceInHours(pickDateTime, dropDateTime);
  return (
    <View style={styles.sectionContainer}>
      <View style={styles.holdingTimeHeadingContainer}>
        <Text style={styles.sectionHeading}>Holding Time</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ClockIcon width={30} height={30} />
          <Text
            style={{
              fontSize: getFontSize(14),
              fontWeight: "400",
              color: "#3C3C3C",
            }}
          >
            {holdingTime} hours
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

export function BillingComponent() {
  return (
    <View style={[styles.sectionContainer, { backgroundColor: "#F0FBFD" }]}>
      <View style={styles.billigLableContainer}>
        <Text
          style={[
            styles.billigLable,
            { fontSize: getFontSize(14), color: "#3C3C3C" },
          ]}
        >
          Sub-Total
        </Text>
        <Text
          style={[
            styles.billigLable,
            { fontSize: getFontSize(14), color: "#3C3C3C" },
          ]}
        >
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

export function DriverDetails() {
  return (
    <View style={styles.sectionContainer}>
      <Text style={[styles.sectionHeading, { paddingBottom: 10 }]}>
        Driver Details
      </Text>
      <View style={styles.textSection}>
        <View>
          <Text style={styles.label}>Driver Name</Text>
          <Text style={styles.labelData}>Saurav Shah</Text>
        </View>
        <View>
          <Text style={styles.label}>Mobile Number</Text>
          <Text style={styles.labelData}>+91 9865646365</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    fontSize: getFontSize(18),
    color: "#3C3C3C",
  },
  label: { color: "#777777", fontSize: getFontSize(12) },
  labelData: { color: "#3C3C3C", fontSize: getFontSize(14), fontWeight: "400" },
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
    fontSize: getFontSize(14),
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
    maxWidth: "90%",
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
    fontSize: getFontSize(12),
    paddingBottom: 5,
  },
  billingTotal: {
    paddingBottom: 5,
    fontWeight: "700",
    fontSize: getFontSize(16),
    color: "#3C3C3C",
  },
});
