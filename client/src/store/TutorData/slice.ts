import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TutorDataSlice} from "./types";
import {Appointment} from "../../services/api.types";

export const initialState: TutorDataSlice = {
    tutorId: "606b344247aec641c8b74b42",
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