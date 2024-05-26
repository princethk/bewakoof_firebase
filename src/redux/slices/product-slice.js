import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { usdToInr } from "../../utils";

/**
 * Async thunk to fetch products from the fakestoreapi.com.
 */
export const fetchProducts = createAsyncThunk(
  "products/fetchBySearchTerm",
  async (_, { rejectWithValue }) => {
    try {
      const storedProducts = sessionStorage.getItem("products");
      if (storedProducts) {
        return JSON.parse(storedProducts);
      }
      const response = await fetch(`https://fakestoreapi.com/products`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();

      const updatedProducts = [];
      for (const product of data) {
        const priceInINR = await usdToInr(product.price);
        updatedProducts.push({ ...product, priceInINR });
      }
      sessionStorage.setItem("products", JSON.stringify(updatedProducts));
      return updatedProducts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Async thunk to fetch a product by its ID from the fakestoreapi.com.
 */
export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }
      const product = await response.json();
      const priceInINR = await usdToInr(product.price);
      return { ...product, priceInINR };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Initial state for the products slice.
 */
const initialState = {
  products: [], // Array to store products
  productById: null, // Single product fetched by ID
  isLoading: false, // Indicates whether products are being fetched
  error: null, // Error message for fetching products
};

/**
 * Create a Redux slice for managing products state.
 */
const productsSlice = createSlice({
  name: "products", // Name of the slice
  initialState, // Initial state defined above
  reducers: {}, // No additional reducers
  extraReducers: (builder) => {
    builder
      // Reducers for handling actions dispatched by async thunks
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true; // Set isLoading to true when fetching products starts
        state.error = null; // Clear any previous error message
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false; // Set isLoading to false when fetching products is successful
        state.products = action.payload; // Set products array to the fetched products
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false; // Set isLoading to false when fetching products fails
        state.error = action.payload; // Set error message
      })
      .addCase(fetchProductById.pending, (state) => {
        state.isLoading = true; // Set isLoading to true when fetching a product by ID starts
        state.error = null; // Clear any previous error message
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.isLoading = false; // Set isLoading to false when fetching a product by ID is successful
        state.productById = action.payload; // Set productById to the fetched product
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.isLoading = false; // Set isLoading to false when fetching a product by ID fails
        state.error = action.payload; // Set error message
      });
  },
});

// Selector for accessing products state
export const selectProducts = (state) => state.products;

// Export reducer
export const productsReducer = productsSlice.reducer;
