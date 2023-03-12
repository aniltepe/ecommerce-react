import { createSlice } from '@reduxjs/toolkit';
// import { useSnackBar } from '../components/layout/SnackBar';

const initialState = {
    toolbarHeight: 0,
    windowHeight: 0,
    drawerOpen: false,
    currTheme: "light",
    genericDialog: ""
};

// function addSnackbarItem() {
//   const {add} = useSnackBar();
// }

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
      toolbarHeight: (state, action) => {
        state.toolbarHeight = action.payload;
      },
      windowHeight: (state, action) => {
        state.windowHeight = action.payload;
      },
      setDrawerOpen: (state, action) => {
        state.drawerOpen = action.payload;
      },
      setCurrTheme: (state, action) => {
        state.currTheme = action.payload;
      },
      setGenericDialog: (state, action) => {
        state.genericDialog = action.payload;
      },
      // addSnackbarItem: (state, action) => {

      // }
    },
    extraReducers: (builder) => { },
});

export const { toolbarHeight, windowHeight, setDrawerOpen, setCurrTheme, setGenericDialog } = uiSlice.actions;

export const selectToolbarHeight = (state) => state.ui.toolbarHeight;
export const selectWindowHeight = (state) => state.ui.windowHeight;
export const selectDrawerOpen = (state) => state.ui.drawerOpen;
export const selectCurrTheme = (state) => state.ui.currTheme;
export const selectGenericDialog = (state) => state.ui.genericDialog;

export default uiSlice.reducer;