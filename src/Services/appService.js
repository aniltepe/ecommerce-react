import axios from "axios";

export const getRegions = () => {
    return axios.get("https://192.168.1.38/api/regions");
}

export const getLangs = () => {
    return axios.get("https://192.168.1.38/api/languages");
}

export const getLang = (id) => {
    return axios.get("https://192.168.1.38/api/language/" + id);
}

export const getCountries = () => {
    return axios.get("https://192.168.1.38/api/countries");
}

export const getCountry = (id) => {
    return axios.get("https://192.168.1.38/api/country/" + id);
}