import { useContext, useEffect, useMemo } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { AccountRepository } from "@/database/repositories/AccountRepository";
import { Context } from "@/context/context";
import { Account } from "@/models";

export function useAccount() {
  const { dispatch, accounts } = useContext(Context);
  const db = useSQLiteContext();

  const accountRepo = useMemo(() => AccountRepository(db), [db]);

  async function loadAccounts() {
    const data = await accountRepo.findAll();
    dispatch({ type: "SET_ACCOUNTS", payload: data });
  }

  async function createAccount(data: Account) {
    await accountRepo.create(data);
    await loadAccounts();
  }

  useEffect(() => {
    loadAccounts();
  }, []);

  return {
    createAccount,
    accounts,
  };
}
