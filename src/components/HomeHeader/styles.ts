import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";
import { fontFamily } from "../../theme/fontFamily";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 200,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  content: {
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
  subtitle: {
    fontFamily: fontFamily.medium,
    color: colors.gray[100],
    fontSize: 12,
  },
  filter: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  textInput: {
    flex: 1,
    height: 45,
    padding: 8,
    backgroundColor: colors.blue[500],
    borderRadius: 10,
    color: colors.gray[100],
    fontSize: 15,
  },
  yearSelect: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    padding: 8,
    backgroundColor: colors.blue[500],
    borderRadius: 10,
  },
  yearText: {
    fontFamily: fontFamily.regular,
    fontSize: 15,
    color: colors.gray[100],
  },
});
