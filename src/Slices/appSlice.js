import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '../services/appService';
import i18n from 'i18next';
import { Buffer } from "buffer";
 
const initialState = {
    regions: [],
    langs: [],
    countries: [],
    currLang: {id: "", name: ""},
    currCountry: {name: "", dialCode: "+", icon: ""}
};

export const getRegionsAsync = createAsyncThunk(
  'app/getregions',
  async () => {
    const res = await api.getRegions();
    return res.data;
  }
)

export const getLangsAsync = createAsyncThunk(
  'app/getlangs',
  async () => {
    const res = await api.getLangs();
    return res.data;
  }
)

export const getLangAsync = createAsyncThunk(
  'app/getlangbyid',
  async (id) => {
    const res = await api.getLang(id);
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
      setCurrCountry: (state, action) => {
        state.currCountry = action.payload;
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(getRegionsAsync.fulfilled, (state, action) => {
          state.regions = action.payload;
        })
        .addCase(getLangsAsync.fulfilled, (state, action) => {
          state.langs = action.payload;
        })
        .addCase(getCountriesAsync.fulfilled, (state, action) => {
          state.countries = action.payload;
        })
        .addCase(getLangAsync.fulfilled, (state, action) => {
          state.currLang = { id: action.payload._id, name: action.payload.default.name };
          Object.keys(action.payload).filter(k => k !== "_id").forEach(k => i18n.addResources(action.payload._id, k, action.payload[k]));
          i18n.reloadResources(null, Object.keys(action.payload).filter(k => k !== "_id"));
          i18n.changeLanguage(action.payload._id);
        })
        .addCase(getCountryAsync.fulfilled, (state, action) => {
          state.currCountry = {...action.payload, icon: Buffer.from(action.payload.icon).toString()}
        }); },
});

export const { setCurrCountry } = appSlice.actions;

export const selectRegions = (state) => state.app.regions;
export const selectLangs = (state) => state.app.langs;
export const selectCountries = (state) => state.app.countries;
export const selectCurrLang = (state) => state.app.currLang;
export const selectCurrCountry = (state) => state.app.currCountry;

export default appSlice.reducer;