import { useSelector } from "react-redux";
import { RootState } from "../stores";

const helpSelector = (state: RootState) => state.help;
export const useHelpSelector = () => useSelector(helpSelector);
