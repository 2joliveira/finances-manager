import { colors, fontFamily } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: "98%",
    paddingHorizontal: 20,
    paddingVertical: 15,
    bottom: -20,
    left: -20,
    right: -20,
    justifyContent: "space-between",
    gap: 20,
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
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
    paddingBottom: 5, 
    fontFamily: fontFamily.medium,
    fontSize: 14,
    color: colors.gray[500],
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
