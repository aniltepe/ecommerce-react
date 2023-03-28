import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    drawerOpen: false,
    currTheme: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light",
    genericDialog: "",
    snackbarItems: []
};

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
      setDrawerOpen: (state, action) => {
        state.drawerOpen = action.payload;
      },
      setCurrTheme: (state, action) => {
        state.currTheme = action.payload;
      },
      setGenericDialog: (state, action) => {
        state.genericDialog = action.payload;
      },
      addSnackbarItem: (state, action) => {
        state.snackbarItems.push(action.payload);
      }, 
      deleteSnackbarItem: (state, action) => {
        const idx = state.snackbarItems.length - 1 - action.payload;
        state.snackbarItems = [...state.snackbarItems.slice(0, idx), ...state.snackbarItems.slice(idx + 1)];
      }
    },
    extraReducers: (builder) => { },
});

export const { setDrawerOpen, setCurrTheme, setGenericDialog, addSnackbarItem, deleteSnackbarItem } = uiSlice.actions;

export const selectDrawerOpen = (state) => state.ui.drawerOpen;
export const selectCurrTheme = (state) => state.ui.currTheme;
export const selectGenericDialog = (state) => state.ui.genericDialog;
export const selectSnackbarItems = (state) => state.ui.snackbarItems;

export default uiSlice.reducer;