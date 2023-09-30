import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  email: null,
  userName: null,
  userID: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_ACTIVE_USER(state, action) {
      const { email, userID, userName } = action.payload;
      state.isLoggedIn = true;
      state.email = email;
      state.userName = userName;
      state.userID = userID;
    },
    REMOVE_ACTIVE_USER(state, action) {
      state.isLoggedIn = false;
      state.email = null;
      state.userName = null;
      state.userID = null;
    },
  },
});
export let getInitialState = AuthSlice.getInitialState();
export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } = AuthSlice.actions;

export default AuthSlice.reducer;
