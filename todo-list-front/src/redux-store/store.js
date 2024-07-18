import {configureStore} from "@reduxjs/toolkit";

import authenticationReducer from "./authenticationSlice.js";
import todoReducer from "./todoSlice.js";

export const store = configureStore({
    reducer: {
        auth: authenticationReducer,
        todo: todoReducer
    },
});