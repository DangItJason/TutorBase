
import { createSelector } from '@reduxjs/toolkit';
import {RootState} from "../configureStore";
import {initialState} from "./slice";

const selectDomain = (state: RootState) => state.tutorData || initialState;

export const selectTutorData = createSelector(
    [selectDomain],
    selectDomain => selectDomain,
);
