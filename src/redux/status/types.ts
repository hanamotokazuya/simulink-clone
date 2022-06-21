import { changeStatusAction } from "./actions";

export type StatusType = {
  state: StatusStateType;
  action: StatusActionType;
};

type StatusStateType = {
  status: Status;
  errorMessages: string[];
};

type StatusActionType = ReturnType<typeof changeStatusAction>;

export type Status =
  | "READY"
  | "START"
  | "INITIALIZING"
  | "CHECKING"
  | "RUNNING"
  | "FINISHED"
  | "ERROR";
