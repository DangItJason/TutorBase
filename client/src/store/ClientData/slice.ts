import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ClientDataSlice} from "./types";
import {Appointment, Subject, Tutor} from "../../services/api.types";

/* clientFlowData slice is the storage medium for
   everything to do with creating a tutor appointment,
    and anything needed inside the "clientFlow" components */
export const initialState: ClientDataSlice = {
    clientId: "606b344247aec641c8b74b42",
    appointments: [],
};

const clientDataSlice = createSlice({
    name: "clientData",
    initialState,
    reducers: {
        setAppointment(state: ClientDataSlice, action: PayloadAction<Array<Appointment>>){
            state.appointments = action.payload;
        },
        clearAppointments(state: ClientDataSlice){
            state.appointments = [];
        },
        addAppointment(state: ClientDataSlice, action: PayloadAction<Appointment>){
            state.appointments.push(action.payload);
        },
    },
});

export const {actions, reducer, name: sliceKey} = clientDataSlice;