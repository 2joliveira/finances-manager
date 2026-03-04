import { useContext, useEffect, useMemo } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { CategoryRepository } from "@/database/repositories/CategoryRepository";
import { Context } from "@/context/context";
import { Account } from "@/models/account";

export function useCategories() {
  const { dispatch, categories } = useContext(Context);
  const db = useSQLiteContext();

  const categoryRepo = useMemo(() => CategoryRepository(db), [db]);

  async function loadCategories() {
    const data = await categoryRepo.findAll();
    dispatch({ type: "SET_CATEGORIES", payload: data });
  }

  async function createCategory(data: Account) {
    await categoryRepo.create(data);
    await loadCategories();
  }

  useEffect(() => {
    loadCategories();
  }, []);

  return {
    categories,
    createCategory,
  };
}
