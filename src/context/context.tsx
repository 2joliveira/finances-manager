import { createContext, useReducer } from "react";
import { databaseReducer } from "./reducer";
import { Actions, DatabaseState } from "./types";

type ContextData = DatabaseState & {
  dispatch: React.ActionDispatch<[action: Actions]>;
};

export const Context = createContext<ContextData>({} as ContextData);

const initialState: DatabaseState = {
  categories: [],
  accounts: [],
  months: [],
  transactions: [],
  transaction: null,
  selectedPeriod: null,
  selectedYear: null,
};

export function FinancesManagerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(databaseReducer, initialState);

  return (
    <Context.Provider
      value={{
        dispatch,
        categories: state.categories,
        accounts: state.accounts,
        months: state.months,
        transactions: state.transactions,
        transaction: state.transaction,
        selectedPeriod: state.selectedPeriod,
        selectedYear: state.selectedYear,
      }}
    >
      {children}
    </Context.Provider>
  );
}
