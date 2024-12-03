import { useMutation } from "react-query";
import { QUERY_KEY } from "../queryKeys";
import { axiosInstance } from "../axios";
import {
  SigninPayload,
  SigninResponse,
  SignupPayload,
  SignupResponse,
} from "@/types/service.types";
import { ErrorToast, isResponseError, SuccessToast } from "@/utils/HelperUtils";
import { navigate, resetAndNavigate } from "@/utils/NavigationUtils";
import Routes from "@/constants/routes";
import StorageHelper from "@/utils/StorageHelper";

export const useSigninMutation = () => {
  return useMutation({
    mutationKey: [QUERY_KEY.SIGNIN],
    mutationFn: async (payload: SigninPayload) => {
      const { data } = await axiosInstance.post<SigninResponse>(
        `users/login`,
        payload
      );
      return data;
    },
    onSuccess: async (response) => {
      StorageHelper.saveItem(
        StorageHelper.STORAGE_KEYS.USER_TOKEN,
        response?.token
      );
      StorageHelper.saveItem(
        StorageHelper.STORAGE_KEYS.USERNAME,
        response?.user.username
      );
      resetAndNavigate(Routes.AppStack);
    },
    onError: (error: Error) => {
      let errorMessage = "Something went wrong";
      if (isResponseError(error)) {
        errorMessage = error?.response?.data?.message;
      }
      ErrorToast(errorMessage);
    },
  });
};

export const useSignupMutation = () => {
  return useMutation({
    mutationKey: [QUERY_KEY.SIGNUP],
    mutationFn: async (payload: SignupPayload) => {
      const { data } = await axiosInstance.post<SignupResponse>(
        `users/signup`,
        payload
      );
      return data;
    },
    onSuccess: async () => {
      SuccessToast("Account created successfully");
      navigate(Routes.LoginScreen);
    },
    onError: (error: Error) => {
      let errorMessage = "Something went wrong";
      if (isResponseError(error)) {
        errorMessage = error?.response?.data?.message;
      }
      ErrorToast(errorMessage);
    },
  });
};
