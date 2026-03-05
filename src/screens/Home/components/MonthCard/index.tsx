import { Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Month } from "@/database/repositories/TransactionRepository";
import { formatCurrency } from "@/utils/formatCyrrency";
import { colors } from "@/theme";
import { styles } from "./styles";
import { formatMonth } from "@/utils/formatMonth";

export function MonthCard({
  month,
  total_expense,
  total_income,
  total_transactions,
}: Month) {
  const total = total_income - total_expense;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.navigate("/transactions/2023-01")}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{formatMonth(month)}</Text>

        <Text
          style={styles.itemsCount}
        >{`${total_transactions} ${total_transactions > 1 ? "itens" : "item"}`}</Text>
        <MaterialIcons
          name="chevron-right"
          size={22}
          color={colors.gray[600]}
          style={{ marginRight: -8 }}
        />
      </View>

      <View style={styles.monthTransactions}>
        <View style={styles.monthTransactionContainer}>
          <MaterialIcons
            name="trending-up"
            size={20}
            color={colors.green[500]}
          />
          <Text
            style={{ ...styles.monthTransactionText, color: colors.green[500] }}
          >
            {formatCurrency(total_income)}
          </Text>
        </View>

        <View style={styles.monthTransactionContainer}>
          <MaterialIcons
            name="trending-down"
            size={20}
            color={colors.red[500]}
          />
          <Text
            style={{ ...styles.monthTransactionText, color: colors.red[500] }}
          >
            {formatCurrency(total_expense)}
          </Text>
        </View>
      </View>

      <View style={styles.totalContainer}>
        <Text
          style={{
            ...styles.totalText,
            color: total > 0 ? colors.green[500] : colors.red[500],
          }}
        >
          {`Saldo: ${formatCurrency(total)}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
