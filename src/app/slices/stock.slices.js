import { createSlice } from "@reduxjs/toolkit";
import { fetchStock } from "../../api/request";




export const stockSlices = createSlice({
  name: "stock",
  initialState: {
    stock: [],
    stock_selected: {},
    moto: [],
  },
  reducers: {
    setStock: (state, action) => {
      state.stock = action.payload;
    },
    setMoto: (state, action) => {
      state.moto = action.payload;
    },
    setStockSelected: (state, action) => {
        state.stock_selected = action.payload;
        },
  },
});

export const { setStock, setMoto , setStockSelected } = stockSlices.actions;

export const stockReducer = stockSlices.reducer;