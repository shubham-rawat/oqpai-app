// routes that can be accessed after login
import React, { useEffect } from "react";
import { Alert } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// firebase messaging
import messaging from "@react-native-firebase/messaging";
// pages
import MainLayout from "../layouts/MainLayout";
import OrderSummary from "../pages/OrderSummary";
import EtaPage from "../pages/EtaPage";
import UpdateOrder from "../pages/UpdateOrder";
import UpdateDestination from "../pages/UpdateDestination";
import LocationMap from "../pages/LocationMap";
import ContactPage from "../pages/ContactPage";

export default function PrivateRoutes() {
  // notifications only when logged in
  useEffect(() => {
    // initial notif
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage.notification
          );
        }
      });
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage.notification
      );
    });
    // Register background handler
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
    });
    // foreground
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert(
        remoteMessage.notification.title,
        remoteMessage.notification.body
      );
    });
    return unsubscribe;
  }, []);
  // notifications only when logged in
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName={"MainPage"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="MainPage"
        component={MainLayout}
        options={{ animation: "slide_from_left" }}
      />
      <Stack.Screen
        name="OrderSummary"
        component={OrderSummary}
        options={{ animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="EtaPage"
        component={EtaPage}
        options={{ animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="UpdateOrder"
        component={UpdateOrder}
        options={{ animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="UpdateDestination"
        component={UpdateDestination}
        options={{ animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="LocationMap"
        component={LocationMap}
        options={{ animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="ContactPage"
        component={ContactPage}
        options={{ animation: "slide_from_right" }}
      />
    </Stack.Navigator>
  );
}
