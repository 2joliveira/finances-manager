import { colors, fontFamily } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: "70%",
    padding: 20,
    bottom: -20,
    left: -20,
    right: -20,
    justifyContent: "space-between",
    gap: 5,
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 20,
  },
  closeButton: {
    padding: 8,
    backgroundColor: colors.gray[200],
    borderRadius: 50,
  },
  label: {
    padding: 5,
    fontFamily: fontFamily.medium,
    fontSize: 14,
    color: colors.gray[500],
  },
  input: {
    padding: 10,
    height: 50,
    backgroundColor: colors.gray[200],
    borderRadius: 10,
    fontFamily: fontFamily.medium,
    fontSize: 16,
    color: colors.gray[800],
  },
  button: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    backgroundColor: colors.blue[500],
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    color: colors.gray[100],
  },
});
