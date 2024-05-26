import { createSlice } from "@reduxjs/toolkit";

// Define the initial state for the cart slice
const initialState = {
  // Retrieves cart items from local storage or initializes to an empty array
  items: JSON.parse(localStorage.getItem("cartItems")) || [],
  cartModalVisible: false, // Indicates whether the cart modal is visible or not
};

// Create a Redux slice for managing the cart state
const cartSlice = createSlice({
  name: "cart", // Name of the slice
  initialState, // Initial state defined above
  reducers: {
    // Reducer to add an item to the cart
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        if (existingItem.quantity >= 5)
          throw new Error("Maximum quantity allowed per item is 5");
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }

      // Update local storage with updated cart items
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    // Reducer to remove an item from the cart
    removeItem: (state, action) => {
      const idToRemove = action.payload;
      state.items = state.items.filter((item) => item.id !== idToRemove);
      // Update local storage with updated cart items
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    // Reducer to update the quantity of an item in the cart
    updateItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const itemToUpdate = state.items.find((item) => item.id === id);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
        // Update local storage with updated cart items
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },
    // Reducer to clear the cart
    clearCart: (state) => {
      state.items = []; // Clear cart items
      localStorage.removeItem("cartItems"); // Remove cart items from local storage
    },
    // Reducer to show the cart modal
    showCartModal: (state) => {
      state.cartModalVisible = true;
    },
    // Reducer to hide the cart modal
    hideCartModal: (state) => {
      state.cartModalVisible = false;
    },
  },
});

// Selectors for accessing cart state
export const selectCart = (state) => state.cart.items; // Selector for retrieving cart items
export const selectCartModalVisibility = (state) => state.cart.cartModalVisible; // Selector for retrieving cart modal visibility
export const selectTotalPrice = (state) => {
  // Selector for calculating total price of items in the cart
  return state.cart.items.reduce((total, item) => {
    return total + item.priceInINR * item.quantity;
  }, 0);
};
export const selectTotalProducts = (state) => {
  // Selector for calculating total number of products in the cart
  return state.cart.items.length;
};

// Export action creators and reducer
export const {
  addItem,
  removeItem,
  updateItemQuantity,
  clearCart,
  showCartModal,
  hideCartModal,
} = cartSlice.actions; // Export action creators
export const cartReducer = cartSlice.reducer; // Export reducer
