import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TutorDataSlice} from "./types";
import {Appointment} from "../../services/api.types";

export const initialState: TutorDataSlice = {
    tutorId: "6070beb7dad06e015b73a107",
    appointments: [],
};

const tutorDataSlice = createSlice({
    name: "tutorData",
    initialState,
    reducers: {
        setAppointment(state: TutorDataSlice, action: PayloadAction<Array<Appointment>>){
            state.appointments = action.payload;
        },
        clearAppointments(state: TutorDataSlice){
            state.appointments = [];
        },
        addAppointment(state: TutorDataSlice, action: PayloadAction<Appointment>){
            state.appointments.push(action.payload);
        },
    },
});

export const {actions, reducer, name: sliceKey} = tutorDataSlice;
