import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/* tutorData slice is the storage medium for
   a tutor's data as it is modified
   through the settings page. */
export const initialState = {
    first_name: "",
    last_name: "",
    email: "test2@gmail.com",
    obj_id: "5f89d834aa18dfd7e932967d",
    profile_pic: "",
    description: "",
    price: 55,
    course_catalog: [],
    meeting_interval: 30,
    courses: [],
    schedule: [[], [], [], [], [], [], []],
    schedule_tab: 0,
    price_modal: false,
    name_modal: false,
    courses_modal: false,
    desc_modal: false,
    interval_modal: false,
    schedule_modal: false
};

const tutorSlice = createSlice({
  name: "tutor",
  initialState,
  reducers: {  
    setCourseCatalog(state, action) {
      state.course_catalog = action.payload;
    },
    setProfilePic(state, action) {
      state.profile_pic = action.payload;
    },
    setPrice(state, action) {
      state.price = action.payload;
    },
    setName(state, action) {
      state.first_name = action.payload[0];
      state.last_name = action.payload[1];
    },
    setCourses(state, action) {
      state.courses = action.payload;
    },
    setSchedule(state, action) {
      state.schedule = action.payload;
    },
    setDesc(state, action) {
      state.description = action.payload;
    },
    setInterval(state, action) {
      state.meeting_interval = action.payload[0];
    },
    togglePrice(state) {
      state.price_modal = !state.price_modal;
    },
    toggleName(state) {
      state.name_modal = !state.name_modal;
    },
    toggleCourses(state) {
      state.courses_modal = !state.courses_modal;
    },
    toggleDesc(state) {
      state.desc_modal = !state.desc_modal;
    },
    toggleInterval(state) {
      state.interval_modal = !state.interval_modal;
    },
    toggleSchedule(state) {
      state.schedule_modal = !state.schedule_modal;
    },
    toggleScheduleTab(state, action) {
      state.schedule_tab = action.payload;
    }
  }
});

export const { actions, reducer, name: sliceKey } = tutorSlice;
