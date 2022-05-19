import { Behavior, Scope } from "../behavior";
import { Node } from "../block";
import { fabric } from "fabric";

type Status = "READY" | "START" | "INITIALIZING" | "CHECKING" | "RUNNING" | "FINISHED";
export type State = {
  diagram: fabric.Canvas;
  palette: fabric.Canvas;
  dialogContent: DialogContent;
  openDialog: boolean;
  inputParams: string[];
  blockId: string;
  selectedScope: Scope | undefined;
  status: Status;
};
export type DialogContent = [string, [string, string][]];
export type Action =
  | TEST
  | INIT
  | OPEN_DIALOG
  | CLOSE_DIALOG
  | SET_PROPERTY
  | CHANGE_PARAMETER
  | OPEN_SCOPE
  | CLOSE_SCOPE
  | CHANGE_STATUS;

type TEST = {
  type: "TEST";
};
type INIT = {
  type: "INIT";
  diagram: fabric.Canvas;
  palette: fabric.Canvas;
};

type OPEN_DIALOG = {
  type: "OPEN_DIALOG";
  behavior: Behavior;
};

type CLOSE_DIALOG = {
  type: "CLOSE_DIALOG";
};
type SET_PROPERTY = {
  type: "SET_PROPERTY";
};
type CHANGE_PARAMETER = {
  type: "CHANGE_PARAMETER";
  idx: number;
  value: string;
};
type OPEN_SCOPE = {
  type: "OPEN_SCOPE";
  scope: Scope;
};
type CLOSE_SCOPE = {
  type: "CLOSE_SCOPE";
};
type CHANGE_STATUS = {
  type: "CHANGE_STATUS";
  status: Status;
};
