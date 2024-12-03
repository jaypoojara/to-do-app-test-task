import colors from "@/theme/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: "row",
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: colors.white,
  },
  taskIndicator: {
    width: 5,
  },
  taskContent: {
    flex: 1,
    padding: 12,
    gap: 5,
  },
  taskTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  taskTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 0.4,
  },
  taskCompleteContainer: {
    alignSelf: "flex-start",
  },
  taskComplete: {
    fontWeight: "600",
    fontSize: 12,
    letterSpacing: 0.3,
    color: colors.success,
  },
  taskText: {
    fontSize: 12,
    fontWeight: "400",
    letterSpacing: 0.3,
    color: colors.gray1,
    lineHeight: 16,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  dateText: {
    fontSize: 12,
    fontWeight: "400",
    letterSpacing: 0.3,
    color: colors.gray1,
    lineHeight: 16,
  },
  taskDateImage: {
    height: 12,
    width: 12,
    tintColor: colors.gray1,
  },
});
