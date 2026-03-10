import {
  AccountModel,
  CategoryModel,
  Month,
  TransactionDetails,
  TransactionModel,
} from "@/models";

export type DatabaseState = {
  categories: CategoryModel[];
  accounts: AccountModel[];
  months: Month[];
  transaction: TransactionDetails;
  transactions: TransactionModel[];
};

export type DatabaseAction =
  | { type: "SET_CATEGORIES"; payload: any[] }
  | { type: "SET_ACCOUNTS"; payload: any[] }
  | { type: "SET_MONTHS"; payload: Month[] }
  | { type: "SET_TRANSACTION"; payload: TransactionDetails }
  | { type: "SET_TRANSACTIONS"; payload: TransactionModel[] };
