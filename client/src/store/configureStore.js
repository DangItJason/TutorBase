import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { reducer as clientFlow } from "./clientFlowData";
import { reducer as signUp } from "./signUpData";
import { reducer as loginState } from "./loginData";

export default configureStore({
  reducer: combineReducers({ clientFlow, signUp, loginState }),
});
