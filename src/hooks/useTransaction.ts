import { useContext, useEffect, useMemo, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { TransactionRepository } from "@/database/repositories/TransactionRepository";
import { Context } from "@/context/context";
import { Transaction } from "@/models/transaction";

export function useTransactions() {
  const { dispatch, months, transaction, transactions, selectedPeriod } =
    useContext(Context);
  const db = useSQLiteContext();

  const transactionRepo = useMemo(() => TransactionRepository(db), [db]);

  async function loadMonths(year: number = new Date().getFullYear()) {
    const response = await transactionRepo.listByYear(year);

    dispatch({ type: "SET_MONTHS", payload: response });
  }

  async function listByPeriod(period?: string) {
    if (!period) return;

    const response = await transactionRepo.listByPeriod(period);

    dispatch({ type: "SET_TRANSACTIONS", payload: { data: response, period } });
  }

  async function createTransaction(data: Transaction) {
    await transactionRepo.create(data);
    await loadMonths();
  }

  async function showTransaction(id: string) {
    const transaction = await transactionRepo.show(id, selectedPeriod);

    dispatch({ type: "SET_TRANSACTION", payload: transaction });
  }

  useEffect(() => {
    loadMonths();
  }, []);

  return {
    transaction,
    transactions,
    months,
    createTransaction,
    showTransaction,
    loadMonths,
    listByPeriod,
  };
}
