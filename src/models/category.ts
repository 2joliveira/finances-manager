import z from "zod";

export const categorySchema = z.object({
  name: z
    .string({ error: "O nome da categoria é obrigatório" })
    .min(2, "O nome da categoria é obrigatório"),
});

export type Category = z.infer<typeof categorySchema>;
