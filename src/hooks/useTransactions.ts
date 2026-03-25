import { useContext, useMemo } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TransactionRepository } from "@/database/repositories/TransactionRepository";
import { Context } from "@/context/context";
import { Transaction } from "@/models/transaction";

export function useTransactions(transactionId?: string) {
  const db = useSQLiteContext();
  const { selectedPeriod, selectedYear } = useContext(Context);
  const queryClient = useQueryClient();

  const transactionRepo = useMemo(() => TransactionRepository(db), [db]);

  const { data: months, isLoading: isLoadingMonths } = useQuery({
    queryKey: ["months", selectedYear],
    queryFn: () => transactionRepo.listByYear(selectedYear),
  });

  const { data: transactions, isLoading: isLoadingTransactions } = useQuery({
    queryKey: ["transactions", selectedPeriod],
    queryFn: () => transactionRepo.listByPeriod(selectedPeriod),
  });

  const { data: transaction, isLoading: isLoadingTransaction } = useQuery({
    queryKey: ["transaction", transactionId, selectedPeriod],
    queryFn: () => transactionRepo.show(transactionId, selectedPeriod),
    enabled: !!transactionId,
  });

  const createTransaction = useMutation({
    mutationFn: async (data: Transaction) => {
      return await transactionRepo.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["months", selectedYear] });
    },
  });

  return {
    months,
    isLoadingMonths,
    transactions,
    isLoadingTransactions,
    transaction,
    isLoadingTransaction,
    createTransaction: createTransaction.mutateAsync,
    isCreatingTransaction: createTransaction.isPending,
  };
}
