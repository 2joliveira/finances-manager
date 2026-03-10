import { Alert } from "react-native";
import { SQLiteDatabase } from "expo-sqlite";
import { Account, AccountModel } from "@/models";

export function AccountRepository(db: SQLiteDatabase) {
  return {
    findAll: () =>
      db.getAllSync<AccountModel>(`
        SELECT * FROM accounts ORDER BY name
      `),

    create: async (data: Account) => {
      const statement = await db.prepareAsync(`
        INSERT INTO accounts (name) VALUES ($name)  
      `);

      await statement.executeAsync({ $name: data.name });

      Alert.alert("Nova Categoria", "Categoria criada com sucesso!", [
        {
          text: "Ok",
        },
      ]);
    },
  };
}
