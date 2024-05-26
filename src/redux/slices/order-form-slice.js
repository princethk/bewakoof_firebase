import { createSlice } from "@reduxjs/toolkit";

/**
 * Create a Redux slice for managing order form visibility state.
 */
const orderFormSlice = createSlice({
  name: "order-form", // Name of the slice
  initialState: {
    isOpen: false, // Indicates whether the order form is open or not
  },
  reducers: {
    // Reducer to show the modal
    showOrderForm: (state) => {
      state.isOpen = true;
    },
    // Reducer to hide the modal
    hideOrderForm: (state) => {
      state.isOpen = false;
    },
  },
});

// Export action creators and reducer
export const { showOrderForm, hideOrderForm } = orderFormSlice.actions; // Export action creators
export const orderFormReducer = orderFormSlice.reducer; // Export reducer
