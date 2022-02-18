import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TutorDataSlice} from "./types";
import {Course, Appointment} from "../../services/api.types";

export const initialState: TutorDataSlice = {
    tutorId: "6070beb7dad06e015b73a107",
    courses: [],
    appointments: []
};

const tutorDataSlice = createSlice({
    name: "tutorData",
    initialState,
    reducers: {
        setCourses(state: TutorDataSlice, action: PayloadAction<Array<Course>>){
            state.courses = action.payload;
        },
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
