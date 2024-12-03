import { GetTaskResponse } from "@/types/service.types";
import { Platform } from "react-native";
import Toast from "react-native-toast-message";
import { InfiniteData } from "react-query";
import StorageHelper from "./StorageHelper";
import { resetAndNavigate } from "./NavigationUtils";
import Routes from "@/constants/routes";

export const isIos = Platform.OS === "ios";

export const getGreeting = () => {
  const now = new Date();
  const hours = now.getHours();

  if (hours >= 5 && hours < 12) {
    return "Good Morning";
  } else if (hours >= 12 && hours < 17) {
    return "Good Afternoon";
  } else if (hours >= 17 && hours < 21) {
    return "Good Evening";
  } else {
    return "Good Night";
  }
};

export const ErrorToast = (message: string) => {
  Toast.show({
    type: "error",
    text1: message,
  });
};

export const SuccessToast = (message: string) => {
  Toast.show({
    type: "success",
    text1: message,
  });
};

export const isError = (error: unknown): error is Error => {
  return error instanceof Error;
};

export const handleError = (error: unknown) => {
  if (!isError(error)) {
    ErrorToast("Something went wrong");
  } else {
    ErrorToast(error.message);
  }
};

export const isResponseError = (
  err: Error
): err is Error & {
  response: { data: { message: string } };
} => {
  const flag =
    err &&
    "response" in err &&
    err.response &&
    typeof err.response === "object" &&
    err.response !== null &&
    "data" in err.response &&
    typeof err.response.data === "object" &&
    err.response.data !== null &&
    "message" in err.response.data &&
    typeof err.response.data.message === "string";

  return !!flag;
};

export const getNextPageParam = (lastPage: GetTaskResponse) => {
  const totalPages = lastPage.pagination.totalPages;
  if (totalPages > lastPage.pagination.currentPage) {
    return lastPage.pagination.currentPage + 1;
  } else {
    return undefined;
  }
};

export const getTasksFlatData = (tasks?: InfiniteData<GetTaskResponse>) => {
  return tasks?.pages?.flatMap((page) => page.tasks).flat() || [];
};

export const logout = async () => {
  try {
    await StorageHelper.removeItem(StorageHelper.STORAGE_KEYS.USER_TOKEN);
    await StorageHelper.removeItem(StorageHelper.STORAGE_KEYS.USERNAME);
    resetAndNavigate(Routes.AuthStack);
  } catch (error) {
    handleError(error);
  }
};
