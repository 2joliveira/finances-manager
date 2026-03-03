import { Alert } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { Account, AccountModel } from "@/models/account";

export function useAccountDatabase() {
  const database = useSQLiteContext();

  async function create(data: Account) {
    try {
      const statement = await database.prepareAsync(
        "INSERT INTO accounts (name) values ($name)",
      );

      statement.executeAsync({
        $name: data.name,
      });

      Alert.alert("Nova Conta", "Conta criada com sucesso!", [
        {
          text: "Ok",
        },
      ]);
    } catch (err) {
      console.error({ err });
    }
  }

  async function listAll() {
    try {
      const response = await database.getAllAsync<AccountModel>("SELECT * FROM accounts");

      return response;
    } catch (err) {
      console.error(err);
    }
  }

  return { create, listAll };
}
