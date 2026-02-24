import { colors, fontFamily } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 15,
    backgroundColor: colors.white,  
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  icon: {
    padding: 8,
    borderRadius: 100,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: colors.gray[900],
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.gray[600],
  },
  value: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
  },
});
