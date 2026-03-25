import { createContext, useReducer } from "react";
import { databaseReducer } from "./reducer";
import { Actions, DatabaseState } from "./types";

type ContextData = DatabaseState & {
  dispatch: React.ActionDispatch<[action: Actions]>;
};

export const Context = createContext<ContextData>({} as ContextData);

const initialState: DatabaseState = {
  selectedPeriod: null,
  selectedYear: new Date().getFullYear(),
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
        selectedPeriod: state.selectedPeriod,
        selectedYear: state.selectedYear,
      }}
    >
      {children}
    </Context.Provider>
  );
}
