import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '../services/appService';
import i18n from 'i18next';
 
const initialState = {
    regions: [],
    locales: [],
    countries: [],
    currLocale: undefined,
    currLocaleName: undefined,
    currCountry: {name: "", dialCode: "+"}
};

export const getRegionsAsync = createAsyncThunk(
  'app/getregions',
  async () => {
    const res = await api.getRegions();
    return res.data;
  }
)

export const getLocalesAsync = createAsyncThunk(
  'app/getlocales',
  async () => {
    const res = await api.getLocales();
    return res.data;
  }
)

export const getLocaleAsync = createAsyncThunk(
  'app/getlocalebyid',
  async (id) => {
    const res = await api.getLocale(id);
    return res.data;
  }
)

export const getCountriesAsync = createAsyncThunk(
  'app/getcountries',
  async () => {
    const res = await api.getCountries();
    return res.data;
  }
)

export const getCountryAsync = createAsyncThunk(
  'app/getcountrybyid',
  async (id) => {
    const res = await api.getCountry(id);
    return res.data;
  }
)

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
      
    },
    extraReducers: (builder) => {
      builder
        .addCase(getRegionsAsync.fulfilled, (state, action) => {
          state.regions = action.payload;
        })
        .addCase(getLocalesAsync.fulfilled, (state, action) => {
          state.locales = action.payload;
        })
        .addCase(getCountriesAsync.fulfilled, (state, action) => {
          state.countries = action.payload;
        })
        .addCase(getLocaleAsync.fulfilled, (state, action) => {
          state.currLocale = action.payload._id;
          state.currLocaleName = action.payload.default.name;
          Object.keys(action.payload).forEach(k => {
            if (k !== "_id")
              i18n.addResources(action.payload._id, k, action.payload[k]);
          });
          i18n.reloadResources(null, Object.keys(action.payload).filter(k => k !== "_id"));
          i18n.changeLanguage(action.payload._id).then(console.log(i18n.resolvedLanguage));
        })
        .addCase(getCountryAsync.fulfilled, (state, action) => {
          state.currCountry = action.payload;
        }); },
});

export const { } = appSlice.actions;

export const selectLocales = (state) => state.app.locales;
export const selectCountries = (state) => state.app.countries;
export const selectCurrLocale = (state) => state.app.currLocale;
export const selectCurrCountry = (state) => state.app.currCountry;

export default appSlice.reducer;