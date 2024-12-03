import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  backButtonImage: {
    height: 16,
    width: 16,
    resizeMode: "contain",
    transform: [{ rotate: "180deg" }],
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
    letterSpacing: 0.5,
  },
  rightButtonImage: {
    height: 16,
    width: 16,
    resizeMode: "contain",
  },
});
