import colors from "@/theme/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryColor,
    alignItems: "center",
    height: 40,
    justifyContent: "center",
    borderRadius: 6,
  },
  text: {
    color: colors.white,
    fontWeight: "600",
    fontSize: 16,
    letterSpacing: 0.6,
  },
});
