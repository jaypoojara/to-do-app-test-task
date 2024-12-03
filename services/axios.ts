import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import StorageHelper from "@/utils/StorageHelper";
import { DeviceEventEmitter } from "react-native";
import EventKey from "@/constants/eventKey";

const axiosInstance = axios.create({
  baseURL: "https://to-do-list-nodejs-c096f991a2c0.herokuapp.com",
});

const ResponseInterceptor = (response: AxiosResponse) => {
  return response;
};

const RequestInterceptor = async (config: AxiosRequestConfig | any) => {
  const token = await StorageHelper.getItem(
    StorageHelper.STORAGE_KEYS.USER_TOKEN
  );

  if (token) {
    config.headers.Authorization = token;
    config.headers["content-type"] = "application/x-www-form-urlencoded";
  }

  return config;
};

axiosInstance.interceptors.request.use(RequestInterceptor);

axiosInstance.interceptors.response.use(ResponseInterceptor, (error) => {
  if (error.response) {
    if (error.response.status === 403) {
      // Unauthorized
      DeviceEventEmitter.emit(EventKey.UNAUTHORIZED_403);
    }
    return Promise.reject(error);
  } else if (error.request) {
    return Promise.reject(error);
  } else {
    return Promise.reject(error);
  }
});

export { axiosInstance };
