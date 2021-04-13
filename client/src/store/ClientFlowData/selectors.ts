
import { createSelector } from '@reduxjs/toolkit';
import {RootState} from "../configureStore";
import {initialState} from "./slice";

const selectDomain = (state: RootState) => state.ClientFlowSlice || initialState;

export const selectClientFlowData = createSelector(
    [selectDomain],
    selectDomain => selectDomain,
);

export const selectCurrentStep = createSelector(
    [selectDomain],
    selectDomain => selectDomain.currentStep,
);

export const selectFurthestStep = createSelector(
    [selectDomain],
    selectDomain => selectDomain.furthestStep,
);

export const selectAppointmentConfirmed = createSelector(
    [selectDomain],
    selectDomain => selectDomain.appointmentConfirmed,
);

export const selectSidebarToggled = createSelector(
    [selectDomain],
    selectDomain => selectDomain.sidebarToggled,
);
