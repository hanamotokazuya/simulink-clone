import * as Actions from "./actions";
import type { StatusType } from "./types";

const initialState: StatusType["state"] = {
  status: "READY",
  errorMessages: [],
};

export const statusReducer = (state = initialState, action: StatusType["action"]) => {
  switch (action.type) {
    case Actions.CHANGE_STATUS:
      return {
        ...state,
        status: action.payload.status,
        errorMessages: action.payload.errorMessages,
      };
    default:
      return state;
  }
};
