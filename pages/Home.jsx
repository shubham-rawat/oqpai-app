import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
// pages
import LuggageLocation from "./LuggageLocation";
import BagsPage from "./BagsPage";
import CameraPage from "./CameraPage";
import LocationMap from "./LocationMap";

export default function Home() {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <Stack.Navigator
        initialRouteName="LocationMap"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="LocationMap"
          component={LocationMap}
          options={{ animation: "fade" }}
        />
        {/* <Stack.Screen
          name="LuggageLocation"
          component={LuggageLocation}
          options={{ animation: "fade" }}
        /> */}
        <Stack.Screen
          name="Bags"
          component={BagsPage}
          options={{ animation: "fade" }}
        />
        <Stack.Screen
          name="CameraPage"
          component={CameraPage}
          options={{ animation: "fade" }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </>
  );
}
