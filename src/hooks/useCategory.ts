import { useMemo } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CategoryRepository } from "@/database/repositories/CategoryRepository";
import { Category } from "@/models";

export function useCategories() {
  const db = useSQLiteContext();
  const queryClient = useQueryClient();

  const categoryRepo = useMemo(() => CategoryRepository(db), [db]);

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryRepo.findAll(),
  });

  const createCategory = useMutation({
    mutationFn: async (data: Category) => {
      return await categoryRepo.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return {
    categories: categories || [],
    isLoadingCategories,
    createCategory: createCategory.mutateAsync,
    isCreatingCategory: createCategory.isPending,
  };
}
