import colors from "@/theme/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  headerContainer: {
    paddingBottom: 15,
  },
  searchIcon: {
    tintColor: colors.gray1,
  },
  searchWrapper: {
    marginHorizontal: 15,
    backgroundColor: colors.gray1_33,
  },
  searchInput: {
    color: colors.black,
  },
  flatListContent: {
    flexGrow: 1,
    gap: 12,
    padding: 15,
  },
  flatList: {
    backgroundColor: colors.bgColor,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
    shadowColor: colors.black,
    shadowOffset: { height: -2, width: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  modalHeader: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 16,
    color: colors.black,
    fontWeight: "500",
    letterSpacing: 0.5,
    flex: 1,
  },
  closeIcon: {
    height: 16,
    width: 16,
    resizeMode: "contain",
    transform: [{ rotate: "45deg" }],
  },
  filterOption: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: colors.white,
  },
  activeFilterOption: {
    backgroundColor: `${colors.primaryColor}22`,
  },
  filterOptionText: {
    fontWeight: "600",
    letterSpacing: 0.5,
    color: colors.gray1,
  },
  activeFilterOptionText: {
    color: colors.primaryColor,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  noTasksText: {
    color: colors.gray1,
    fontWeight: "600",
    fontSize: 16,
    letterSpacing: 0.4,
  },
  noDataImage: {
    marginTop: "-25%",
    height: "50%",
    resizeMode: "contain",
  },
});
