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
  };
}
