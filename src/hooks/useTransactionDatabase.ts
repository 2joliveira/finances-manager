import { Alert } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import type { Transaction } from "@/models/transaction";

export function useTransactionDatabase() {
  const database = useSQLiteContext();

  async function create(data: Transaction) {
    try {
      const statement = await database.prepareAsync(
        "INSERT INTO transactions (description, amount, type, is_installment, installments, category_id, account_id, transaction_date) values ($description, $amount, $type, $is_installment, $installments, $category_id, $account_id, $transaction_date)",
      );

      statement.executeAsync({
        $description: data.description,
        $amount: Number(data.amount),
        $type: data.type,
        $is_installment: data.is_installment,
        $installments: data.is_installment === 1 ? data.installments : 0,
        $category_id: data.category_id,
        $account_id: data.account_id,
        $transaction_date: data.transaction_date.toString(),
      });

      Alert.alert("Nova Transação", "Transação criada com sucesso!", [
        {
          text: "Ok",
        },
      ]);
    } catch (err) {
      console.error({ err });
    }
  }

  return { create };
}
