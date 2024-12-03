import colors from "@/theme/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: colors.black6,
  },
  content: {
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 10,
    gap: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  buttonContainer: {
    marginTop: 20,
    gap: 20,
    flexDirection: "row",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: colors.gray1_40,
  },
  confirmButton: {
    flex: 1,
  },
});
