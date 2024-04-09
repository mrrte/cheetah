import { createAsyncThunk } from "@reduxjs/toolkit";
import * as ScheduleApi from "../../apis/schedule.api"


export const retrieveScheduleDetails = createAsyncThunk('/retrieve-schedule-details', async (data, { rejectWithValue }) => {
  try {
    const response = await ScheduleApi.retrieveSchedulePlan(data)
    return response.data
  } catch (error) {
    if (error?.response?.data?.message) return rejectWithValue(error?.response?.data?.message);
    return rejectWithValue(error.message);
  }
})