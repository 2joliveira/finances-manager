import z from "zod";

export const transactionSchema = z.object({
  description: z
    .string({ error: "Descrição é obrigatória." })
    .min(4, { error: "Descrição deve ter mais de 4 letras." }),
  amount: z.number({ error: "Valor é obrigatório." }),
  type: z.enum(["income", "expense"], {
    error: "Tipo deve ser 'income' ou 'expense'.",
  }),
  is_installment: z.boolean().default(false),
  installments: z.number().optional(),
  category_id: z.number({ error: "Categoria é obrigatória." }),
  account_id: z.number({ error: "Conta é obrigatória." }),
  transaction_date: z.string({ error: "Data da transação é obrigatória." }),
});

export type Transaction = z.infer<typeof transactionSchema>;

export interface TransactionModel extends Transaction {
  id: number;
}
