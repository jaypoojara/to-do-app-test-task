import { FC, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStackParamList } from "@/types/navigation.types";
import Routes from "@/constants/routes";
import LoginScreen from "../Screens/Login/LoginScreen";
import SignUpScreen from "../Screens/SignUp/SignUpScreen";
import { useQueryClient } from "react-query";

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack: FC = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.resetQueries();
  }, []);

  return (
    <Stack.Navigator
      initialRouteName={Routes.LoginScreen}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={Routes.LoginScreen} component={LoginScreen} />
      <Stack.Screen name={Routes.SignUpScreen} component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
