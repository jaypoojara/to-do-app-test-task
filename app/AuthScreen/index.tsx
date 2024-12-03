import { View, ActivityIndicator } from "react-native";
import { FC, useCallback, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { replace } from "@/utils/NavigationUtils";
import Routes from "@/constants/routes";
import useGetUser from "@/hooks/useGetUser";
import colors from "@/theme/colors";
import { styles } from "./styles";

const AuthScreen: FC = () => {
  const { isLoading, username, token } = useGetUser();

  const init = useCallback(async () => {
    if (username && token) {
      await SplashScreen.hideAsync();
      replace(Routes.AppStack);
    } else {
      replace(Routes.AuthStack);
    }
  }, [username, token]);

  useEffect(() => {
    if (!isLoading) {
      init();
    }
  }, [init, isLoading]);

  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.primaryColor} />
    </View>
  );
};

export default AuthScreen;
