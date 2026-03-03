import { colors, fontFamily } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    position: "relative",
    padding: 10,
    height: 50,
    backgroundColor: colors.gray[200],
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  placeholderOn: {
    fontFamily: fontFamily.medium,
    fontSize: 16,
    color: colors.gray[400],
  },
  placeholderOff: {
    position: "absolute",
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: colors.gray[400],
    top: 2,
    left: 5,
  },
  value: {
    fontFamily: fontFamily.medium,
    fontSize: 16,
    color: colors.gray[800],
    marginTop: 10,
  },
  modalContainer: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    padding: 15,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray[100],
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    gap: 20,
    zIndex: 999,
  }
});
