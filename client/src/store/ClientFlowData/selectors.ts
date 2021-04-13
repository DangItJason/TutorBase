
import { createSelector } from '@reduxjs/toolkit';
import {RootState} from "../configureStore";
import {initialState} from "./slice";

const selectDomain = (state: RootState) => state.ClientFlowSlice || initialState;

export const selectClientFlowData = createSelector(
    [selectDomain],
    selectDomain => selectDomain,
);
