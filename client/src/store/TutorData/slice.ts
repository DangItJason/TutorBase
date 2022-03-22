import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TutorDataSlice} from "./types";
import {Course, Appointment} from "../../services/api.types";
import { TutorIdPlaceholder } from "../../utils/Environment";

export const initialState: TutorDataSlice = {
    tutorId: (process.env.NODE_ENV==="development" ? (TutorIdPlaceholder ?? "") : "" ),
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
