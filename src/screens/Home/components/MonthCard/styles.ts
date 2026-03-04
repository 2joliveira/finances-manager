import { colors, fontFamily } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    height: 150,
    padding: 20,
    backgroundColor: colors.white,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 20,
  },
  cardHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  cardTitle: {
    flex: 1,
    fontFamily: fontFamily.bold,
    color: colors.gray[800],
    fontSize: 20,
  },
  itemsCount: {
    paddingBottom: 2,
    fontFamily: fontFamily.regular,
    color: colors.gray[600],
    fontSize: 14,
  },
  monthTransactions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[300],
    paddingBottom: 10,
  },
  monthTransactionContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  monthTransactionText: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
  },
  totalContainer: {
    flex: 1,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    marginBottom: -5,
  },
  totalText: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
  }
});
