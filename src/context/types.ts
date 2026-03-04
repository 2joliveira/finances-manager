import { Month } from "@/database/repositories/TransactionRepository";
import { AccountModel } from "@/models/account";
import { CategoryModel } from "@/models/category";

export type DatabaseState = {
  categories: CategoryModel[];
  accounts: AccountModel[];
  months: Month[];
};

export type DatabaseAction =
  | { type: "SET_CATEGORIES"; payload: any[] }
  | { type: "SET_ACCOUNTS"; payload: any[] }
  | { type: "SET_MONTHS"; payload: any[] };
