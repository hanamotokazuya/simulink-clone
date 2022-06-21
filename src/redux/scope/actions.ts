import { Scope } from "../../behavior";

export const OPEN_SCOPE = "OPEN_SCOPE" as const;
export const openScopeAction = (scope: Scope) => {
  return {
    type: OPEN_SCOPE,
    payload: { scope },
  };
};
export const CLOSE_SCOPE = "CLOSE_SCOPE" as const;
export const closeScopeAction = () => {
  return {
    type: CLOSE_SCOPE,
  };
};
