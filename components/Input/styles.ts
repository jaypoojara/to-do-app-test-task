import colors from "@/theme/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  label: {
    color: colors.white,
    fontWeight: "500",
    letterSpacing: 0.4,
  },
  error: {
    fontSize: 13,
    color: colors.error,
    fontWeight: "500",
    letterSpacing: 0.4,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    color: colors.white,
    letterSpacing: 0.4,
    borderRadius: 6,
  },
  leftIcon: {
    height: 16,
    width: 16,
    resizeMode: "contain",
  },
  wrapperStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white3,
    borderRadius: 6,
    gap: 12,
    paddingHorizontal: 10,
  },
});
