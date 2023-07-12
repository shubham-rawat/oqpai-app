import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

// redux
import { store } from "./store/store";
import { Provider, useSelector } from "react-redux";

// navigation routes
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import VerifyPhone from "./pages/VerifyPhone";
import MainLayout from "./layouts/MainLayout";

const Stack = createNativeStackNavigator();

function App() {
  const { isLoggedIn } = useSelector((state) => state.userData);
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={!isLoggedIn ? "LoginPage" : "MainPage"}
          screenOptions={{ headerShown: false }}
        >
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
            <Stack.Screen
              name="MainPage"
              component={MainLayout}
              options={{ animation: "slide_from_right" }}
            />
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
