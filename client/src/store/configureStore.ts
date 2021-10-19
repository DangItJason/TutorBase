import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { reducer as clientFlow } from "./ClientFlowData/slice";
import { reducer as signUp } from "./signUpData";
import { reducer as loginState } from "./loginData";
import {ClientFlowSlice} from "./ClientFlowData/types";
import { reducer as clientData } from "./clientData";
import { ClientDataSlice } from "./ClientData/types";
import { reducer as tutorData } from "./clientData";
import { TutorDataSlice } from "./TutorData/types";

export default configureStore({
  reducer: combineReducers({ clientFlow, signUp, loginState, clientData, tutorData }),
});

export interface RootState {
  clientFlow: ClientFlowSlice;
  clientData: ClientDataSlice;
  tutorData: TutorDataSlice;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
