import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        contact: "",
        email: "",
        isSuperAdmin: false,
        name: "",
    },
};

export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        increment: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1;
        },
        setAdmin: (state, action) => {
            state.value = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setAdmin } = adminSlice.actions;

export default adminSlice.reducer;
