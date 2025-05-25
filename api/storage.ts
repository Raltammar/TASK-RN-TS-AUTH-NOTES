// set up securestore to handle token (getToken- storeToken-deleteTkoen)

import * as SecureStore from "expo-secure-store";

const storeToken = async (token: string) => {
  await SecureStore.setItemAsync("token", token);
};
const getToken = async () => {
  return await SecureStore.getItemAsync("token");
};
const deleteToken = async () => {
  await SecureStore.deleteItemAsync("token");
};

export { storeToken, getToken, deleteToken };
