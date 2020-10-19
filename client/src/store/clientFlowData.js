import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// The initial state of the UserData container
export const initialState = {
    sidebarToggled: false,
    clientName: "",
    currentStep: 1,
    furthestStep: 1,
    subject: "",
    course: "",
    tutor: "",
    date: "",
    startTime: "",
    endTime: "",
    notes: "",
    tutor_ids: []
};

const clientFlowSlice = createSlice({
    name: 'clientFlow',
    initialState,
    reducers: {
        toggleSidebar(state){
            state.sidebarToggled = !state.sidebarToggled;
        },
        incrementStep(state) {
            state.currentStep = state.currentStep + 1;
        },
        handleChangeTime(state, action) {
            state.furthestStep = state.furthestStep + 1
        },
        updateTutor(state, action) {
            const { name, value } = action.target;
            state.tutor = value;
        }
    },
});

export const { actions, reducer, name: sliceKey } = clientFlowSlice;
