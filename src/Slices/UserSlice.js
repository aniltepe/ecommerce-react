import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login, logout, signup, auth } from '../services/userService';
import { Buffer } from "buffer";

const initialState = {
  status: "idle",
  loggedUser: undefined
};

export const authAsync = createAsyncThunk(
  'user/auth',
  async () => {
      const response = await auth();
      return { data: response.data, status: response.status, statusText: response.statusText };
  }
)

export const loginAsync = createAsyncThunk(
  'user/login',
  async (logindata) => {
      const response = await login(logindata);
      return { data: response.data, status: response.status, statusText: response.statusText };
  }
)

export const signupAsync = createAsyncThunk(
    'user/signup',
    async (signupdata) => {
        const response = await signup(signupdata);
        return response.data;
    }
)

export const logoutAsync = createAsyncThunk(
    'user/logout',
    async (_, thunkAPI) => {
        const { user } = thunkAPI.getState();
        const response = await logout({id: user.loggedUser.id}, {"x-access-token": user.loggedUser.accessToken});
        thunkAPI.dispatch(setUserUndefined());
        return response.data;
    }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoggedUser: (state, action) => {
      state.loggedUser = {...action.payload, image: Buffer.from(action.payload.image).toString()};
    },
    setUserUndefined: (state) => {
      state.loggedUser = undefined;
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
      .addCase(authAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(authAsync.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(logoutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(logoutAsync.rejected, (state) => {
        state.status = "idle";
      });
  },
});

export const { setLoggedUser, setUserUndefined } = userSlice.actions;

export const selectStatus = (state) => state.user.status;
export const selectLoggedUser = (state) => state.user.loggedUser;

export default userSlice.reducer;
