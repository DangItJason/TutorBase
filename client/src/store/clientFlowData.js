import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// The initial state of the UserData container
export const initialState = {
  sidebarToggled: false,
  calendarConfirmed: false,
  clientName: "",
  currentStep: 1,
  furthestStep: 1,
  subject: "",
  course: "",
  tutor: "",
  date: "",
  startTime: "",
  endTime: "",
  notes: "",
  tutor_ids: [],
};

const clientFlowSlice = createSlice({
  name: "clientFlow",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarToggled = !state.sidebarToggled;
    },
    setSessionTime(state, action) {
      console.log("SET SESSION ACTION:", action);
      state.date = action.payload[0];
      state.startTime = action.payload[1];
      state.endTime = action.payload[2];
      state.calendarConfirmed = true;
    },
    setSubject(state, action) {
      console.log("SET SUBJECT ACTION:", action);
      state.subject = action.payload;
    },
    setCourse(state, action) {
      console.log("SET COURSE ACTION:", action);
      state.course = action.payload[0];
      state.tutor_ids = action.payload[1];
    },
    setTutor(state, action) {
      state.tutor = action.target;
    },
    decrementStep(state) {
      state.currentStep = state.currentStep <= 1 ? 1 : state.currentStep - 1;
    },
    incrementStep(state) {
      state.currentStep = state.currentStep >= 4 ? 5 : state.currentStep + 1;
      if (state.currentStep > state.furthestStep)
        state.furthestStep = state.currentStep;
    },
    incrementFurthestStep(state) {
      state.furthestStep = state.furthestStep + 1;
    },
  },
});

export const { actions, reducer, name: sliceKey } = clientFlowSlice;
