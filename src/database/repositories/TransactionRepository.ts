import { Alert } from "react-native";
import { SQLiteDatabase } from "expo-sqlite";
import { Transaction } from "@/models/transaction";

export interface Month {
  month: string;
  total_transactions: number;
  total_expense: number;
  total_income: number;
}

export function TransactionRepository(db: SQLiteDatabase) {
  return {
    create: async (data: Transaction) => {
      const statement = await db.prepareAsync(
        "INSERT INTO transactions (description, amount, type, is_installment, installments, category_id, account_id, transaction_date) values ($description, $amount, $type, $is_installment, $installments, $category_id, $account_id, $transaction_date)",
      );

      await statement.executeAsync({
        $description: data.description,
        $amount: Number(data.amount),
        $type: data.type,
        $is_installment: data.is_installment,
        $installments: data.is_installment === 1 ? data.installments : 0,
        $category_id: data.category_id,
        $account_id: data.account_id,
        $transaction_date: data.transaction_date.toISOString(),
      });

      Alert.alert("Nova Transação", "Transação criada com sucesso!", [
        {
          text: "Ok",
        },
      ]);
    },

    listByYear: () =>
      db.getAllAsync<Month>(`
        SELECT
          strftime('%Y-%m', transaction_date) AS month,

          COUNT(*) AS total_transactions,

          SUM(
            CASE 
              WHEN type = 'income' THEN amount
              ELSE 0
            END
          ) AS total_income,

          SUM(
            CASE 
              WHEN type = 'expense' THEN amount
              ELSE 0
            END
          ) AS total_expense
        FROM transactions
        WHERE transaction_date >= '2026-01-01'
          AND transaction_date <  '2027-01-01'
        GROUP BY month
        ORDER BY month; 
      `),
  };
}
