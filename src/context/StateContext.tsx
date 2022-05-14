import { useContext, useReducer, createContext } from "react";
import _ from "lodash";
import { Behavior } from "../behavior";
import { Node } from "../block";
import { State, Action, DialogContent } from "../types/context";

const StateContext = createContext({} as { state: State; action: React.Dispatch<Action> });
type Props = {
  children: React.ReactNode;
};
export const StateContextProvider: React.FC<Props> = ({ children }) => {
  const events = (state: State, action: Action): State => {
    switch (action.type) {
      case "TEST":
        console.log("TEST");
        return state;
      case "INIT":
        return { ...state, diagram: action.diagram, palette: action.palette };
      case "OPEN_DIALOG":
        const dialogContent: DialogContent = [
          action.behavior.name,
          Object.entries(action.behavior.property),
        ];
        const inputParams = dialogContent[1].map((e) => e[1]);
        if (inputParams.length === 0) return state;
        return {
          ...state,
          dialogContent,
          openDialog: true,
          inputParams,
          blockId: String(action.behavior.id),
        };
      case "CHANGE_PARAMETER":
        const changeParams = [...state.inputParams];
        changeParams[action.idx] = action.value;
        return { ...state, inputParams: changeParams };
      case "CLOSE_DIALOG":
        return { ...state, inputParams: [], openDialog: false, blockId: "" };
      case "SET_PROPERTY":
        const newProperty: { [key in string]: string } = {};
        let behavior = Behavior.behaviors[state.blockId];
        if (state.blockId) {
          state.dialogContent[1].forEach(
            ([key, _], i) => (newProperty[key] = state.inputParams[i])
          );
          if (behavior) {
            behavior.property = newProperty;
            Node.setText(behavior.id);
          }
        }
        return { ...state, inputParams: [], openDialog: false, blockId: "" };
      case "OPEN_SCOPE":
        console.log("HOGEHOGE");
        return { ...state, selectedScope: action.scope };
      case "CLOSE_SCOPE":
        return { ...state, selectedScope: undefined };
      default:
        return state;
    }
  };
  const initializeState: State = {
    diagram: {} as fabric.Canvas,
    palette: {} as fabric.Canvas,
    dialogContent: ["", []],
    openDialog: false,
    inputParams: [],
    blockId: "",
    selectedScope: undefined,
  };
  const [state, action] = useReducer(events, initializeState);
  return <StateContext.Provider value={{ state, action }}>{children}</StateContext.Provider>;
};

export const useStateContext = () => useContext(StateContext);
