import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { dialogReducer } from "../dialog";
import { scopeReducer } from "../scope";
import { statusReducer } from "../status";
import { helpReducer } from "../help";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./types";

const rootReducer = combineReducers({
  dialog: dialogReducer,
  scope: scopeReducer,
  status: statusReducer,
  help: helpReducer,
});
export const store = configureStore({
  reducer: rootReducer,
});

export const useAppDispatch = () => useDispatch<AppDispatch>();
