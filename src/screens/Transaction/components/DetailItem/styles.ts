import { colors, fontFamily } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 20,
  },
  content: {
    gap: 10,
  },
  title: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.gray[500]
  },
  value: {
    fontFamily: fontFamily.medium,
    fontSize: 16,
    color: colors.gray[800]
  }
})