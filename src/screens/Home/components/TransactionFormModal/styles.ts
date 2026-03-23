import { colors, fontFamily } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: "85%",
    paddingHorizontal: 20,
    paddingVertical: 15,
    bottom: -25,
    left: -20,
    right: -20,
    gap: 20,
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  content: {
    position: "relative",
    flex: 1,
    height: "100%",
    gap: 20,
    justifyContent: "space-between",
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
    marginTop: 20,
  },
  buttonText: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    color: colors.gray[100],
  },
});
