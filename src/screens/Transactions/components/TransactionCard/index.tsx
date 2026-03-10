import { Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { TransactionModel } from "@/models";
import { formatCurrency } from "@/utils/formatCyrrency";
import { colors } from "@/theme";
import { styles } from "./styles";

interface TransactionCard {
  transaction: TransactionModel;
}

export function TransactionCard({ transaction }: TransactionCard) {
  const { type, amount, description, is_installment } = transaction;

  const isIncome = type === "income";
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.navigate(`/transaction/${transaction.id}`)}
    >
      <MaterialIcons
        name={isIncome ? "trending-up" : "trending-down"}
        size={20}
        color={isIncome ? colors.green[500] : colors.red[500]}
        style={{
          ...styles.icon,
          backgroundColor: isIncome ? colors.green[100] : colors.red[100],
        }}
      />

      <View style={styles.titleContainer}>
        <Text style={styles.title}>{description}</Text>

        <Text style={styles.subtitle}>{isIncome ? "Receita" : "Despesa"}</Text>
      </View>

      <Text
        style={{
          ...styles.value,
          color: isIncome ? colors.green[500] : colors.red[500],
        }}
      >
        {`${!isIncome ? "-" : "+"} ${formatCurrency(amount)}`}
      </Text>
    </TouchableOpacity>
  );
}
