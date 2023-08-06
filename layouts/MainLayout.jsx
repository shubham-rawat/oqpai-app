import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// pages
import Profile from "../pages/Profile";
import History from "../pages/History";
import Header from "../components/Header";
import Home from "../pages/Home";

// tab icons
import HomeIcon from "../assets/home_icon.svg";
import HomeIconFocus from "../assets/home_icon_focus.svg";
import HistoryIcon from "../assets/history_icon.svg";
import HistoryIconFocus from "../assets/history_icon_focus.svg";
import ProfileIcon from "../assets/profile_icon.svg";
import ProfileIconFocus from "../assets/profile_icon_focus.svg";
import { getFontSize } from "../utils/FontScaling";
import { SafeAreaView } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();

export default function MainLayout({ navigation }) {
  return (
    <SafeAreaView
      style={{ width: "100%", height: "100%", backgroundColor: "#FCFBFC" }}
    >
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconSize = 35;
            if (route.name === "Home") {
              return focused ? (
                <HomeIconFocus width={iconSize} height={iconSize} />
              ) : (
                <HomeIcon width={iconSize} height={iconSize} />
              );
            } else if (route.name === "History") {
              return focused ? (
                <HistoryIconFocus width={iconSize} height={iconSize} />
              ) : (
                <HistoryIcon width={iconSize} height={iconSize} />
              );
            } else if (route.name === "Profile") {
              return focused ? (
                <ProfileIconFocus width={iconSize} height={iconSize} />
              ) : (
                <ProfileIcon width={iconSize} height={iconSize} />
              );
            }
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
    fontSize: getFontSize(12),
    fontWeight: "400",
    marginBottom: 15,
  },
});
