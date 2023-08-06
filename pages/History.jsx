import { StyleSheet, Text, View } from "react-native";
import HistoryComponent from "../components/HistoryComponent";
import { getFontSize } from "../utils/FontScaling";
import { ScrollView } from "react-native";

export default function History({ navigation }) {
  const orderData = {
    location: {
      pickup: "Bikaner",
      drop: "Ajmer",
    },
    dateTime: {
      pickup: new Date(),
      drop: new Date(),
    },
    bags: "1",
  };
  const onPressCurrent = () => {
    navigation.navigate("UpdateOrder", { orderData });
  };
  return (
    <ScrollView>
      <Text style={styles.heading}>Your recent drop outs</Text>
      <HistoryComponent
        amount={200}
        pickupCity={"Bikaner"}
        pickupAddress={"Noon Bazar, 765111"}
        dropCity={"Ajmer"}
        dropAddress={"Raja Chandar Singh Nagar, 765199"}
        onPress={onPressCurrent}
        isCurrent={true}
      />
      <HistoryComponent
        amount={200}
        pickupCity={"Bikaner"}
        pickupAddress={"Noon Bazar, 765111"}
        dropCity={"Ajmer"}
        dropAddress={"Raja Chandar Singh Nagar, 765199"}
      />

      <HistoryComponent
        amount={200}
        pickupCity={"Bikaner"}
        pickupAddress={"Noon Bazar, 765111"}
        dropCity={"Ajmer"}
        dropAddress={"Raja Chandar Singh Nagar, 765199"}
      />
      <HistoryComponent
        amount={200}
        pickupCity={"Bikaner"}
        pickupAddress={"Noon Bazar, 765111"}
        dropCity={"Ajmer"}
        dropAddress={"Raja Chandar Singh Nagar, 765199"}
      />
      <HistoryComponent
        amount={200}
        pickupCity={"Bikaner"}
        pickupAddress={"Noon Bazar, 765111"}
        dropCity={"Ajmer"}
        dropAddress={"Raja Chandar Singh Nagar, 765199"}
      />
      <HistoryComponent
        amount={200}
        pickupCity={"Bikaner"}
        pickupAddress={"Noon Bazar, 765111"}
        dropCity={"Ajmer"}
        dropAddress={"Raja Chandar Singh Nagar, 765199"}
      />
      <HistoryComponent
        amount={200}
        pickupCity={"Bikaner"}
        pickupAddress={"Noon Bazar, 765111"}
        dropCity={"Ajmer"}
        dropAddress={"Raja Chandar Singh Nagar, 765199"}
      />
      <HistoryComponent
        amount={200}
        pickupCity={"Bikaner"}
        pickupAddress={"Noon Bazar, 765111"}
        dropCity={"Ajmer"}
        dropAddress={"Raja Chandar Singh Nagar, 765199"}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontWeight: "700",
    fontSize: getFontSize(18),
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
});
