import axios from "axios";

export const login = (data) => {
    axios.post("api/user/login", data)
    .then(res => console.log(res))
}

export const logout = (data) => {
    axios.post("api/user/logout", data)
    .then(res => console.log(res))
}

export const signup = (data) => {
    axios.post("api/user/signup", data)
     .then(res => console.log(res));
};

export const checkusername = (username) => {
    return true;
    // axios.post("api/checkusername", username)
    //  .then(res => console.log(res));
};

export const checkemail = (email) => {
    return true;
    // axios.post("api/checkusername", username)
    //  .then(res => console.log(res));
};

export const checkphone = (phone) => {
    return true;
    // axios.post("api/checkusername", username)
    //  .then(res => console.log(res));
};