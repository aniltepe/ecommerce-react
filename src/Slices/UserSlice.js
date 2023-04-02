import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login, logout, signup } from '../services/userService';
import { Buffer } from "buffer";

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
        const response = await login(logindata);
        return { data: response.data, status: response.status, statusText: response.statusText };
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
  reducers: {
    setLoggedUser: (state, action) => {
      state.loggedUser = {...action.payload, image: Buffer.from(action.payload.image).toString()};
      console.log(Buffer.from(action.payload.image).toString());
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signupAsync.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(signupAsync.rejected, (state) => {
        state.status = "idle";
      })
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAsync.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = "idle";
        console.log(action)
      });
  },
});

export const { setLoggedUser } = userSlice.actions;

export const selectStatus = (state) => state.user.status;
export const selectLoggedUser = (state) => state.user.loggedUser;

export default userSlice.reducer;
