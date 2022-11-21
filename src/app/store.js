import { configureStore } from "@reduxjs/toolkit";
import { stockReducer } from "./slices/stock.slices";


export const store = configureStore({
    reducer: {
        stock: stockReducer,
    },
});