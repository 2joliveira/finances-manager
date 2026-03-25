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

    default:
      return state;
  }
}
