import { PixelRatio } from "react-native";

export const getFontSize = (size) => size / PixelRatio.getFontScale();
