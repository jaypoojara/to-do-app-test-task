import colors from "@/theme/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondaryColor,
  },
  scrollViewStyle: {
    flexGrow: 1,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  imageContainer: {
    position: "absolute",
    height: "65%",
    width: "100%",
  },
  imageOverlay: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: colors.black6,
  },
  logoContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: "100%",
    width: "55%",
    resizeMode: "contain",
  },
  bottomContainer: {
    minHeight: "40%",
    backgroundColor: colors.secondaryColor,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    padding: 15,
    gap: 20,
    paddingBottom: 25,
  },
  title: {
    textAlign: "center",
    fontWeight: "600",
    color: colors.white,
    fontSize: 20,
    letterSpacing: 0.8,
  },
  buttonContainer: {
    marginTop: 15,
  },
  text: {
    fontWeight: "400",
    textAlign: "center",
    color: colors.white,
    letterSpacing: 0.4,
  },
  link: {
    fontWeight: "500",
    color: colors.primaryColor,
  },
});
