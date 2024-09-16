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
        if (
            err.code === "ERR_NETWORK" ||
            err.message.includes("Network Error") ||
            err.message.includes("ERR_CONNECTION_REFUSED")
        ) {
            throw new Error({
                message:
                    "Unable to connect to the server. Please check if the backend is running.",
            });
        }
        // Handle other errors
        throw new Error({ message: err.message || "An error occurred." });
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
        if (
            err.code === "ERR_NETWORK" ||
            err.message.includes("Network Error") ||
            err.message.includes("ERR_CONNECTION_REFUSED")
        ) {
            throw new Error(
                JSON.stringify({
                    message:
                        "Unable to connect to the server. Please check if the backend is running.",
                })
            );
        }
        // Handle other errors
        throw new Error({ message: err.message || "An error occurred." });
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

export const formatDate = (isoString) => {
    if (!isoString) return "No date found";
    const date = new Date(isoString);

    // Define month names
    const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    // Get day, month, and year from the Date object
    const day = date.getUTCDate();
    const month = monthNames[date.getUTCMonth()]; // Months are 0-indexed, so we use getUTCMonth()
    const year = date.getUTCFullYear();

    // Return formatted date string
    return `${day} ${month} ${year}`;
};

// Example usage:
console.log(formatDate("2024-02-01T00:00:00.000Z")); // Output: "1 Feb 2024"
