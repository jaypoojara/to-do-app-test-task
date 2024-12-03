import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "../AuthScreen";
import AuthStack from "../AuthStack";
import AppStack from "../AppStack";
import Routes from "@/constants/routes";
import { RootStackParamList } from "@/types/navigation.types";
import { navigationRef } from "@/utils/NavigationUtils";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={Routes.AuthScreen}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name={Routes.AuthScreen}
          component={AuthScreen}
          options={{ animation: "fade" }}
        />
        <Stack.Screen
          name={Routes.AuthStack}
          component={AuthStack}
          options={{ animation: "fade" }}
        />
        <Stack.Screen
          name={Routes.AppStack}
          component={AppStack}
          options={{ animation: "fade" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
