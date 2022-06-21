import * as Actions from "./actions";
import type { StatusType } from "./types";
import { Reducer } from "redux";

const initialState: StatusType["state"] = {
  status: "READY",
  errorMessages: [],
};

export const statusReducer: Reducer<StatusType["state"], StatusType["action"]> = (
  state = initialState,
  action
) => {
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
