import { Status } from "./types";

export const CHANGE_STATUS = "CHANGE_STATUS" as const;
export const changeStatusAction = (status: Status, errorMessages: string[] = []) => {
  return {
    type: CHANGE_STATUS,
    payload: { status, errorMessages },
  };
};
