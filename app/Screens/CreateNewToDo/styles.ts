import colors from "@/theme/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: colors.bgColor,
    padding: 15,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  formContainer: {
    flex: 1,
    gap: 18,
  },
  inputStyle: { backgroundColor: colors.white },
  titleInput: {
    color: colors.black,
    fontSize: 18,
    fontWeight: "500",
    letterSpacing: 0.6,
  },
  descriptionInput: {
    color: colors.black,
    minHeight: 90,
    textAlignVertical: "top",
  },
  dateTimePickerContainer: {
    backgroundColor: colors.white,
    padding: 4,
    borderRadius: 6,
    paddingHorizontal: 10,
  },
  dateTimeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  dateTimeLabel: {
    letterSpacing: 0.4,
    borderRadius: 6,
    flex: 1,
  },
  dateTimePickerButton: {
    backgroundColor: colors.gray2,
    padding: 8,
    borderRadius: 5,
  },
  dateTimeText: {
    fontWeight: "500",
    fontSize: 13,
    letterSpacing: 0.3,
  },
  createButton: {
    marginTop: 20,
    marginBottom: 10,
  },
  completeRow: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
  },
});
