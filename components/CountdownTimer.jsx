import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getFontSize } from "../utils/FontScaling";

export default function CountdownTimer({ countdownSeconds }) {
  const [minutes, setMinutes] = useState(Math.floor(countdownSeconds / 60));
  const [seconds, setSeconds] = useState(countdownSeconds % 60);

  useEffect(() => {
    let timer = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(timer);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      } else {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [minutes, seconds]);

  return (
    <View style={styles.timerContainer}>
      <Text style={styles.timer}>
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  timerContainer: {
    display: "flex",
    backgroundColor: "#EDEDED",
    borderRadius: 6,
    padding: 10,
  },
  timer: {
    fontWeight: "700",
    fontFamily: "monospace",
    fontSize: getFontSize(32),
    alignSelf: "center",
    color: "#3C3C3C",
  },
});
