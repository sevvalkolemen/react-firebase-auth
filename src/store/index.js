import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import modal from "./modal";
import todos from "./todos";

export const store = configureStore({
    reducer: {
        auth, 
        modal,
        todos
    }
})

export default store