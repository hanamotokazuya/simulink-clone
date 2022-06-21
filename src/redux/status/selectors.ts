import { RootState } from "../stores";
import { useSelector } from "react-redux";

const statusSelector = (state: RootState) => state.status;
export const useStatusSelector = () => useSelector(statusSelector);
