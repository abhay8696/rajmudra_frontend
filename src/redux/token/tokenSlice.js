import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 0,
};

export const tokenSlice = createSlice({
    name: "token",
    initialState,
    reducers: {
        increment: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1;
        },
        setToken: (state, action) => {
            state.value = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setToken, increment } = tokenSlice.actions;

export default tokenSlice.reducer;
