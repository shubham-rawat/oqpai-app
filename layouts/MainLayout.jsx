import { SafeAreaView, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

// pages
import Profile from "../pages/Profile";
import History from "../pages/History";
import Header from "../components/Header";
import Home from "../pages/Home";

const Tab = createBottomTabNavigator();

export default function MainLayout({ navigation }) {
  // navigation.navigate("signupPage")
  return (
    <SafeAreaView
      style={{ width: "100%", height: "100%", backgroundColor: "#FCFBFC" }}
    >
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "ios-home" : "ios-home-outline";
            } else if (route.name === "History") {
              iconName = focused
                ? "ios-stats-chart"
                : "ios-stats-chart-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "ios-person" : "ios-person-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#0B6EFD",
          tabBarInactiveTintColor: "#E7E7EF",
          tabBarLabelStyle: styles.tabLable,
          tabBarStyle: styles.tabBar,
          header: Header,
        })}
        sceneContainerStyle={{ backgroundColor: "#FCFBFC" }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="History" component={History} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 80,
    padding: 10,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  tabLable: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 15,
  },
  // mainContainer: {
  //   display: "flex",
  //   flexDirection: "column",
  //   width: "100%",
  //   height: "100%",
  // },
  // topContainer: {
  //   display: "flex",
  //   flexDirection: "row",
  //   width: "100%",
  //   height: "10%",
  //   borderBottomWidth: 1,
  //   borderBottomColor: "#0064FF4",
  //   // justifyContent: "center",
  //   alignItems: "flex-end",
  //   paddingHorizontal: 20,
  //   paddingVertical: 10,
  // },
  // middleContainer: {
  //   display: "flex",
  //   flexDirection: "column",
  //   width: "100%",
  //   height: "80%",
  // },
  // bottomContainer: {
  //   display: "flex",
  //   flexDirection: "row",
  //   width: "100%",
  //   height: "10%",
  //   borderWidth: 1,
  //   borderTopLeftRadius: 18,
  //   borderTopRightRadius: 18,
  //   borderTopColor: "#0064FF4",
  // },
  // locationForm: {
  //   display: "flex",
  //   alignItems: "stretch",
  //   borderWidth: 1,
  //   borderRadius: 18,
  //   margin: 20,
  // },
  // locationInput: {
  //   borderWidth: 0,
  //   padding: 10,
  //   fontSize: 18,
  //   height: 60,
  // },
});
