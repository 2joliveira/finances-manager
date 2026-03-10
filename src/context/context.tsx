import { createContext, useReducer } from "react";
import { databaseReducer } from "./reducer";
import { DatabaseAction, DatabaseState } from "./types";

type ContextData = DatabaseState & {
  dispatch: React.ActionDispatch<[action: DatabaseAction]>;
};

export const Context = createContext<ContextData>({} as ContextData);

const initialState: DatabaseState = {
  categories: [],
  accounts: [],
  months: [],
  transactions: [],
  transaction: null,
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
      }}
    >
      {children}
    </Context.Provider>
  );
}
