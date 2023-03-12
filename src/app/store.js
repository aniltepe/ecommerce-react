import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';
import uiReducer from '../slices/uiSlice';
import appReducer from '../slices/appSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    ui: uiReducer,
    app: appReducer
  }
});
