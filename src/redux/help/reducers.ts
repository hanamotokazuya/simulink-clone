import * as Actions from "./actions";
import { HelpType } from "./types";

const initialState: HelpType["state"] = {
  currentHelpPage: "使い方",
};

export const helpReducer = (state = initialState, action: HelpType["action"]) => {
  switch (action.type) {
    case Actions.CHANGE_HELP_PAGE:
      return { ...state, currentHelpPage: action.payload.page };
    default:
      return state;
  }
};
