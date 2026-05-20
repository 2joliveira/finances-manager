import { colors } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    gap: 10,
  },
  tags_options: {
    padding: 2,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: colors.gray[300],
    borderRadius: 10,
  }
})