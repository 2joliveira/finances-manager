import { Actions, DatabaseState } from "./types";

export function databaseReducer(
  state: DatabaseState,
  action: Actions,
): DatabaseState {
  switch (action.type) {
    case "SET_SELECTED_YEAR":
      return { ...state, selectedYear: action.payload };

    case "SET_SELECTED_PERIOD":
      return { ...state, selectedPeriod: action.payload };

    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };

    case "SET_ACCOUNTS":
      return { ...state, accounts: action.payload };

    default:
      return state;
  }
}
