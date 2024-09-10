import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./token/tokenSlice";
import adminReducer from "./admin/adminSlice";

export const store = configureStore({
    reducer: {
        token: tokenReducer,
        admin: adminReducer,
    },
});
