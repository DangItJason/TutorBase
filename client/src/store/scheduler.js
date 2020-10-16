import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// The initial state of the UserData container
export const initialState = {
    currentStep: '',
    selectedSubject: '',
    selectedCourse: '',
    selectedTutor: '',
};

const schedulerSlice = createSlice({
    name: 'scheduler',
    initialState,
    reducers: {
        setUsername(state, action: PayloadAction<string>) {
            state.username = action.payload;
        },
    },
});

export const { actions, reducer, name: sliceKey } = schedulerSlice;
