import * as Actions from "./actions";
import type { ScopeType } from "./types";
import { Reducer } from "redux";

const initialState: ScopeType["state"] = {
  selectedScope: undefined,
};

export const scopeReducer: Reducer<ScopeType["state"], ScopeType["action"]> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case Actions.OPEN_SCOPE:
      return {
        ...state,
        selectedScope: action.payload.scope,
      };
    case Actions.CLOSE_SCOPE:
      return {
        ...state,
        selectedScope: undefined,
      };
    default:
      return state;
  }
};
