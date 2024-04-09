import { createSlice } from "@reduxjs/toolkit";
import { retrieveScheduleDetails } from "./scheduleAction";


const initialState = {
  userInfo: {},
  scheduleDetails: {},
  taskView:"taskViewByDay",
  userId : localStorage.getItem('userId'),
  excelFilePath : " ",
  scheduleId:" ",
  isLoading: true,
  isSuccess: false,
  errorMessage: ''
}

export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    updateScheduleDetails: (state, { payload }) => {
      state.userInfo = payload?.user;
      state.scheduleDetails=  payload?.json ? JSON.parse(payload?.json) : {},
      state.taskView= payload?.taskView
      state.userId = localStorage.getItem('userId'),
      state.excelFilePath = payload?.filePath,
      state.scheduleId = payload?.scheduleId,
      state.isLoading= false,
      state.isSuccess= true,
      state.errorMessage= ''
    }
  },
  extraReducers:(builder) => {
    builder.addCase(retrieveScheduleDetails.fulfilled, (state, { payload }) => {
        state.userInfo = payload?.user;
        state.scheduleDetails=  payload?.json ? JSON.parse(payload?.json) : {},
        state.taskView= payload?.taskView
        state.userId = localStorage.getItem('userId'),
        state.excelFilePath = payload?.filePath,
        state.scheduleId = payload?.scheduleId,
        state.isLoading= false,
        state.isSuccess= true,
        state.errorMessage= ''
    })
  }
})

export const { updateScheduleDetails } = scheduleSlice.actions;

export default scheduleSlice.reducer;
