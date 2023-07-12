import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

// slices
import userDataReducer from "./userDataSlice";
import userAuthReducer from "./userAuthSlice";

const reducer = combineReducers({
  userData: userDataReducer,
  userAuth: userAuthReducer,
});

// store
export const store = configureStore({
  reducer: reducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});
