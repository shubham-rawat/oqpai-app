import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { saveValue } from "../utils/SecureDataStoreUtils";
import { getFontSize } from "../utils/FontScaling";
import { Ionicons } from "@expo/vector-icons";

const slides = [
  {
    key: 1,
    title: "Let Start",
    text: "Never before services at never before prices. ",
    backgroundColor: "#fff",
    color: "#000",
  },
  {
    key: 2,
    title: "Superfast pickup",
    text: "Oqpai picks and delivers luggage\n within 8.5 minutes",
    image: require("../assets/slider-assets/delivery1.png"),
    backgroundColor: "#000",
    color: "#fff",
  },
  {
    key: 3,
    title: "We take care of your luggage",
    text: "Oqpai’s 3 level security will make you worry\n less about your luggage",
    image: require("../assets/slider-assets/delivery2.png"),
    backgroundColor: "#fff",
    color: "#000",
  },
  {
    key: 4,
    title: "Best and Secure cloud storage",
    text: "So that you don’t think about anyone else \n when it comes to luggage",
    image: require("../assets/slider-assets/delivery3.png"),
    backgroundColor: "#000",
    color: "#fff",
  },
];

export default function IntroSlides({ navigation }) {
  const renderItem = ({ item }) => {
    if (item.key === 1) return <FirstSlide item={item} />;
    return (
      <View
        style={[
          styles.slide,
          { backgroundColor: item.backgroundColor, color: item.color },
        ]}
      >
        {item.key === 4 && (
          <Image
            source={item.image}
            style={[styles.image, { width: 350, height: 400 }]}
          />
        )}
        <Text style={[styles.title, { color: item.color }]}>{item.title}</Text>
        <Text style={[styles.text, { color: item.color }]}>{item.text}</Text>
        {item.key !== 4 && (
          <Image
            source={item.image}
            style={[styles.image, { width: 350, height: 400 }]}
          />
        )}
      </View>
    );
  };

  const renderNextButton = () => {
    return (
      <Ionicons name="arrow-forward-circle-outline" color={"gray"} size={40} />
    );
  };

  const renderDoneButton = () => {
    return (
      <Ionicons name="checkmark-circle-outline" color={"gray"} size={40} />
    );
  };

  const onDone = async () => {
    await saveValue("hideSlides", "true");
    navigation.navigate("LoginPage");
  };

  return (
    <AppIntroSlider
      renderItem={renderItem}
      renderNextButton={renderNextButton}
      renderDoneButton={renderDoneButton}
      data={slides}
      onDone={onDone}
    />
  );
}

function FirstSlide({ item }) {
  return (
    <View style={[styles.slide, { justifyContent: "space-between" }]}>
      <Image
        source={require("../assets/slider-assets/hand1.png")}
        style={[styles.image, { height: 400, alignSelf: "flex-end" }]}
      />
      <Image
        source={require("../assets/slider-assets/mainpagelogo.png")}
        style={[styles.image, { width: 300 }]}
      />
      <Text style={[styles.text, { color: item.color }]}>{item.text}</Text>
      <Image
        source={require("../assets/slider-assets/hand2.png")}
        style={[styles.image, { height: 100, alignSelf: "flex-end" }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 20,
  },
  image: {
    resizeMode: "contain",
  },
  title: {
    fontSize: getFontSize(36),
    fontWeight: "400",
  },
  text: {
    fontSize: getFontSize(16),
  },
});
