import { createSlice } from "@reduxjs/toolkit";
import { USER_TOKEN } from "../../constants";
import { getCookie, removeCookie, setCookie } from "../../utils";
import { getCurrentUser } from "./userAction";

const initialState = {
  userInfo: {},
  userToken: localStorage.getItem(USER_TOKEN),
  userId : localStorage.getItem("userId"),
  scheduleExisted: false,
  isLoading: true,
  isSuccess: false,
  errorMessage: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem(USER_TOKEN);
      localStorage.removeItem('userId');
      removeCookie('userId')
      state.userInfo = {};
      state.userToken = null;
      state.scheduleExisted = false,
      state.isLoading = false;
      state.isSuccess = true;
      state.errorMessage = "";
    },

    updateUserDetails: (state, { payload }) => {
      state.userInfo = payload?.user;
      state.userToken = localStorage.getItem(USER_TOKEN);
      state.userId = localStorage.getItem("userId");
      state.scheduleExisted = payload?.haveSchedule;
      state.isLoading = false;
      state.isSuccess = true;
      state.errorMessage = "";
    }
  },
  extraReducers:(builder) => {
    builder.addCase(getCurrentUser.fulfilled, (state, { payload }) => {
      localStorage.setItem(USER_TOKEN, payload?.token);
      setCookie('userId',payload?.user?.userId)
      state.userInfo = payload.user;
      state.userToken = payload?.token;
      state.userId =  payload?.user?.userId;
      state.scheduleExisted = payload?.haveSchedule;
      state.isLoading = false;
      state.isSuccess = true;
      state.errorMessage = "";
    })
  }
})

export const { logoutUser, updateUserDetails } = userSlice.actions;

export default userSlice.reducer;
