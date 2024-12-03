import { StatusBar } from "react-native";
import { FC, memo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { FullScreenContainerProps } from "@/types/component.types";

export const FullScreenContainer: FC<FullScreenContainerProps> = ({
  children,
  style,
  edges = ["top"],
  barStyle = "dark-content",
}) => {
  return (
    <SafeAreaView edges={edges} style={[styles.container, style]}>
      <StatusBar
        translucent
        backgroundColor={"transparent"}
        barStyle={barStyle}
      />
      {children}
    </SafeAreaView>
  );
};

export default memo(FullScreenContainer);
