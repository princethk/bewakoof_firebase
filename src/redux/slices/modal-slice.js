import { createSlice } from "@reduxjs/toolkit";

/**
 * Create a Redux slice for managing modal state.
 */
const modalSlice = createSlice({
  name: "modal", // Name of the slice
  initialState: {
    isOpen: false, // Indicates whether the modal is open or not
  },
  reducers: {
    // Reducer to show the modal
    showModal: (state) => {
      state.isOpen = true;
    },
    // Reducer to hide the modal
    hideModal: (state) => {
      state.isOpen = false;
    },
  },
});

// Export action creators and reducer
export const { showModal, hideModal } = modalSlice.actions; // Export action creators
export const modalReducer = modalSlice.reducer; // Export reducer
