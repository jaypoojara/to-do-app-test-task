import Routes from "@/constants/routes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Task, TASK_STATUS } from "./service.types";

export type RootStackParamList = {
  [Routes.AuthScreen]: undefined;
  [Routes.AuthStack]: undefined;
  [Routes.AppStack]: undefined;
};

export type AuthStackParamList = {
  [Routes.LoginScreen]: undefined;
  [Routes.SignUpScreen]: undefined;
};

export type AppStackParamList = {
  [Routes.HomeScreen]: undefined;
  [Routes.CreateNewToDoScreen]?: Task;
  [Routes.ToDoListScreen]: { filterType?: TASK_STATUS };
  [Routes.ToDoDetailsScreen]: Task;
};

export type NavigationProps<
  RouteName extends keyof (AppStackParamList &
    AuthStackParamList &
    RootStackParamList)
> = NativeStackScreenProps<
  AppStackParamList & AuthStackParamList & RootStackParamList,
  RouteName
>;
