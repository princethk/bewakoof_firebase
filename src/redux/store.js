import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth-slice";
import { cartReducer } from "./slices/cart-slice";
import { modalReducer } from "./slices/modal-slice";
import { ordersReducer } from "./slices/orders-slice";
import { productsReducer } from "./slices/product-slice";
import { orderFormReducer } from "./slices/order-form-slice";

/**
 * Configures the Redux store with slices for authentication, cart, orders, products, and modal.
 *
 * @returns {object} The configured Redux store.
 */
const store = configureStore({
  reducer: {
    auth: authReducer, // Reducer for authentication state
    cart: cartReducer, // Reducer for cart state
    orders: ordersReducer, // Reducer for orders state
    products: productsReducer, // Reducer for products state
    modal: modalReducer, // Reducer for modal state
    orderForm: orderFormReducer, // Reducer for order form state
  },
});

export default store;
