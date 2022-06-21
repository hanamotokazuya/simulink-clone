import {
  openDialogAction,
  closeDialogAction,
  changeParamsAction,
  setPropertyAction,
} from "./actions";

export type DialogType = {
  state: DialogStateType;
  action: DialogActionType;
};

type DialogStateType = {
  blockId: string;
  openDialog: boolean;
  inputParams: string[];
  dialogContent: DialogContent;
};
export type DialogContent = [string, [string, string][]];

type DialogActionType = ReturnType<
  | typeof openDialogAction
  | typeof closeDialogAction
  | typeof changeParamsAction
  | typeof setPropertyAction
>;
