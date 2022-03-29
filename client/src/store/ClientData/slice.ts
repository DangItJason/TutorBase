import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ClientDataSlice} from "./types";
import {Appointment} from "../../services/api.types";
import { ClientIdPlaceholder } from "../../utils/Environment";

/* clientData slice is the storage medium for
   everything to do with client user data */
export const initialState: ClientDataSlice = {
    clientId: ClientIdPlaceholder,
    appointments: [],
    profile_img: "",
    phone: "",
    email: "",
    first_name: "",
    last_name: "",
    isTutor: false,
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
        deleteAppointment(state: ClientDataSlice, action: PayloadAction<string>){
            state.appointments = state.appointments.filter(appt => appt.appt_id !== action.payload);
        },
        updateAppointmentPaypalConfirmed(state: ClientDataSlice, action: PayloadAction<string>) {
            const appt = state.appointments.find(appt => appt.appt_id === action.payload);
            if (appt !== undefined)
                appt.paypal_approved = !(appt?.paypal_approved);
        },
        setFirstName(state: ClientDataSlice, action: PayloadAction<string>){
            state.first_name = action.payload;
        },
        setLastName(state: ClientDataSlice, action: PayloadAction<string>){
            state.last_name = action.payload;
        },
        setProfileImage(state: ClientDataSlice, action: PayloadAction<string>){
            state.profile_img = action.payload;
        },
        setIsTutor(state: ClientDataSlice, action: PayloadAction<boolean>){
            state.isTutor = action.payload;
        }
    },
});

export const {actions, reducer, name: sliceKey} = clientDataSlice;
