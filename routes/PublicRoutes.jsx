// routes that can be accessed without login
import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// pages
import IntroSlides from "../pages/IntroSlides";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import VerifyPhone from "../pages/VerifyPhone";
import { getValueFor } from "../utils/SecureDataStoreUtils";
import { SHOW_INTRO_SLIDES_KEY } from "../constants/AllConstants";

export default function PublicRoutes() {
  const Stack = createNativeStackNavigator();
  const [hideSlides, setHideSlides] = useState("");
  getValueFor(SHOW_INTRO_SLIDES_KEY).then((res) => setHideSlides(res));
  const initialRouteName = !hideSlides ? "InroSlides" : "LoginPage";

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{ headerShown: false }}
    >
      {!hideSlides && (
        <Stack.Screen
          name="IntroSlides"
          component={IntroSlides}
          options={{ animation: "slide_from_left" }}
        />
      )}
      <Stack.Screen
        name="LoginPage"
        component={LoginPage}
        options={{ animation: "slide_from_left" }}
      />
      <Stack.Screen
        name="SignUpPage"
        component={SignUpPage}
        options={{ animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="VerifyPhone"
        component={VerifyPhone}
        options={{ animation: "slide_from_right" }}
      />
    </Stack.Navigator>
  );
}
