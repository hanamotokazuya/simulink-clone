import { Scope } from "../../behavior";
import { closeScopeAction, openScopeAction } from "./actions";

export type ScopeType = {
  state: ScopeStateType;
  action: ScopeActionType;
};

type ScopeStateType = {
  selectedScope: Scope | undefined;
};

type ScopeActionType = ReturnType<typeof openScopeAction | typeof closeScopeAction>;
