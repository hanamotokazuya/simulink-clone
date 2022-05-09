import { useContext, useReducer, createContext } from "react";
import _ from "lodash";
import { ComponentBase, setComponent } from "../lib/component";

type State = {
  selectComponent: string;
  components: ComponentBase[];
};

type Action = SELECT_COMPONENT | SET_COMPONENT | CHANGE_PROPERTIES;

type SELECT_COMPONENT = {
  type: "SELECT_COMPONENT";
  component: string;
};
type SET_COMPONENT = {
  type: "SET_COMPONENT";
  posX: number;
  posY: number;
};
type CHANGE_PROPERTIES = {
  type: "CHANGE_PROPERTIES";
  id: number;
  property: string[];
  values: string[];
  inport: string;
};

const StateContext = createContext({} as { state: State; action: React.Dispatch<Action> });

type Props = {
  children: React.ReactNode;
};
export const StateContextProvider: React.FC<Props> = ({ children }) => {
  const events = (state: State, action: Action): State => {
    switch (action.type) {
      case "SELECT_COMPONENT":
        return { ...state, selectComponent: action.component };
      case "SET_COMPONENT":
        if (state.selectComponent) {
          setComponent(state.selectComponent, action.posX, action.posY);
          return { ...state, selectComponent: "" };
        }
        return { ...state };
      default:
        return state;
    }
  };
  const initializeState: State = {
    selectComponent: "",
    components: ComponentBase.components,
  };
  const [state, action] = useReducer(events, initializeState);
  return <StateContext.Provider value={{ state, action }}>{children}</StateContext.Provider>;
};

export const useStateContext = () => useContext(StateContext);
