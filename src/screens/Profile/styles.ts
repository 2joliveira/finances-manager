import { colors } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    gap: 20,
  },
  tags_options: {
    padding: 4,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: colors.gray[300],
    borderRadius: 10,
  }
})