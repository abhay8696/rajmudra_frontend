import axios from "axios";
//variables
const serverUrl = import.meta.env; //development/production backend url

export const loginReq_to_Server = async (contact, password) => {
    const loginEndpoint = `${serverUrl.VITE_REACT_APP_serverURL}/auth/login`;

    console.log({ loginEndpoint, contact, password });

    try {
        const res = await axios.post(loginEndpoint, { contact, password });
        return res;
    } catch (err) {
        return err;
    }
};

export const getAllShop_from_server = async (token) => {
    const endpoint = `${serverUrl.VITE_REACT_APP_serverURL}/shop/all`;
    try {
        const response = await axios.get(endpoint, {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        });

        return response.data;
    } catch (err) {
        return err;
    }
};

export const saveToLocal = (name, data) => {
    if (!data || !name) return;
    window.localStorage.setItem(name, JSON.stringify(data));
};

export const getFromLocal = (name) => {
    if (!name) return;

    const item = window.localStorage.getItem(name);

    if (item) return JSON.parse(item);

    return null;
};
