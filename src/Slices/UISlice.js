import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    toolbarHeight: 0,
    windowHeight: 0
};

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
      toolbarHeight: (state, action) => {
        state.toolbarHeight = action.payload;
      },
      windowHeight: (state, action) => {
        state.windowHeight = action.payload;
      }
    },
    extraReducers: (builder) => { },
});

export const { toolbarHeight, windowHeight } = uiSlice.actions;

export const selectToolbarHeight = (state) => state.ui.toolbarHeight;
export const selectWindowHeight = (state) => state.ui.windowHeight;

export default uiSlice.reducer;