import colors from "@/theme/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: colors.bgColor,
    padding: 15,
  },
  scrollViewContent: {
    flexGrow: 1,
    gap: 20,
  },
  itemContainer: {
    flex: 1,
    gap: 15,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.5,
    color: colors.black,
  },
  taskStatusText: {
    fontWeight: "500",
    fontSize: 14,
    letterSpacing: 0.4,
  },
  completedTaskText: {
    color: colors.success,
  },
  incompleteTaskText: {
    color: colors.warning,
  },
  taskDescription: {
    fontSize: 15,
    fontWeight: "400",
    letterSpacing: 0.4,
    color: colors.gray1,
    lineHeight: 20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  icon: {
    height: 18,
    width: 18,
    resizeMode: "contain",
    tintColor: colors.gray1,
  },
  infoText: {
    color: colors.black,
  },
  deleteButton: {
    backgroundColor: colors.transparent,
    borderWidth: 1,
    borderColor: colors.error,
  },
  deleteButtonText: {
    color: colors.error,
  },
});
