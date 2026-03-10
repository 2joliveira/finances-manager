import { AccountModel, CategoryModel, Month } from "@/models";

export type DatabaseState = {
  categories: CategoryModel[];
  accounts: AccountModel[];
  months: Month[];
};

export type DatabaseAction =
  | { type: "SET_CATEGORIES"; payload: any[] }
  | { type: "SET_ACCOUNTS"; payload: any[] }
  | { type: "SET_MONTHS"; payload: any[] };
