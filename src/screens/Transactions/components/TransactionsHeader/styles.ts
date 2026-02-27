import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/theme";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 220,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 60,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  icon: {
    padding: 8,
    backgroundColor: colors.blue[500],
    borderRadius: 100,
  },
  title: {
    fontFamily: fontFamily.bold,
    color: colors.gray[100],
    fontSize: 20,
  },
  detailsContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  }
});
