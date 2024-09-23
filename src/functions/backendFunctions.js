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
        console.log(err);
        if (
            err.code === "ERR_NETWORK" ||
            err.message.includes("Network Error") ||
            err.message.includes("ERR_CONNECTION_REFUSED")
        ) {
            throw new Error(
                "Unable to connect to the server. Please check if the backend is running."
            );
        }
        // Handle other errors
        throw new Error(
            err?.response?.data?.message || "Internal Server Error"
        );
    }
};

export const getAllShops_from_server = async (token) => {
    const endpoint = `${serverUrl.VITE_REACT_APP_serverURL}/shop/all`;
    try {
        const response = await axios.get(endpoint, {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        });

        return response.data;
    } catch (err) {
        // console.log(err);
        if (
            err.code === "ERR_NETWORK" ||
            err.message.includes("Network Error") ||
            err.message.includes("ERR_CONNECTION_REFUSED")
        ) {
            throw new Error(
                "Unable to connect to the server. Please check if the backend is running."
            );
        }
        // Handle other errors
        throw new Error(
            err?.response?.data?.message || "Internal Server Error"
        );
    }
};

export const shopRequests = async ({
    method,
    shopObject,
    token,
    shopId,
    type,
    conditionKey, //shopNo, registrationNo, ownerName, etc
    conditionVal,
}) => {
    let endpoint = `${serverUrl.VITE_REACT_APP_serverURL}/shop`;

    if (type === "create") endpoint = endpoint.concat("/new");
    else if (type === "condition")
        endpoint = endpoint.concat(
            `/condition/${conditionKey}/${conditionVal}`
        );
    else endpoint = endpoint.concat(`/${shopId}`);

    const config = {
        method: method, // "get", "post", "put", "delete"
        url: endpoint,
        headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        data: shopObject || {},
    };
    // console.log(config);
    try {
        const response = await axios(config);
        return response.data;
    } catch (err) {
        console.log(err);
        if (
            err.code === "ERR_NETWORK" ||
            err.message.includes("Network Error") ||
            err.message.includes("ERR_CONNECTION_REFUSED")
        ) {
            throw new Error(
                "Unable to connect to the server. Please check if the backend is running."
            );
        }
        // Handle other errors
        throw new Error(
            err?.response?.data?.message || "Internal Server Error"
        );
    }
};

export const paymentsRequests = async ({
    method,
    paymentObject,
    token,
    paymentId,
    type,
    conditionKey, //shopNo, registrationNo, ownerName, etc
    conditionVal,
}) => {
    let endpoint = `${serverUrl.VITE_REACT_APP_serverURL}/payment`;

    if (type === "create") endpoint = endpoint.concat("/new");
    else if (type === "condition")
        endpoint = endpoint.concat(
            `/condition/${conditionKey}/${conditionVal}`
        );
    else endpoint = endpoint.concat(`/${paymentId}`);

    const config = {
        method: method, // "get", "post", "put", "delete"
        url: endpoint,
        headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        data: paymentObject || {},
    };

    try {
        const response = await axios(config);
        return response.data;
    } catch (err) {
        // console.log(err);
        if (
            err.code === "ERR_NETWORK" ||
            err.message.includes("Network Error") ||
            err.message.includes("ERR_CONNECTION_REFUSED")
        ) {
            throw new Error(
                "Unable to connect to the server. Please check if the backend is running."
            );
        }
        // Handle other errors
        throw new Error(
            err?.response?.data?.message || "Internal Server Error"
        );
    }
};
