import { useSelector } from "react-redux";
import { RootState } from "../stores";

const scopeSelector = (state: RootState) => state.scope;
export const useScopeSelector = () => useSelector(scopeSelector);
