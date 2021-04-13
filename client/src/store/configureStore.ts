import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { reducer as clientFlow } from "./ClientFlowData/slice";
import { reducer as signUp } from "./signUpData";
import { reducer as loginState } from "./loginData";
import {ClientFlowSlice} from "./ClientFlowData/types";

export default configureStore({
  reducer: combineReducers({ clientFlow, signUp, loginState }),
});

export interface RootState {
  clientFlow: ClientFlowSlice;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
