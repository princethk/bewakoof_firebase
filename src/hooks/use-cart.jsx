import { useSelector, useDispatch } from "react-redux";
import {
  selectCart,
  addItem,
  removeItem,
  updateItemQuantity,
  clearCart,
  showCartModal,
  hideCartModal,
  selectCartModalVisibility,
  selectTotalPrice,
  selectTotalProducts,
} from "../redux/slices/cart-slice";
import useAuth from "./use-auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

/**
 * Custom hook for handling cart operations.
 *
 * @returns {Object} Cart related functions and state.
 */
const useCart = () => {
  const totalPrice = useSelector(selectTotalPrice);
  const cart = useSelector(selectCart);
  const cartModalVisible = useSelector(selectCartModalVisibility);
  const totalItems = useSelector(selectTotalProducts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    auth: { isAuthenticated },
  } = useAuth();

  /**
   * Adds an item to the cart.
   *
   * @param {Object} item - The item to add to the cart.
   */
  const addToCart = (item) => {
    if (!isAuthenticated) {
      toast.error("You must login first", { id: "error-toast" });
      return navigate("/login");
    }
    try {
      dispatch(addItem(item));
      toast.success("Item added to cart", { id: "success-toast" });
    } catch (error) {
      toast.error(error.message, { id: "error-toast" });
    }
  };

  /**
   * Removes an item from the cart by its ID.
   *
   * @param {string} itemId - The ID of the item to remove.
   */
  const removeFromCart = (itemId) => {
    dispatch(removeItem(itemId));
  };

  /**
   * Updates the quantity of an item in the cart.
   *
   * @param {string} itemId - The ID of the item.
   * @param {number} quantity - The new quantity.
   */
  const updateCartItemQuantity = (itemId, quantity) => {
    dispatch(updateItemQuantity({ id: itemId, quantity }));
  };

  /**
   * Clears all items from the cart.
   */
  const clearWholeCart = () => {
    dispatch(clearCart());
  };

  /**
   * Shows the cart modal.
   */
  const showCart = () => {
    dispatch(showCartModal());
  };

  /**
   * Hides the cart modal.
   */
  const hideCart = () => {
    dispatch(hideCartModal());
  };

  return {
    cart,
    totalPrice,
    cartModalVisible,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearWholeCart,
    showCart,
    hideCart,
    totalItems,
  };
};

export default useCart;
