// expo secure store
import * as SecureStore from "expo-secure-store";

export async function saveValue(key, value) {
  await SecureStore.setItemAsync(key, value, {
    keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK,
  });
}

export async function getValueFor(key) {
  return await SecureStore.getItemAsync(key);
}

export async function removeKey(key) {
  await SecureStore.deleteItemAsync(key);
}
