import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ClientFlowSlice, Course} from "./types";
import {Appointment, Subject, Tutor} from "../../services/api.types";

/* clientFlowData slice is the storage medium for
   everything to do with creating a tutor appointment,
    and anything needed inside the "clientFlow" components */
export const initialState: ClientFlowSlice = {
    sidebarToggled: false,
    clientId: (process.env.NODE_ENV==="development" ? (process.env.CLIENTID_PLACEHOLDER ?? "") : "" ),

    currentStep: 0,
    furthestStep: 0,

    selectedCourse: {
        name: "",
        id: "",
    },
    selectedTutor: {
        email: "",
        _id: "",
        first_name: "",
        interval: "",
        phone: "",
        price: "",
        last_name: "",
        profile_img: "",
        times: {Friday: [], Monday: [], Saturday: [], Sunday: [], Tuesday: [], Thursday: [], Wednesday: []}
    },
    selectedSubject: {id: "", _id: "", courses: []},

    availableTutors: [],
    availableTutorIds: [],
    availableSubjects: [],

    appointmentDate: "",
    appointmentStartTime: "",
    appointmentEndTime: "",
    appointmentNotes: "",
    appointmentConfirmed: false,
    appointmentLocation: "",
    appointmentSubjectId: "",

    isLoading: false,
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
        setSelectedTutor(state: ClientFlowSlice, action: PayloadAction<string>) {
            let tutor = state.availableTutors.filter((value, index) => {
                if (value._id === action.payload) return value
            });

            state.selectedTutor = tutor[0];
        },

        setAvailableTutors(state: ClientFlowSlice, action: PayloadAction<Array<Tutor>>) {
            state.availableTutors = action.payload;
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
        setAppointment(state: ClientFlowSlice, action){
            state.appointmentDate = action.payload[0];
            state.appointmentStartTime = action.payload[1];
            state.appointmentEndTime = action.payload[2];
            state.appointmentLocation = action.payload[3];
            state.appointmentLocation = action.payload[4];
            state.appointmentSubjectId = action.payload[5];
        },
        decrementStep(state) {
            console.log("== Decrementing Step ==");
            state.currentStep = state.currentStep < 1 ? 1 : state.currentStep - 1;
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
        setLoading(state: ClientFlowSlice, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        resetSteps(state) {
            state.currentStep = 0;
            state.furthestStep = 0;

            state.appointmentDate = "";
            state.appointmentStartTime = "";
            state.appointmentEndTime = "";
            state.appointmentLocation = "";
            state.appointmentLocation = "";
            state.appointmentSubjectId = "";

            state.appointmentNotes = "";

            state.selectedCourse = {name: "", id: "",};
            state.selectedSubject = {id: "", _id: "", courses: []};
            state.selectedTutor = {
                email: "",
                _id: "",
                first_name: "",
                interval: "",
                phone: "",
                price: "",
                last_name: "",
                profile_img: "",
                times: {Friday: [], Monday: [], Saturday: [], Sunday: [], Tuesday: [], Thursday: [], Wednesday: []}
            };
        },
    },
});

export const {actions, reducer, name: sliceKey} = clientFlowSlice;
