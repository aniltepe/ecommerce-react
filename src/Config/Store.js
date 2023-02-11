import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Slices/UserSlice';
import uiReducer from '../Slices/UISlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    ui: uiReducer
  }
});
