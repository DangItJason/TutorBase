import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/* clientFlowData slice is the storage medium for
   scheduling an appointment. This will hold all
   information as the user creates an appointment. */
export const initialState = {
  sidebarToggled: false, // Should be moved to a more general location
  currentStep: 1,
  furthestStep: 1,
  courseName: "",
  courseId: "",
  tutorName: "",
  tutorId: "",
  subjectId: "",
  clientId: "0123456789",
  tutorIds: [], // Tutor Ids for selecting a subject
  apptDate: "",
  apptStartTime: "",
  apptEndTime: "",
  apptNotes: "",
  apptConfirm: false, // ToastUI Calendar scheduler confirm
  apptLoc: "",
  apptSubj: "",
};

const clientFlowSlice = createSlice({
  name: "clientFlow",
  initialState,
  reducers: {
    // Should be moved to a more general location
    toggleSidebar(state) {
      state.sidebarToggled = !state.sidebarToggled;
    },
    setNotes(state, action) {
      console.log("== SET NOTES ACTION:", action.payload, "==");
      state.apptNotes = action.payload;
    },
    setAppt(state, action) {
      console.log("== SET APPT ACTION:", action, "==");
      state.apptDate = action.payload[0];
      state.apptStartTime = action.payload[1];
      state.apptEndTime = action.payload[2];
      state.apptLoc = action.payload[3];
      state.apptSubj = action.payload[4];
      state.apptConfirm = true;
    },
    setSubject(state, action) {
      console.log("== SET SUBJECT ACTION:", action, "==");
      state.subjectId = action.payload;
    },
    setCourse(state, action) {
      console.log("== SET COURSE ACTION:", action, "==");
      state.courseName = action.payload[0];
      state.courseId = action.payload[1];
      state.tutorIds = action.payload[2];
    },
    setTutor(state, action) {
      console.log("== SET TUTOR ACTION:", action, "==");
      state.tutorName = action.payload[0];
      state.tutorId = action.payload[1];
    },
    setClient(state, action) {
      console.log("== SET CLIENT ACTION:", action, "==");
      state.clientId = action.payload;
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

export const { actions, reducer, name: sliceKey } = clientFlowSlice;
