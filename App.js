import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
// redux
import { store } from "./store/store";
import { Provider } from "react-redux";
import Routes from "./routes";

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar animated style="auto" />
      <NavigationContainer>
        <Routes />
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
