import z from "zod";

export const transactionSchema = z.object({
  description: z
    .string({ error: "Descrição é obrigatória." })
    .min(4, { error: "Descrição deve ter mais de 4 letras." }),
  amount: z.coerce.number({ error: "Valor é obrigatório." }),
  type: z.enum(["income", "expense"], {
    error: "Tipo deve ser 'income' ou 'expense'.",
  }),
  is_installment: z.number().default(0),
  installments: z.coerce.number().optional(),
  category_id: z.number({ error: "Categoria é obrigatória." }),
  account_id: z.number({ error: "Conta é obrigatória." }),
  transaction_date: z.date({ error: "Data da transação é obrigatória." }),
});

export type Transaction = z.infer<typeof transactionSchema>;

export interface InstallmentDetails {
  amount: number;
  due_date: Date;
  installment_number: number;
}
export interface TransactionModel extends Transaction {
  id: number;
}

export interface TransactionDetails extends TransactionModel {
  category_name: string;
  account_name: string;
  installment_details?: InstallmentDetails;
}

export interface Month {
  month: string;
  total_transactions: number;
  total_expense: number;
  total_income: number;
}
