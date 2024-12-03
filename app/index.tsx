import { registerRootComponent } from "expo";
import * as SplashScreen from "expo-splash-screen";
import { MenuProvider } from "react-native-popup-menu";
import Toast from "react-native-toast-message";
import { QueryClient, QueryClientProvider } from "react-query";
import RootNavigation from "./Navigation";

const AppQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

SplashScreen.setOptions({
  duration: 5000,
  fade: true,
});
const App = () => {
  return (
    <QueryClientProvider client={AppQueryClient}>
      <MenuProvider>
        <RootNavigation />
        <Toast />
      </MenuProvider>
    </QueryClientProvider>
  );
};

registerRootComponent(App);
