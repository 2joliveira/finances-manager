import { useContext, useEffect, useMemo } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { TransactionRepository } from "@/database/repositories/TransactionRepository";
import { Context } from "@/context/context";
import { Transaction } from "@/models/transaction";

export function useTransactions() {
  const { dispatch, months } = useContext(Context);
  const db = useSQLiteContext();

  const transactionRepo = useMemo(() => TransactionRepository(db), [db]);

  async function loadMonths() {
    const data = await transactionRepo.listByYear();

    dispatch({ type: "SET_MONTHS", payload: data });
  }

  async function createTransaction(data: Transaction) {
    await transactionRepo.create(data);
    await loadMonths();
  }

  useEffect(() => {
    loadMonths();
  }, []);

  return {
    createTransaction,
    months,
  };
}
