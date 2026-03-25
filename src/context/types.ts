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
  selectedPeriod: string;
  selectedYear: number;
};

export type Actions =
  | { type: "SET_CATEGORIES"; payload: any[] }
  | { type: "SET_ACCOUNTS"; payload: any[] }
  | { type: "SET_MONTHS"; payload: { data: Month[]; year: number } }
  | { type: "SET_TRANSACTION"; payload: TransactionDetails }
  | {
      type: "SET_TRANSACTIONS";
      payload: { data: TransactionModel[]; period: string };
    };

export const typeOptions = [
  { label: "Receita", value: "income" },
  { label: "Despesa", value: "expense" },
];
