import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// The initial state of the UserData container
export const initialState = {
  appointments: [],
};

const clientDataSlice = createSlice({
  name: "clientData",
  initialState,
  reducers: {
    setAppointments(state, action) {
      state.appointments = action.payload;
    },
  },
});

export const { actions, reducer, name: sliceKey } = clientDataSlice;
