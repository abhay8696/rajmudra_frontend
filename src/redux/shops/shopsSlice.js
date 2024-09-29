import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [],
};

export const shopsSlice = createSlice({
    name: "shops",
    initialState,
    reducers: {
        setShops: (state, action) => {
            state.value = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setShops } = shopsSlice.actions;

export default shopsSlice.reducer;
