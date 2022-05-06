import { useContext, useReducer, useState, createContext } from "react";

type State = {
  selectComponent: string;
};

type Action = SELECT_COMPONENT;

type SELECT_COMPONENT = {
  type: "SELECT_COMPONENT";
  component: string;
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
      default:
        return state;
    }
  };
  const initializeState: State = {
    selectComponent: "",
  };
  const [state, action] = useReducer(events, initializeState);
  return <StateContext.Provider value={{ state, action }}>{children}</StateContext.Provider>;
};

export const useStateContext = () => useContext(StateContext);
