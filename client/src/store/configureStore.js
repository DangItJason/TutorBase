import {configureStore} from "@reduxjs/toolkit";
import {reducer as userDataReducer} from './userData';

export default configureStore({
    reducer: userDataReducer
})
