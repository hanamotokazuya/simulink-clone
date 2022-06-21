import { Behavior } from "../../behavior";
import { Node } from "../../block";
import * as Actions from "./actions";
import { DialogType, DialogContent } from "./types";

const initialState: DialogType["state"] = {
  blockId: "",
  openDialog: false,
  inputParams: [],
  dialogContent: ["", []],
};

export const dialogReducer = (state = initialState, action: DialogType["action"]) => {
  switch (action.type) {
    case Actions.OPEN_DIALOG:
      const dialogContent: DialogContent = [
        action.payload.behavior.name,
        Object.entries(action.payload.behavior.property),
      ];
      const inputParams = dialogContent[1].map((e) => e[1]);
      if (inputParams.length === 0) return state;
      return {
        ...state,
        dialogContent,
        openDialog: true,
        inputParams,
        blockId: String(action.payload.behavior.id),
      };
    case Actions.CHANGE_PARAMETER:
      const changeParams = [...state.inputParams];
      changeParams[action.payload.idx] = action.payload.value;
      return { ...state, inputParams: changeParams };
    case Actions.CLOSE_DIALOG:
      return { ...state, inputParams: [], openDialog: false, blockId: "" };
    case Actions.SET_PROPERTY:
      const newProperty: { [key in string]: string } = {};
      let behavior = Behavior.behaviors[state.blockId];
      if (state.blockId) {
        state.dialogContent[1].forEach(([key, _], i) => (newProperty[key] = state.inputParams[i]));
        if (behavior) {
          behavior.property = newProperty;
          Node.setText(behavior.id);
        }
      }
      return { ...state, inputParams: [], openDialog: false, blockId: "" };
    default:
      return state;
  }
};
