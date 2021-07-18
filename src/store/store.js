import reducers from "./store-helper/appReducers";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
const store = configureStore({
  reducer: reducers,
  middleware: [thunk],
  devTools: true,
});

export default store;
