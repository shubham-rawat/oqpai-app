import * as SecureStore from "expo-secure-store";

// secure store
async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}
async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  return result;
}
// secure store
