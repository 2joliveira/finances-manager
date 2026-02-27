import { StyleSheet } from "react-native";
import { colors } from "@/theme";

export const styles = StyleSheet.create({
  container: {
    width: 160,
    height: 50,
    borderRadius: 20,
    backgroundColor: colors.gray[200],
    flexDirection: "row",
    alignItems: "center",
    padding: 1,
    overflow: "hidden",
  },

  thumb: {
    position: "absolute",
    left: 0,
    height: "100%",
    width: 80,
    backgroundColor: colors.blue[500],
    borderRadius: 20,
  },

  option: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },

  text: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.gray[500],
  },

  textActive: {
    color: "#FFFFFF",
  },
});
