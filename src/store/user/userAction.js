import { createAsyncThunk } from "@reduxjs/toolkit";
import * as AuthApi from '../../apis/authentication.api';
import * as UserApi from '../../apis/user.api'


export const ssoLogin = createAsyncThunk('/auth/google-sso', async (data, { rejectWithValue }) => {
  try {
    const response = await AuthApi.googleLogIn(data)
    return response.data
  } catch (error) {
    if (error?.response?.data?.message) return rejectWithValue(error?.response?.data?.message);
    return rejectWithValue(error.message);
  }
})

export const getCurrentUser = createAsyncThunk('/user/currentUser', async (data, { rejectWithValue }) => {
  try {
    const response = await UserApi.getCurrentUser(data)
    return response
  } catch (error) {
    if (error?.response?.data?.message) return rejectWithValue(error?.response?.data?.message);
    return rejectWithValue(error.message);
  }
})

