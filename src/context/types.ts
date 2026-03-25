import {
  AccountModel,
  CategoryModel,
} from "@/models";

export type DatabaseState = {
  categories: CategoryModel[];
  accounts: AccountModel[];
  selectedPeriod: string;
  selectedYear: number;
};

export type Actions =
  | { type: "SET_SELECTED_YEAR", payload: number }
  | { type: "SET_SELECTED_PERIOD", payload: string }
  | { type: "SET_CATEGORIES"; payload: any[] }
  | { type: "SET_ACCOUNTS"; payload: any[] }

export const typeOptions = [
  { label: "Receita", value: "income" },
  { label: "Despesa", value: "expense" },
];
