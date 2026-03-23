import z from "zod";

export const accountSchema = z.object({
  name: z
    .string({ error: "O nome da conta é obrigatório" })
    .min(2, "O nome da conta é obrigatório"),
  type: z.enum(["income", "expense"], {
    error: "Tipo deve ser 'income' ou 'expense'.",
  }),
});

export type Account = z.infer<typeof accountSchema>;

export interface AccountModel extends Account {
  id: number;
}
