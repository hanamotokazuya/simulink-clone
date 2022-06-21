import { changeHelpPageAction } from "./actions";

export type HelpType = {
  state: HelpStateType;
  action: HelpActionType;
};
type HelpStateType = {
  currentHelpPage: string;
};
type HelpActionType = ReturnType<typeof changeHelpPageAction>;
