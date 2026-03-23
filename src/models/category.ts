import z from "zod";

export const categorySchema = z.object({
  name: z
    .string({ error: "O nome da categoria é obrigatório" })
    .min(2, "O nome da categoria é obrigatório"),
  type: z.enum(["income", "expense"], {
    error: "Tipo deve ser 'income' ou 'expense'.",
  }),
});

export type Category = z.infer<typeof categorySchema>;

export interface CategoryModel extends Category {
  id: number;
}
