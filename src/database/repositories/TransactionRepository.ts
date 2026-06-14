import { Alert } from "react-native";
import { SQLiteDatabase } from "expo-sqlite";
import {
  Month,
  Transaction,
  TransactionDetails,
  TransactionModel,
} from "@/models";

export function TransactionRepository(db: SQLiteDatabase) {
  return {
    create: async (data: Transaction) => {
      const statement = await db.prepareAsync(
        "INSERT INTO transactions (description, amount, type, is_fixed, is_installment, installments, category_id, account_id, transaction_date) values ($description, $amount, $type, $is_fixed, $is_installment, $installments, $category_id, $account_id, $transaction_date)",
      );

      const isInstallment = data.is_installment === 1;
      const isFixed = data.is_fixed === 1;

      const transaction = await statement.executeAsync({
        $description: data.description,
        $amount: Number(data.amount),
        $type: data.type,
        $is_fixed: data.is_fixed,
        $is_installment: data.is_installment,
        $installments: isInstallment ? data.installments : 0,
        $category_id: data.category_id,
        $account_id: data.account_id,
        $transaction_date: data.transaction_date.toISOString(),
      });

      if (isInstallment) {
        for (let i = 1; i <= data.installments; i++) {
          const transactionId = transaction.lastInsertRowId;
          const dueDate = new Date(data.transaction_date);
          dueDate.setMonth(data.transaction_date.getMonth() + (i - 1));

          await db.runAsync(
            `
            INSERT INTO installments (
              transaction_id,
              installment_number,
              amount,
              due_date
            )
            VALUES (
              $transaction_id,
              $installment_number,
              $amount,
              $due_date
            )`,
            [transactionId, i, data.amount, dueDate.toISOString()],
          );
        }
      }

      Alert.alert("Nova Transação", "Transação criada com sucesso!", [
        {
          text: "Ok",
        },
      ]);
    },

    listByYear: (year: number = new Date().getFullYear()) => {
      return db.getAllAsync<Month>(`
        WITH active_months AS (

          -- meses que possuem movimentação real
          SELECT DISTINCT
            strftime('%Y-%m', i.due_date) AS month
          FROM installments i
          WHERE i.due_date >= '${year}-01-01'
            AND i.due_date < '${year + 1}-01-01'

          UNION

          SELECT DISTINCT
            strftime('%Y-%m', t.transaction_date) AS month
          FROM transactions t
          WHERE t.is_installment = 0
            AND t.transaction_date >= '${year}-01-01'
            AND t.transaction_date < '${year + 1}-01-01'
        )

        SELECT
          month,
          COUNT(*) AS total_transactions,
          SUM(total_income) AS total_income,
          SUM(total_expense) AS total_expense
        FROM (

          -- 🟢 TRANSAÇÕES PARCELADAS
          SELECT
            strftime('%Y-%m', i.due_date) AS month,
            CASE 
              WHEN t.type = 'income' THEN i.amount 
              ELSE 0 
            END AS total_income,

            CASE 
              WHEN t.type = 'expense' THEN i.amount 
              ELSE 0 
            END AS total_expense

          FROM installments i
          JOIN transactions t 
            ON t.id = i.transaction_id

          WHERE i.due_date >= '${year}-01-01'
            AND i.due_date < '${year + 1}-01-01'

          UNION ALL

          -- 🔵 TRANSAÇÕES NORMAIS
          SELECT
            strftime('%Y-%m', t.transaction_date) AS month,

            CASE 
              WHEN t.type = 'income' THEN t.amount 
              ELSE 0 
            END AS total_income,

            CASE 
              WHEN t.type = 'expense' THEN t.amount 
              ELSE 0 
            END AS total_expense

          FROM transactions t

          WHERE t.is_installment = 0
            AND t.is_fixed = 0
            AND t.transaction_date >= '${year}-01-01'
            AND t.transaction_date < '${year + 1}-01-01'

          UNION ALL

          -- 🟣 TRANSAÇÕES FIXAS
          SELECT
            am.month,

            CASE 
              WHEN t.type = 'income' THEN t.amount 
              ELSE 0 
            END AS total_income,

            CASE 
              WHEN t.type = 'expense' THEN t.amount 
              ELSE 0 
            END AS total_expense

          FROM transactions t
          CROSS JOIN active_months am

          WHERE t.is_fixed = 1
            AND t.is_installment = 0

        )

        GROUP BY month
        ORDER BY month;
      `);
    },

    listByPeriod: (period: string) => {
      return db.getAllAsync<TransactionModel>(`
        SELECT *
        FROM (
          -- 🟢 PARCELADAS
          SELECT 
            t.id,
            t.description,
            t.type,
            i.amount,
            i.due_date AS transaction_date,
            i.installment_number,
            t.installments,
            t.is_fixed,
            t.is_installment,
            c.name AS category_name,
            a.name AS account_name
          FROM installments i
          JOIN transactions t ON t.id = i.transaction_id
          JOIN categories c ON c.id = t.category_id
          JOIN accounts a ON a.id = t.account_id

          WHERE i.due_date >= '${period}-01'
            AND i.due_date < DATE('${period}-01', '+1 month')

          UNION ALL

          -- 🔵 NÃO PARCELADAS
          SELECT 
            t.id,
            t.description,
            t.type,
            t.amount,
            t.transaction_date,
            NULL AS installment_number,
            NULL AS installments,
            t.is_fixed,
            t.is_installment,
            c.name AS category_name,
            a.name AS account_name
          FROM transactions t
          JOIN categories c ON c.id = t.category_id
          JOIN accounts a ON a.id = t.account_id

          WHERE t.is_installment = 0
            AND t.is_fixed = 0
            AND t.transaction_date >= '${period}-01'
            AND t.transaction_date < DATE('${period}-01', '+1 month')

          UNION ALL

          -- 🟣 TRANSAÇÕES FIXAS

          SELECT
            t.id,
            t.description,
            t.type,
            t.amount,
            -- build a date in the current period that preserves the original day-of-month
            DATE('${period}-01', printf('+%d days', CAST(strftime('%d', t.transaction_date) AS integer) - 1)) AS transaction_date,
            NULL AS installment_number,
            NULL AS installments,
            t.is_fixed,
            t.is_installment,
            c.name AS category_name,
            a.name AS account_name

          FROM transactions t
          JOIN categories c ON c.id = t.category_id
          JOIN accounts a ON a.id = t.account_id

          WHERE t.is_fixed = 1
            AND t.is_installment = 0
        )

        ORDER BY transaction_date;
      `);
    },

    listFixed: () => {
      return db.getAllAsync<TransactionDetails>(`
        SELECT
          t.id,
          t.description,
          t.amount,
          t.transaction_date,
          c.name AS category_name
        FROM transactions t
        JOIN categories c ON c.id = t.category_id
        WHERE is_fixed = 1 ORDER BY transaction_date;
      `);
    },

    show: async (id: string, period: string) => {
      const startDate = `${period}-01`;
      const endDate = `${period}-31`;

      return await db.getFirstAsync<TransactionDetails>(
        `
          SELECT 
            t.*,
            c.name AS category_name,
            a.name AS account_name,
            i.installment_number,
            i.due_date
          FROM transactions t
          JOIN categories c ON c.id = t.category_id
          JOIN accounts a ON a.id = t.account_id
          LEFT JOIN installments i 
            ON i.id = (
              SELECT i2.id
              FROM installments i2
              WHERE i2.transaction_id = t.id
                AND i2.due_date >= ?
                AND i2.due_date <= ?
              ORDER BY i2.due_date ASC
              LIMIT 1
            )
          WHERE t.id = ?
        `,
        [startDate, endDate, id],
      );
    },
  };
}
