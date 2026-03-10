import { Alert } from "react-native";
import { SQLiteDatabase } from "expo-sqlite";
import { Month, Transaction } from "@/models";

export function TransactionRepository(db: SQLiteDatabase) {
  return {
    create: async (data: Transaction) => {
      const statement = await db.prepareAsync(
        "INSERT INTO transactions (description, amount, type, is_installment, installments, installments_number, category_id, account_id, transaction_date) values ($description, $amount, $type, $is_installment, $installments, $installments_number, $category_id, $account_id, $transaction_date)",
      );

      const isInstallment = data.is_installment === 1;
      const installmentsQuantity = isInstallment ? data.installments : 1;
      const baseDate = new Date(data.transaction_date);

      for (let i = 1; i <= installmentsQuantity; i++) {
        const date = new Date(baseDate);
        date.setMonth(baseDate.getMonth() + (i - 1));

        await statement.executeAsync({
          $description: data.description,
          $amount: Number(data.amount),
          $type: data.type,
          $is_installment: data.is_installment,
          $installments: isInstallment ? data.installments : 0,
          $installments_number: i,
          $category_id: data.category_id,
          $account_id: data.account_id,
          $transaction_date: new Date(date).toISOString(),
        });
      }

      Alert.alert("Nova Transação", "Transação criada com sucesso!", [
        {
          text: "Ok",
        },
      ]);
    },

    listByYear: (year: number = new Date().getFullYear()) =>
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
        WHERE transaction_date >= '${year}-01-01'
          AND transaction_date <  '${year + 1}-01-01'
        GROUP BY month
        ORDER BY month; 
      `),
  };
}
