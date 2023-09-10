import { StyleSheet, Text } from "react-native";
import HistoryComponent from "../components/HistoryComponent";
import { getFontSize } from "../utils/FontScaling";
import { ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { pastOrders } from "../apis/userApi";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { UNKNOWN_ERROR } from "../constants/ErrorMessages";
import { ORDER_STATUS_CLOSED } from "../constants/AllConstants";

export default function History({ navigation }) {
  const isFocused = useIsFocused();
  const { email } = useSelector((state) => state.userData);
  const [historyData, setHistoryData] = useState([]);
  useEffect(() => {
    if (isFocused) {
      (async () => {
        try {
          let tempdata = await pastOrders(email);
          console.log(tempdata);
          setHistoryData([...tempdata]);
          console.log("updated history data");
        } catch (error) {
          console.log(error);
          alert(UNKNOWN_ERROR);
        }
      })();
    }
  }, [isFocused]);

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
          onPress={
            data.status !== ORDER_STATUS_CLOSED
              ? () => onPressCurrent(data.request_id)
              : () => {}
          }
          isCurrent={data.status !== ORDER_STATUS_CLOSED}
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
