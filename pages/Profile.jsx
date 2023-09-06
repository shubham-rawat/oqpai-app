import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import auth from "@react-native-firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { removeUserData } from "../store/userDataSlice";
import { getFontSize } from "../utils/FontScaling";
import Button from "../components/Button";

export default function Profile({ navigation }) {
  const userData = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  const logouthandler = () => {
    auth().signOut();
    dispatch(removeUserData());
  };

  return (
    <View style={styles.profileContainer}>
      <StatusBar style="auto" />
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
            padding: 10,
            justifyContent: "center",
            maxWidth: 170,
          }}
        >
          <Text
            style={{
              fontSize: getFontSize(22),
              fontWeight: "700",
              color: "#3C3C3C",
            }}
          >
            {userData.name}
          </Text>
          <Text
            style={{
              fontSize: getFontSize(14),
              fontWeight: "400",
              color: "#777777",
            }}
          >
            {userData.mobile}
          </Text>
        </View>
        {/* <View
          style={{
            padding: 10,
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: getFontSize(18),
              fontWeight: "400",
              color: "#777777",
            }}
          >
            Orders
          </Text>
          <Text
            style={{
              fontSize: getFontSize(22),
              fontWeight: "400",
              color: "#3C3C3C",
            }}
          >
            61
          </Text>
        </View> */}
      </View>
      <Button
        label={"Contact Us"}
        onPress={() => navigation.navigate("ContactPage")}
      />
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
