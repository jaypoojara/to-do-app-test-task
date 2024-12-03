import AsyncStorage from "@react-native-async-storage/async-storage";
import { handleError } from "./HelperUtils";

const STORAGE_KEYS = {
  USER_TOKEN: "user_token",
  USERNAME: "username",
};

const saveItem = async (key: string, authToken: string) => {
  try {
    await AsyncStorage.setItem(key, authToken);
    return true;
  } catch (error) {
    handleError(error);
  }
};

const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    handleError(error);
  }
};

const getItem = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? value : undefined;
  } catch (error) {
    handleError(error);
  }
};

export default {
  removeItem,
  getItem,
  saveItem,
  STORAGE_KEYS,
};
