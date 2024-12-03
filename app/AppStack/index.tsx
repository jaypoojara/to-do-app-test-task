import { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppStackParamList } from "@/types/navigation.types";
import Routes from "@/constants/routes";
import HomeScreen from "../Screens/Home/HomeScreen";
import CreateNewToDoScreen from "../Screens/CreateNewToDo/CreateNewToDoScreen";
import ToDoListScreen from "../Screens/ToDoList/ToDoListScreen";
import ToDoDetailsScreen from "../Screens/ToDoDetails/ToDoDetailsScreen";
import useUnauthorizedLogout from "@/hooks/useUnauthorizedLogout";

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack: FC = () => {
  useUnauthorizedLogout();
  return (
    <Stack.Navigator
      initialRouteName={Routes.HomeScreen}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={Routes.HomeScreen} component={HomeScreen} />
      <Stack.Screen
        name={Routes.CreateNewToDoScreen}
        component={CreateNewToDoScreen}
      />
      <Stack.Screen name={Routes.ToDoListScreen} component={ToDoListScreen} />
      <Stack.Screen
        key={Routes.ToDoDetailsScreen}
        name={Routes.ToDoDetailsScreen}
        component={ToDoDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
