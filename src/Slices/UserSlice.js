import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login, logout, signup } from '../services/userService';

const initialState = {
  status: 'initial',
  user: undefined
};

export const signupAsync = createAsyncThunk(
    'user/signup',
    async (signupdata) => {
        const response = await signup(signupdata);
        return response;
    }
)

export const loginAsync = createAsyncThunk(
    'user/login',
    async (logindata) => {
        const response = await login(logindata);
        return response;
    }
)

export const logoutAsync = createAsyncThunk(
    'user/logout',
    async (logoutdata) => {
        const response = await logout(logoutdata);
        return response;
    }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(signupAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signupAsync.fulfilled, (state, action) => {
        state.status = 'signedup';
      });
  },
});

// eslint-disable-next-line
// export const { } = userSlice.actions;

export const selectStatus = (state) => state.user.status;

export default userSlice.reducer;
