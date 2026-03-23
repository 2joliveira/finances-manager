import { Alert } from "react-native";
import { SQLiteDatabase } from "expo-sqlite";
import type { Category, CategoryModel } from "@/models";

export function CategoryRepository(db: SQLiteDatabase) {
  return {
    findAll: () =>
      db.getAllAsync<CategoryModel>("SELECT * FROM categories ORDER BY name"),

    create: async (data: Category) => {
      const statement = await db.prepareAsync(
        "INSERT INTO categories (name, type) VALUES ($name, $type)",
      );

      await statement.executeAsync({ $name: data.name, $type: data.type });

      Alert.alert("Nova Categoria", "Categoria criada com sucesso!", [
        {
          text: "Ok",
        },
      ]);
    },
  };
}
