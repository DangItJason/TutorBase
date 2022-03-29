import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TutorDataSlice} from "./types";
import {Course, Appointment} from "../../services/api.types";
import { TutorIdPlaceholder } from "../../utils/Environment";

export const initialState: TutorDataSlice = {
    tutorId: TutorIdPlaceholder,
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
        updateAppointmentPaypalConfirmed(state: TutorDataSlice, action: PayloadAction<string>) {
            const appt = state.appointments.find(appt => appt.appt_id === action.payload);
            if (appt !== undefined)
                appt.paypal_approved = !(appt?.paypal_approved);
        },
        addAppointment(state: TutorDataSlice, action: PayloadAction<Appointment>){
            state.appointments.push(action.payload);
        },
    },
});

export const {actions, reducer, name: sliceKey} = tutorDataSlice;
