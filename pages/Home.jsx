import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OrderSummary from "./OrderSummary";
import LuggageLocation from "./LuggageLocation";
import BagsPage from "./BagsPage";

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
        name="OrderSummary"
        component={OrderSummary}
        options={{ animation: "fade" }}
      />
    </Stack.Navigator>
  );
}
