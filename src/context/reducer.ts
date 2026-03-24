import { Actions, DatabaseState } from "./types";

export function databaseReducer(
  state: DatabaseState,
  action: Actions,
): DatabaseState {
  switch (action.type) {
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };

    case "SET_ACCOUNTS":
      return { ...state, accounts: action.payload };

    case "SET_MONTHS":
      return { ...state, months: action.payload };

    case "SET_TRANSACTION":
      return { ...state, transaction: action.payload };

    case "SET_TRANSACTIONS":
      return { ...state, transactions: action.payload.data, selectedPeriod: action.payload.period };

    default:
      return state;
  }
}
