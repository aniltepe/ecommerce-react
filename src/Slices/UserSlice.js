import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login, logout, signup } from '../services/userService';

const initialState = {
  status: "idle",
  loggedUser: undefined
};

export const signupAsync = createAsyncThunk(
    'user/signup',
    async (signupdata) => {
        const res = await signup(signupdata);
        return res.data;
    }
)

export const loginAsync = createAsyncThunk(
    'user/login',
    async (logindata) => {
        const res = await login(logindata);
        return res.data;
    }
)

export const logoutAsync = createAsyncThunk(
    'user/logout',
    async (logoutdata) => {
        const res = await logout(logoutdata);
        return res.data;
    }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(signupAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signupAsync.fulfilled, (state, action) => {
        state.status = "idle";
      });
  },
});

// eslint-disable-next-line
// export const { } = userSlice.actions;

export const selectStatus = (state) => state.user.status;

export default userSlice.reducer;
