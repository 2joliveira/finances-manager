import { useMemo } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AccountRepository } from "@/database/repositories/AccountRepository";
import { Account } from "@/models";

export function useAccount() {
  const db = useSQLiteContext();
  const queryClient = useQueryClient();

  const accountRepo = useMemo(() => AccountRepository(db), [db]);

  const { data: accounts, isLoading: isLoadingAccounts } = useQuery({
    queryKey: ["accounts"],
    queryFn: () => {
      return accountRepo.findAll();
    },
  });

  const createAccount = useMutation({
    mutationFn: async (data: Account) => {
      return await accountRepo.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });

  return {
    accounts,
    isLoadingAccounts,
    createAccount: createAccount.mutateAsync,
    isCreatingAccount: createAccount.isPending,
  };
}
