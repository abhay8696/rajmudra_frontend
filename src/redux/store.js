import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./token/tokenSlice";
import adminReducer from "./admin/adminSlice";
import shopsReducer from "./shops/shopsSlice";

export const store = configureStore({
    reducer: {
        token: tokenReducer,
        admin: adminReducer,
        shops: shopsReducer,
    },
});
