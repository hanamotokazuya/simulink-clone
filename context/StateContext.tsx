import { useContext, useReducer, createContext } from "react";
import _ from "lodash";

type State = {};
type Action = {};
const StateContext = createContext({} as { state: State; action: React.Dispatch<Action> });
type Props = {
  children: React.ReactNode;
};
export const StateContextProvider: React.FC<Props> = ({ children }) => {
  const events = (state: State, action: Action): State => state;
  const initializeState: State = {};
  const [state, action] = useReducer(events, initializeState);
  return <StateContext.Provider value={{ state, action }}>{children}</StateContext.Provider>;
};

export const useStateContext = () => useContext(StateContext);
