import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import scheduleReducer from './schedule/scheduleSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    schedule: scheduleReducer,
  }
})