import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase.config";

/**
 * Initial state for the orders slice.
 */
const initialState = {
  orders: [], // Array to store orders
  addingOrder: false, // Indicates whether an order is being added
  fetchingOrders: false, // Indicates whether orders are being fetched
  errorAdding: null, // Error message for adding order
  errorFetching: null, // Error message for fetching orders
};

/**
 * Async thunk to fetch orders for the logged-in user.
 */
export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async (_, { getState }) => {
    const state = getState();
    const userId = state.auth.user.uid; // Get user ID from authentication state
    const ordersRef = collection(db, "orders"); // Reference to the 'orders' collection
    const q = query(
      ordersRef,
      where("userId", "==", userId), // Query orders by user ID
      orderBy("createdAt", "desc") // Order orders by creation timestamp in descending order
    );
    try {
      const querySnapshot = await getDocs(q); // Execute the query
      const userOrders = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })); // Map query results to array of orders
      return userOrders;
    } catch (error) {
      console.log("Error fetching orders", error);
      throw error;
    }
  }
);

/**
 * Async thunk to add an order to Firestore.
 */
export const addOrderToFirestore = createAsyncThunk(
  "orders/addOrder",
  async (orderData, { getState }) => {
    const state = getState();
    const ordersRef = collection(db, "orders"); // Reference to the 'orders' collection
    const newOrder = {
      ...orderData,
      userId: state.auth.user.uid, // Set user ID from authentication state
      createdAt: serverTimestamp(), // Add createdAt field with server timestamp
    };

    try {
      await addDoc(ordersRef, newOrder); // Add new order to Firestore
      return newOrder;
    } catch (error) {
      throw error;
    }
  }
);

/**
 * Async thunk to add multiple orders to Firestore.
 */
export const addMultipleOrdersToFirestore = createAsyncThunk(
  "orders/addMultipleOrders",
  async (ordersData, { getState }) => {
    const state = getState();
    const ordersRef = collection(db, "orders"); // Reference to the 'orders' collection
    const userId = state.auth.user.uid;
    const newOrders = ordersData.map((order) => ({
      ...order,
      userId: userId,
      createdAt: serverTimestamp(), // Add createdAt field with server timestamp
    }));

    try {
      await Promise.all(newOrders.map((order) => addDoc(ordersRef, order))); // Add multiple orders to Firestore
      return newOrders;
    } catch (error) {
      throw error;
    }
  }
);

/**
 * Create a Redux slice for managing orders state.
 */
const ordersSlice = createSlice({
  name: "orders", // Name of the slice
  initialState, // Initial state defined above
  reducers: {}, // No additional reducers
  extraReducers: (builder) => {
    builder
      // Reducers for handling actions dispatched by async thunks
      .addCase(addOrderToFirestore.pending, (state) => {
        state.addingOrder = true; // Set addingOrder to true when adding order starts
        state.errorAdding = null; // Clear any previous error message
      })
      .addCase(addOrderToFirestore.fulfilled, (state, action) => {
        state.addingOrder = false; // Set addingOrder to false when adding order is successful
        state.orders.push(action.payload); // Push the newly added order to the orders array
      })
      .addCase(addOrderToFirestore.rejected, (state, action) => {
        state.addingOrder = false; // Set addingOrder to false when adding order fails
        state.errorAdding = action.error.message; // Set error message
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.fetchingOrders = true; // Set fetchingOrders to true when fetching orders starts
        state.errorFetching = null; // Clear any previous error message
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.fetchingOrders = false; // Set fetchingOrders to false when fetching orders is successful
        state.orders = action.payload; // Set orders array to the fetched orders
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.fetchingOrders = false; // Set fetchingOrders to false when fetching orders fails
        state.errorFetching = action.error.message; // Set error message
      })
      .addCase(addMultipleOrdersToFirestore.pending, (state) => {
        state.addingOrder = true; // Set addingOrder to true when adding multiple orders starts
        state.errorAdding = null; // Clear any previous error message
      })
      .addCase(addMultipleOrdersToFirestore.fulfilled, (state, action) => {
        state.addingOrder = false; // Set addingOrder to false when adding multiple orders is successful
        state.orders.push(...action.payload); // Push the newly added orders to the orders array
      })
      .addCase(addMultipleOrdersToFirestore.rejected, (state, action) => {
        state.addingOrder = false; // Set addingOrder to false when adding multiple orders fails
        state.errorAdding = action.error.message; // Set error message
      });
  },
});

// Selectors for accessing orders state
export const selectOrders = (state) => state.orders.orders; // Selector for retrieving orders
export const selectOrderState = (state) => ({
  // Selector for retrieving order state
  fetchingOrders: state.orders.fetchingOrders,
  addingOrder: state.orders.addingOrder,
  errorAdding: state.orders.errorAdding,
  errorFetching: state.orders.errorFetching,
});

// Export reducer
export const ordersReducer = ordersSlice.reducer;
