export type DatabaseState = {
  selectedPeriod: string;
  selectedYear: number;
};

export type Actions =
  | { type: "SET_SELECTED_YEAR"; payload: number }
  | { type: "SET_SELECTED_PERIOD"; payload: string };

export const typeOptions = [
  { label: "Receita", value: "income" },
  { label: "Despesa", value: "expense" },
];
