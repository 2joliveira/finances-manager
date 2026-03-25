import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { TransactionsHeader } from "./components/TransactionsHeader";
import { TransactionCard } from "./components/TransactionCard";
import { useTransactions } from "@/hooks";

export function Transactions() {
  const { period } = useLocalSearchParams();

  const { transactions } = useTransactions();

  return (
    <View style={{ flex: 1 }}>
      <TransactionsHeader period={period} />

      <ScrollView contentContainerStyle={styles.container}>
        {transactions ? (
          transactions.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              transaction={transaction}
            />
          ))
        ) : (
          <Text>Não existe transações nesse periodo.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
});
