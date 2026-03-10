import { useContext, useEffect, useMemo } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { TransactionRepository } from "@/database/repositories/TransactionRepository";
import { Context } from "@/context/context";
import { Transaction } from "@/models/transaction";

export function useTransactions() {
  const { dispatch, months, transactions } = useContext(Context);
  const db = useSQLiteContext();

  const transactionRepo = useMemo(() => TransactionRepository(db), [db]);

  async function loadMonths(year: number = new Date().getFullYear()) {
    const data = await transactionRepo.listByYear(year);

    dispatch({ type: "SET_MONTHS", payload: data });
  }

  async function listByPeriod(period?: string) {
    if (!period) return;

    const response = await transactionRepo.listByPeriod(period);

    dispatch({ type: "SET_TRANSACTIONS", payload: response });
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
    loadMonths,
    listByPeriod,
    transactions,
  };
}
