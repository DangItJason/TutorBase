import {configureStore, combineReducers} from "@reduxjs/toolkit";
import {reducer as userDataReducer} from './userData';
import {reducer as schedulerReducer} from './scheduler';

export default configureStore({
    reducer: combineReducers({userDataReducer, schedulerReducer})
})
