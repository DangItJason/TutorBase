import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// The initial state of the UserData container
export const initialState = {
  email: "",
  password: "",
  login: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    setLogin(state, action) {
      state.login = action.payload;
    },
  },
});

export const { actions, reducer, name: sliceKey } = loginSlice;
