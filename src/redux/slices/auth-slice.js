import { createSlice } from "@reduxjs/toolkit";

// Define the initial state of the authentication slice
const initialState = {
  isAuthenticated: false, // Indicates whether the user is authenticated or not
  user: null, // Stores information about the authenticated user
};

// Create a Redux slice for managing authentication state
const authSlice = createSlice({
  name: "auth", // Name of the slice
  initialState, // Initial state defined above
  reducers: {
    // Define a reducer to set authentication state
    setAuth: (state, action) => {
      // Update isAuthenticated and user based on payload
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
    },
  },
});

// Export selectors and actions
export const selectAuth = (state) => state.auth; // Selector to get authentication state
export const { setAuth } = authSlice.actions; // Action creator for setting authentication state

// Export the reducer
export const authReducer = authSlice.reducer;
