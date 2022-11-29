import { createSlice } from "@reduxjs/toolkit";
import { fetchStock } from "../../api/request";

export const stockSlices = createSlice({
  name: "stock",
  initialState: {
    stock: [],
    stock_selected: {},
    moto: [],
    registration: [],
  },
  reducers: {
    setRegistration: (state, action) => {
      state.registration = action.payload;
    },
    setMoto: (state, action) => {
      state.moto = action.payload;
    },
    setStockSelected: (state, action) => {
      state.stock_selected = action.payload;
    },
  },
});

export const { setRegistration, setMoto, setStockSelected } =
  stockSlices.actions;

export const stockReducer = stockSlices.reducer;
