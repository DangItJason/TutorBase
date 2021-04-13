import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ClientFlowSlice, Course, Tutor} from "./types";
import {Subject} from "../../services/api.types";

/* clientFlowData slice is the storage medium for
   everything to do with creating a tutor appointment,
    and anything needed inside the "clientFlow" components */
export const initialState: ClientFlowSlice = {
    sidebarToggled: false,
    clientId: "12345",

    currentStep: 0,
    furthestStep: 0,

    selectedCourse: {
        name: "",
        id: "",
    },
    selectedTutor: {
        name: "",
        id: ""
    },
    selectedSubject: {id: "", _id: "", courses: []},

    availableTutorIds: [],
    availableSubjects: [],

    appointmentDate: "",
    appointmentStartTime: "",
    appointmentEndTime: "",
    appointmentNotes: "",
    appointmentConfirmed: false,
    appointmentLocation: "",
    appointmentSubjectId: "",
};

const clientFlowSlice = createSlice({
    name: "clientFlow",
    initialState,
    reducers: {
        // TODO: Move toggle sidebar to some other general slice
        toggleSidebar(state: ClientFlowSlice) {
            console.log("Updated sidebar state")
            state.sidebarToggled = !state.sidebarToggled;
        },
        // TODO Move set client ID to some authentication slice
        setClientId(state: ClientFlowSlice, action: PayloadAction<string>) {
            state.clientId = action.payload;
        },

        setSelectedCourse(state: ClientFlowSlice, action: PayloadAction<Course>) {
            state.selectedCourse = action.payload;
        },
        setSelectedSubject(state: ClientFlowSlice, action: PayloadAction<Subject>) {
            state.selectedSubject = action.payload;
        },
        setSelectedTutor(state: ClientFlowSlice, action: PayloadAction<Tutor>) {
            state.selectedTutor = action.payload;
        },

        setAvailableTutorIds(state: ClientFlowSlice, action: PayloadAction<Array<string>>) {
            state.availableTutorIds = action.payload;
        },
        setAvailableSubjects(state: ClientFlowSlice, action: PayloadAction<Array<Subject>>) {
            state.availableSubjects = action.payload;
        },

        setAppointmentDate(state: ClientFlowSlice, action: PayloadAction<string>) {
            state.appointmentDate = action.payload;
        },
        setAppointmentStartTime(state: ClientFlowSlice, action: PayloadAction<string>) {
            state.appointmentStartTime = action.payload;
        },
        setAppointmentEndTime(state: ClientFlowSlice, action: PayloadAction<string>) {
            state.appointmentEndTime = action.payload;
        },
        setAppointmentNotes(state: ClientFlowSlice, action: PayloadAction<string>) {
            state.appointmentNotes = action.payload;
        },
        setAppointmentConfirmed(state: ClientFlowSlice, action: PayloadAction<boolean>) {
            state.appointmentConfirmed = action.payload;
        },
        setAppointmentLocation(state: ClientFlowSlice, action: PayloadAction<string>) {
            state.appointmentLocation = action.payload;
        },
        setAppointmentSubjectId(state: ClientFlowSlice, action: PayloadAction<string>) {
            state.appointmentSubjectId = action.payload;
        },

        decrementStep(state) {
            console.log("== Decrementing Step ==");
            state.currentStep = state.currentStep <= 1 ? 1 : state.currentStep - 1;
        },
        incrementStep(state) {
            console.log("== Incrementing Step ==");
            state.currentStep = state.currentStep >= 4 ? 5 : state.currentStep + 1;
            if (state.currentStep > state.furthestStep)
                state.furthestStep = state.currentStep;
        },
        incrementFurthestStep(state) {
            console.log("== Incrementing Furthest Step ==");
            state.furthestStep = state.furthestStep + 1;
        },
    },
});

export const {actions, reducer, name: sliceKey} = clientFlowSlice;
