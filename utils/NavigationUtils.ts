import {
  CommonActions,
  createNavigationContainerRef,
  StackActions,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  AppStackParamList,
  AuthStackParamList,
  RootStackParamList,
} from "../types/navigation.types";

type ParamsType = RootStackParamList & AuthStackParamList & AppStackParamList;

export const navigationRef =
  createNavigationContainerRef<NativeStackNavigationProp<ParamsType>>();

export async function navigate<RouteName extends keyof ParamsType>(
  routeName: RouteName,
  params?: ParamsType[RouteName]
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.navigate(routeName, params));
  }
}

export async function replace<RouteName extends keyof ParamsType>(
  routeName: RouteName,
  params?: ParamsType[RouteName]
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(routeName, params));
  }
}

export async function resetAndNavigate<RouteName extends keyof ParamsType>(
  routeName: RouteName
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: routeName }],
      })
    );
  }
}

export async function goBack() {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.goBack());
  }
}

export async function push<RouteName extends keyof ParamsType>(
  routeName: RouteName,
  params?: ParamsType[RouteName]
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(routeName, params));
  }
}

export function prepareNavigation() {
  return navigationRef.isReady();
}

export const goBackWithParams = <RouteName extends keyof ParamsType>(
  routeName: RouteName,
  params: ParamsType[RouteName]
) => {
  if (navigationRef.isReady()) {
    const state = navigationRef.getRootState();

    const findRoute = (
      routes: typeof state.routes
    ): { key: string; name: string } | undefined => {
      for (const route of routes) {
        if (route.name === routeName && route.key) {
          return { key: route.key, name: route.name };
        }
        if (route.state && "routes" in route.state) {
          const nestedRoute = findRoute(
            route.state.routes as typeof state.routes
          );
          if (nestedRoute) return nestedRoute;
        }
      }
      return undefined;
    };

    const targetRoute = findRoute(state.routes);

    if (targetRoute) {
      navigationRef.dispatch({
        type: "SET_PARAMS",
        payload: { params },
        source: targetRoute.key,
      });

      navigationRef.goBack();
    } else {
      // For developer warning
      console.warn(`Route with name '${routeName}' not found.`);
    }
  }
};
