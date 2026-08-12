import { Alert } from "react-native";
import { SQLiteDatabase } from "expo-sqlite";
import { Account, AccountModel } from "@/models";

export function AccountRepository(db: SQLiteDatabase) {
  return {
    findAll: () => {
      const result = db.getAllSync<AccountModel>(`
        SELECT * FROM accounts ORDER BY name
      `);

      return result
    },

    create: async (data: Account) => {
      try {
        const statement = await db.prepareAsync(`
        INSERT INTO accounts (name, type) VALUES ($name, $type)  
      `);

        await statement.executeAsync({ $name: data.name, $type: data.type });

        Alert.alert("Nova Conta", "Conta criada com sucesso!", [
          {
            text: "Ok",
          },
        ]);
      } catch (erro) {
        Alert.alert("Nova Conta", "Erro ao criar uma nova conta !", [
          {
            text: "Ok",
          },
        ]);
        console.error({ erro });
      }
    },

    remove: async (id: number) => {
      try {
        await db.runAsync("DELETE FROM accounts WHERE id = ?", id);
      } catch (error) {
        console.error({ error });
      }
    },
  };
}
