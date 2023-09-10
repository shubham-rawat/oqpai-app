import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import PickupIcon from "../assets/pickup_location.svg";
import DropIcon from "../assets/drop_location.svg";
import { getFontSize } from "../utils/FontScaling";

export default function HistoryComponent({
  pickupCity,
  dropCity,
  pickupAddress,
  dropAddress,
  amount,
  onPress,
  isCurrent = false,
}) {
  return (
    <View
      style={
        isCurrent ? styles.sectionContainerActive : styles.sectionContainer
      }
    >
      <TouchableOpacity onPress={onPress}>
        <View style={{ flexDirection: "row", paddingVertical: 10 }}>
          <View>
            <PickupIcon width={35} height={70} />
            <DropIcon width={35} height={35} />
          </View>
          <View style={styles.textSection}>
            <View>
              {/* <Text style={styles.label}>{pickupCity}</Text> */}
              <Text style={styles.labelData}>{pickupAddress}</Text>
            </View>
            <View>
              {/* <Text style={styles.label}>{dropCity}</Text> */}
              <Text style={styles.labelData}>{dropAddress}</Text>
            </View>
          </View>
          <Text style={styles.amountSection}>₹{amount}</Text>
        </View>
      </TouchableOpacity>
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
  sectionContainerActive: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    borderBottomWidth: 1,
    borderColor: "#EDEDED",
    paddingHorizontal: 20,
    backgroundColor: "#0b6efd1a",
    // opacity: 0.5,
  },
  sectionHeading: {
    fontWeight: "700",
    fontSize: getFontSize(18),
    color: "#3C3C3C",
  },
  label: { color: "#3C3C3C", fontSize: getFontSize(16), fontWeight: "700" },
  labelData: { color: "#777777", fontSize: getFontSize(14), fontWeight: "400" },
  textSection: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    width: "75%",
  },
  amountSection: {
    width: "15%",
    flexDirection: "column",
    fontSize: getFontSize(16),
    fontWeight: "400",
    color: "#3C3C3C",
  },
});
