import { createNativeStackNavigator } from "@react-navigation/native-stack";
// pages
import LuggageLocation from "./LuggageLocation";
import BagsPage from "./BagsPage";
import CameraPage from "./CameraPage";

export default function Home() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="LuggageLocation"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="LuggageLocation"
        component={LuggageLocation}
        options={{ animation: "fade" }}
      />
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
  );
}
