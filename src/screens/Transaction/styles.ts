import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/theme";

export const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    height: 260,
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    paddingTop: 40,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  headerDetails: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
  },
  title: {
    fontFamily: fontFamily.bold,
    color: colors.gray[100],
    fontSize: 20,
  },
  icon: {
    padding: 8,
    borderRadius: 100,
  },
  value: {
    fontFamily: fontFamily.bold,
    color: colors.gray[100],
    fontSize: 24,
  },
  category: {
    fontFamily: fontFamily.regular,
    color: colors.gray[100],
    fontSize: 14,
  },
  detailsText: {
    padding: 20,
    fontFamily: fontFamily.medium,
    color: colors.gray[600],
    fontSize: 20,
  },
  detailsContainer: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 20,
    marginHorizontal: 20,
  },
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: colors.gray[300],
  },
});
