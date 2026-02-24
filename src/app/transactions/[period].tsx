import { ScrollView, StyleSheet, View } from "react-native";
import { TransactionsHeader } from "@/components/TransactionsHeader";
import { TransactionCard } from "@/components/TransactionCard";

export default function Transactions() {
  return (
    <View style={{ flex: 1 }}>
      <TransactionsHeader />

      <ScrollView contentContainerStyle={styles.container}>
          <TransactionCard
            iconName="trending-up"
            title="Salário"
            subtitle="Receita"
            value={1000}
            type="income"
          />

          <TransactionCard
            iconName="trending-down"
            title="Aluguel"
            subtitle="Despesa"
            value={500}
            type="expense"
          />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
})