import axios from "axios";

let lastTimeout = undefined;
let lastAttemptedEmail = undefined;
let lastAttemptedPhone = undefined;
let lastAttemptedEmailResp = undefined;
let lastAttemptedPhoneResp = undefined;

export const auth = () => {
    return axios.get("https://192.168.1.38/api/user/auth", {withCredentials: true}).catch((err) => {return err.response});
}

export const login = (data) => {
    return axios.post("https://192.168.1.38/api/user/login", data, {withCredentials: true}).catch((err) => {return err.response});
}

export const logout = (data, tokenheader = {}) => {
    return axios.post("https://192.168.1.38/api/user/logout", data, {withCredentials: true, headers: tokenheader});
}

export const signup = (data) => {
    return axios.post("https://192.168.1.38/api/user/signup", data);
};

export const checkusername = (username, withError) => {
    if (username === "")
        return;
    if (lastTimeout)
        clearTimeout(lastTimeout);
    if (withError)
        return new Promise((resolve) => resolve({data: false}));
    return new Promise((resolve) => {
        lastTimeout = setTimeout(() => {
            lastTimeout = undefined;
            const response = axios.get("https://192.168.1.38/api/user/checkusername/" + username);
            resolve(response);
        }, 1000);
    })
};

export const checkemail = (email) => {
    if (email === "")
        return;
    if (lastAttemptedEmail === email)
        return new Promise((resolve) => resolve({data: lastAttemptedEmailResp}));
    lastAttemptedEmail = email;
    return new Promise(async (resolve) => {
        const response = await axios.get("https://192.168.1.38/api/user/checkemail/" + email);
        lastAttemptedEmailResp = response.data;
        resolve(response);
    }); 
};

export const checkphone = (phone) => {
    if (phone === "")
        return;
    if (lastAttemptedPhone === phone)
        return new Promise((resolve) => resolve({data: lastAttemptedPhoneResp}));
    lastAttemptedPhone = phone;
    return new Promise(async (resolve) => {
        const response = await axios.get("https://192.168.1.38/api/user/checkphone/" + phone);
        lastAttemptedPhoneResp = response.data;
        resolve(response);
    });
};