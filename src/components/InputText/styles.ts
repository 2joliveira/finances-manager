import { colors, fontFamily } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    position: "relative",
    paddingHorizontal: 10,
    height: 50,
    backgroundColor: colors.gray[200],
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  placeholder: {
    position: "absolute",
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: colors.gray[400],
    top: 2,
    left: 10,
  },
  value: {
    flex: 1,
    fontFamily: fontFamily.medium,
    fontSize: 14,
    color: colors.gray[800],
    zIndex: 999,
  },
});
