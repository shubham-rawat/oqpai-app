// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.transformer.babelTransformerPath = require.resolve(
  "react-native-svg-transformer"
);
config.resolver.assetExts.push("cjs");
config.resolver.assetExts.splice(config.resolver.assetExts.indexOf("svg"), 1);
config.resolver.sourceExts.push("svg");

module.exports = config;
