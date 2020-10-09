import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// The initial state of the UserData container
export const initialState = {
    username: ''
};

const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        setUsername(state, action: PayloadAction<string>) {
            state.username = action.payload;
        },
    },
});

export const { actions, reducer, name: sliceKey } = userDataSlice;
