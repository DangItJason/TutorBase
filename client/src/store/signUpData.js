import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// The initial state of the UserData container
export const initialState = {
  email: "",
  password: "",
  login: null,
  first_name: "",
  last_name: "",
  phone: "",
  visible: false,
  passwordValid: false,
  emailValid: false,
  firstNameValid: false,
  phoneValid: true,
  lastNameValid: false,
  loginValid: true,
};

const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    setLastName(state, action) {
      state.last_name = action.payload;
    },
    setFirstName(state, action) {
      state.first_name = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    setPhone(state, action) {
      state.phone = action.payload;
    },
    setLoginValid(state, action) {
      state.loginValid = action.payload;
    },
    setLastNameValid(state) {
      state.lastNameValid = state.last_name.length > 0;
    },
    setFirstNameValid(state) {
      state.firstNameValid = state.first_name.length > 0;
    },
    setPhoneValid(state) {
      state.phoneValid = state.phone.length === 0 || (state.phone.length === 10 && state.phone.match(/^[0-9]+$/) != null);
    },
    setEmailValid(state) {
      state.emailValid = !!(
        state.email.includes("@") &&
        state.email.includes(".") &&
        state.email.includes("rpi.edu")
      );
    },
    setPasswordValid(state) {
      state.passwordValid = state.password.length >= 8;
    },
  },
});

export const { actions, reducer, name: sliceKey } = signUpSlice;
