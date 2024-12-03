import { StyleSheet } from "react-native";
import colors from "@/theme/colors";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgColor,
    paddingHorizontal: 15,
  },
  greetingContainer: {
    gap: 12,
    paddingTop: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  greetingContent: {
    flex: 1,
    gap: 2,
  },
  greetingTitle: {
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.6,
  },
  greetingUsername: {
    fontSize: 13,
    letterSpacing: 0.4,
  },
  tasksContainer: {
    marginTop: 20,
    backgroundColor: colors.primaryColor,
    borderRadius: 10,
    overflow: "hidden",
  },
  writerImage: {
    bottom: "-18%",
    opacity: 0.9,
    right: 0,
    position: "absolute",
    height: "110%",
    width: "40%",
    resizeMode: "contain",
  },
  tasksContent: {
    padding: 12,
    gap: 12,
  },
  tasksTitle: {
    fontWeight: "600",
    letterSpacing: 0.4,
    color: colors.white,
  },
  tasksText: {
    fontWeight: "500",
    fontSize: 16,
    letterSpacing: 0.4,
    color: colors.white,
  },
  tasksTextBold: {
    fontSize: 25,
    fontWeight: "700",
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  sectionContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    backgroundColor: colors.bgColor,
    paddingVertical: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.4,
    flex: 1,
  },
  nextImage: {
    height: 12,
    width: 12,
    resizeMode: "contain",
    tintColor: colors.gray1,
  },
  addBtn: {
    height: 45,
    width: 45,
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: colors.primaryColor,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  addImage: {
    height: "50%",
    width: "50%",
    resizeMode: "contain",
    tintColor: colors.white,
  },
  userImage: {
    height: 45,
    width: 45,
    resizeMode: "contain",
  },
  searchBar: {
    gap: 12,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: colors.gray1_33,
  },
  searchImage: {
    height: 14,
    width: 14,
    resizeMode: "contain",
    tintColor: colors.gray1,
  },
  searchText: {
    fontWeight: "500",
    fontSize: 13,
    color: colors.gray1,
  },
  optionsContainerStyle: {
    marginTop: 55,
    width: "auto",
  },
  menuOptionStyle: {
    padding: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logoutImage: {
    height: 13,
    width: 13,
    resizeMode: "contain",
    tintColor: colors.error,
  },
  logoutText: {
    fontWeight: "500",
    fontSize: 15,
    letterSpacing: 0.3,
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
  gap12: {
    gap: 12,
  },
});
