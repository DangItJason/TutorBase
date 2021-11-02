
import { createSelector } from '@reduxjs/toolkit';
import {RootState} from "../configureStore";
import {initialState} from "./slice";

const selectDomain = (state: RootState) => state.clientData || initialState;

export const selectClientData = createSelector(
    [selectDomain],
    selectDomain => selectDomain,
);
