import {configureStore, combineReducers} from "@reduxjs/toolkit";
import {reducer as clientFlow} from './clientFlowData';

export default configureStore({
    reducer: combineReducers({clientFlow })
})
