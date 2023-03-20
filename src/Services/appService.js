import axios from "axios";

export const getRegions = () => {
    return axios.get("http://192.168.1.38:5000/api/regions");
}

export const getLangs = () => {
    return axios.get("http://192.168.1.38:5000/api/langs");
}

export const getLang = (id) => {
    return axios.get("http://192.168.1.38:5000/api/lang/" + id);
}

export const getCountries = () => {
    return axios.get("http://192.168.1.38:5000/api/countries");
}

export const getCountry = (id) => {
    return axios.get("http://192.168.1.38:5000/api/country/" + id);
}