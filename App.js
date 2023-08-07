import React, { useState, useEffect } from "react";
import { PermissionsAndroid, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import messaging from "@react-native-firebase/messaging";
// redux
import { store } from "./store/store";
import { Provider, useSelector } from "react-redux";
import { getValueFor } from "./utils/SecureDataStoreUtils";

// navigation routes
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import VerifyPhone from "./pages/VerifyPhone";
import MainLayout from "./layouts/MainLayout";
import OrderSummary from "./pages/OrderSummary";
import IntroSlides from "./pages/IntroSlides";
import UpdateOrder from "./pages/UpdateOrder";
import EtaPage from "./pages/EtaPage";
import UpdateDestination from "./pages/UpdateDestination";
import LocationMap from "./pages/LocationMap";

const Stack = createNativeStackNavigator();

function App() {
  const [hideSlides, setHideSlides] = useState("");
  getValueFor("hideSlides").then((res) => setHideSlides(res));
  const { isLoggedIn } = useSelector((state) => state.userData);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
  }

  //   PermissionsAndroid.request(
  //     PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
  //   );
  // }

  // useEffect(() => {
  //   if (requestUserPermission()) {
  //     messaging()
  //       .getToken()
  //       .then((token) => {
  //         console.log(token);
  //       });
  //     .catch((reason) => {
  //       console.log(reason);
  //     });
  //   } else {
  //     console.log("Failed Permissions");
  //   }
  //   // initial notif
  //   messaging()
  //     .getInitialNotification()
  //     .then(async (remoteMessage) => {
  //       if (remoteMessage) {
  //         console.log(
  //           "Notification caused app to open from quit state:",
  //           remoteMessage.notification
  //         );
  //       }
  //     });
  //   // Assume a message-notification contains a "type" property in the data payload of the screen to open
  //   messaging().onNotificationOpenedApp(async (remoteMessage) => {
  //     console.log(
  //       "Notification caused app to open from background state:",
  //       remoteMessage.notification
  //     );
  //   });
  //   // Register background handler
  //   messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  //     console.log("Message handled in the background!", remoteMessage);
  //   });
  //   // foreground
  //   const unsubscribe = messaging().onMessage(async (remoteMessage) => {
  //     Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
  //   });
  //   return unsubscribe;
  // }, []);
  const initialRouteName = !hideSlides
    ? "InroSlides"
    : !isLoggedIn
    ? "LoginPage"
    : "MainPage";
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialRouteName}
          screenOptions={{ headerShown: false }}
        >
          {!isLoggedIn && !hideSlides && (
            <Stack.Screen
              name="InroSlides"
              component={IntroSlides}
              options={{ animation: "slide_from_left" }}
            />
          )}
          {!isLoggedIn ? (
            <>
              <Stack.Screen
                name="LoginPage"
                component={LoginPage}
                options={{ animation: "slide_from_left" }}
              />
              <Stack.Screen
                name="SignupPage"
                component={SignUpPage}
                options={{ animation: "slide_from_right" }}
              />
              <Stack.Screen
                name="VerifyPhone"
                component={VerifyPhone}
                options={{ animation: "slide_from_right" }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="MainPage"
                component={MainLayout}
                options={{ animation: "slide_from_right" }}
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
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
