import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { removeUserData } from "../store/userDataSlice";

export default function Profile() {
  const userData = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  const logouthandler = () => {
    dispatch(removeUserData());
  };

  return (
    <View style={styles.profileContainer}>
      <Ionicons
        name="ios-log-out-outline"
        size={42}
        color="black"
        style={styles.logoutBtn}
        onPress={logouthandler}
      />
      <View style={styles.infoBar}>
        <TouchableHighlight style={styles.profileImgContainer}>
          <Image
            source={require("../assets/profile.png")}
            style={styles.profileImg}
          />
        </TouchableHighlight>
        <View
          style={{
            borderRightWidth: 2,
            borderRightColor: "#EDEDED",
            padding: 20,
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 36, fontWeight: "700", color: "#3C3C3C" }}>
            {userData.name}
          </Text>
          <Text style={{ fontSize: 14, fontWeight: "400", color: "#777777" }}>
            {userData.mobile}
          </Text>
        </View>
        <View
          style={{
            padding: 20,
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "400", color: "#777777" }}>
            Orders
          </Text>
          <Text style={{ fontSize: 22, fontWeight: "400", color: "#3C3C3C" }}>
            61
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logoutBtn: {
    alignSelf: "flex-end",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#EDEDED",
    padding: 5,
  },
  profileContainer: {
    display: "flex",
    width: "100%",
    height: "100%",
    flexDirection: "column",
    padding: 20,
  },
  infoBar: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    marginVertical: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#EDEDED",
    paddingBottom: 30,
  },
  profileImgContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 120,
    width: 120,
    overflow: "hidden",
    borderRadius: 60,
    borderColor: "#0B6EFD",
    borderWidth: 3,
  },
  profileImg: {
    height: 130,
    width: 130,
  },
});
