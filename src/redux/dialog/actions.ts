import { Behavior } from "../../behavior";

export const OPEN_DIALOG = "OPEN_DIALOG" as const;
export const openDialogAction = (behavior: Behavior) => {
  return {
    type: OPEN_DIALOG,
    payload: { behavior },
  };
};
export const CHANGE_PARAMETER = "CHANGE_PARAMETER" as const;
export const changeParamsAction = (idx: number, value: string) => {
  return {
    type: CHANGE_PARAMETER,
    payload: { idx, value },
  };
};
export const CLOSE_DIALOG = "CLOSE_DIALOG" as const;
export const closeDialogAction = () => {
  return {
    type: CLOSE_DIALOG,
  };
};
export const SET_PROPERTY = "SET_PROPERTY" as const;
export const setPropertyAction = () => {
  return {
    type: SET_PROPERTY,
  };
};
