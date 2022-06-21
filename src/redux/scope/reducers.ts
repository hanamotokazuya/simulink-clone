import * as Actions from "./actions";
import type { ScopeType } from "./types";

const initialState: ScopeType["state"] = {
  selectedScope: undefined,
};

export const scopeReducer = (state = initialState, action: ScopeType["action"]) => {
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
