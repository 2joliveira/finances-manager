import { Alert } from "react-native";
import { SQLiteDatabase } from "expo-sqlite";
import type { Category, CategoryModel } from "@/models";

export function CategoryRepository(db: SQLiteDatabase) {
  return {
    findAll: () =>
      db.getAllAsync<CategoryModel>("SELECT * FROM categories ORDER BY name"),

    create: async (data: Category) => {
      const statement = await db.prepareAsync(
        "INSERT INTO categories (name) VALUES ($name)",
      );

      await statement.executeAsync({ $name: data.name });

      Alert.alert("Nova Categoria", "Categoria criada com sucesso!", [
        {
          text: "Ok",
        },
      ]);
    },
  };
}
