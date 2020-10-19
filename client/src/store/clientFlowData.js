import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// The initial state of the UserData container
export const initialState = {
    sidebarToggled: false,
    currentStep: 0
};

const clientFlowSlice = createSlice({
    name: 'clientFlow',
    initialState,
    reducers: {
        toggleSidebar(state){
            state.sidebarToggled = !state.sidebarToggled;
        },
        incrementStep(state) {
            state.username = state.username + 1;
        },
    },
});

export const { actions, reducer, name: sliceKey } = clientFlowSlice;
