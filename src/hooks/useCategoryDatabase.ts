import { useSQLiteContext } from "expo-sqlite";
import { Category } from "@/models/category";
import { Alert } from "react-native";
import { router } from "expo-router";

export function useCategoryDatabase() {
  const database = useSQLiteContext();

  async function create(data: Category) {
    try {
      const statement = await database.prepareAsync(
        "INSERT INTO categories (name) values ($name)",
      );

      statement.executeAsync({
        $name: data.name,
      });

      Alert.alert("Nova Meta", "Meta criada com sucesso!", [
        {
          text: "Ok",
          onPress: router.back,
        },
      ]);
    } catch (err) {
      console.error({ err });
    }
  }

  async function listAll() {
    return await database.getAllAsync("SELECT * FROM categories");
  }

  return { create, listAll };
}
