import axios from "axios";

export const getRegions = () => {
    return axios.get("http://192.168.1.38:5000/api/regions");
}

export const getLocales = () => {
    return axios.get("http://192.168.1.38:5000/api/locales");
}

export const getLocale = (id) => {
    return axios.get("http://192.168.1.38:5000/api/locale/" + id);
}

export const getCountries = () => {
    return axios.get("http://192.168.1.38:5000/api/countries");
}

export const getCountry = (id) => {
    return axios.get("http://192.168.1.38:5000/api/country/" + id);
}