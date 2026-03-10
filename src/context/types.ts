import { AccountModel, CategoryModel, Month, Transaction, TransactionModel } from "@/models";

export type DatabaseState = {
  categories: CategoryModel[];
  accounts: AccountModel[];
  months: Month[];
  transactions: TransactionModel[];
};

export type DatabaseAction =
  | { type: "SET_CATEGORIES"; payload: any[] }
  | { type: "SET_ACCOUNTS"; payload: any[] }
  | { type: "SET_MONTHS"; payload: Month[] }
  | { type: "SET_TRANSACTIONS"; payload: TransactionModel[] };
