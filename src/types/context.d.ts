import { Behavior } from "../behavior";
import { fabric } from "fabric";

export type State = {
  diagram: fabric.Canvas;
  palette: fabric.Canvas;
  dialogContent: DialogContent;
  openDialog: boolean;
  inputParams: string[];
  blockId: string;
};
export type DialogContent = [string, [string, number][]];
export type Action = TEST | INIT | OPEN_DIALOG | CLOSE_DIALOG | SET_PROPERTY | CHANGE_PARAMETER;

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
