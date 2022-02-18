import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// The initial state of the UserData container
export const initialState = {
  clientId: "60787de340426861a4c5a7b7",
  appointments: [
    {
      name: 'Jacob Zamani',
      time: '4:45pm on May 6 2021',
      location: 'Folsom Library',
      color: 'Upcoming',
      notes: 'N/A'
    }
  ]
};

const clientDataSlice = createSlice({
  name: "clientData",
  initialState,
  reducers: {
    setAppointments(state, action) {
      state.appointments = action.payload;
    },
    clearAppointments(state) {
      state.appointments = [];
    },
    addAppointments(state, action) {
      state.appointments.push(action.payload);
    }
  }
});

export const { actions, reducer, name: sliceKey } = clientDataSlice;
