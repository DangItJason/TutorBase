import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/* tutorData slice is the storage medium for
   a tutor's data as it is modified
   through the settings page. */
export const initialState = {
    first_name: "",
    last_name: "",
    temp_firstn: "",
    temp_lastn: "",
    email: "",
    obj_id: "",
    profile_pic: "",
    description: "",
    temp_description: "",
    price: 55,
    temp_price: 55,
    course_catalog: [],
    meeting_interval: 30,
    temp_meeting_interval: 30,
    courses: [],
    temp_courses: [],
    added_courses: [],
    schedule: [[], [], [], [], [], [], []],
    temp_schedule:  [[], [], [], [], [], [], []],
    added_times: [[], [], [], [], [], [], []],
    schedule_tab: 0,
    price_modal: false,
    name_modal: false,
    courses_modal: false,
    desc_modal: false,
    interval_modal: false,
    schedule_modal: false,
    add_course_err: false,
    add_time_err: false,
    add_course_err_msg: "",
    add_time_err_msg: ""
};

const tutorSlice = createSlice({
  name: "tutor",
  initialState,
  reducers: {
  },
});

export const { actions, reducer, name: sliceKey } = tutorSlice;
