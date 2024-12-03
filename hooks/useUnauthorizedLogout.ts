import { DeviceEventEmitter } from "react-native";
import { useEffect } from "react";
import EventKey from "@/constants/eventKey";
import { ErrorToast, logout } from "@/utils/HelperUtils";

const useUnauthorizedLogout = () => {
  useEffect(() => {
    DeviceEventEmitter.addListener(EventKey.UNAUTHORIZED_403, async () => {
      ErrorToast("Invalid or expired token");
      logout();
    });

    return () => {
      DeviceEventEmitter.removeAllListeners(EventKey.UNAUTHORIZED_403);
    };
  }, []);
  return;
};

export default useUnauthorizedLogout;
