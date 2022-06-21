import { useSelector } from "react-redux";
import { RootState } from "../stores";

const dialogSelector = (state: RootState) => state.dialog;
export const useDialogSelector = () => useSelector(dialogSelector);
