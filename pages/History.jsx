import { StyleSheet, Text } from "react-native";
import HistoryComponent from "../components/HistoryComponent";
import { getFontSize } from "../utils/FontScaling";
import { ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { pastOrders } from "../apis/userApi";
import { useSelector } from "react-redux";

export default function History({ navigation }) {
  const data = useSelector((state) => state.userData);
  const [historyData, setHistoryData] = useState([]);
  useEffect(() => {
    (async () => {
      let tempdata = await pastOrders(data.email);
      console.log(tempdata);
      setHistoryData([...tempdata]);
      console.log("updated history data");
    })();
  }, []);

  const onPressCurrent = (currentRequestId) => {
    console.log(currentRequestId);
    navigation.navigate("UpdateOrder", { currentRequestId });
  };

  return (
    <ScrollView>
      <Text style={styles.heading}>Your recent drop offs</Text>
      {historyData?.map((data, idx) => (
        <HistoryComponent
          amount={data.total_cost}
          // pickupCity={"Bikaner"}
          pickupAddress={data.pickup_text_address}
          // dropCity={"Ajmer"}
          dropAddress={data.destination_text_address}
          onPress={idx === 0 ? () => onPressCurrent(data.request_id) : () => {}}
          isCurrent={idx === 0}
          key={data.request_id}
        />
      ))}
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
