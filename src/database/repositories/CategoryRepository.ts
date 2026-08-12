import { Alert } from "react-native";
import { SQLiteDatabase } from "expo-sqlite";
import type { Category, CategoryModel } from "@/models";

export function CategoryRepository(db: SQLiteDatabase) {
  return {
    findAll: () =>
      db.getAllAsync<CategoryModel>("SELECT * FROM categories ORDER BY name"),

    create: async (data: Category) => {
      try {
        const statement = await db.prepareAsync(`
            INSERT INTO categories (name) VALUES ($name)  
          `);

        await statement.executeAsync({ $name: data.name });

        Alert.alert("Nova Categoria", "Categoria criada com sucesso!", [
          {
            text: "Ok",
          },
        ]);
      } catch (erro) {
        Alert.alert("Nova Categoria", "Erro ao criar uma nova categoria !", [
          {
            text: "Ok",
          },
        ]);
        console.error({ erro });
      }
    },

    remove: async (id: number) => {
      try {
        await db.runAsync("DELETE FROM categories WHERE id = ?", id);
      } catch (error) {
        console.error({ error });
      }
    },
  };
}
