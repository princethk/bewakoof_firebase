import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideOrderForm, showOrderForm } from "../redux/slices/order-form-slice";
import {
  addMultipleOrdersToFirestore,
  addOrderToFirestore,
  fetchUserOrders,
  selectOrderState,
  selectOrders,
} from "../redux/slices/orders-slice";
import useAuth from "./use-auth";

/**
 * Custom hook to manage orders.
 *
 * @returns {Object} Object containing orders state and functions to interact with orders.
 */
const useOrders = () => {
  const navigate = useNavigate();
  const { fetchingOrders, addingOrder, errorFetching, errorAdding } =
    useSelector(selectOrderState);
  const orders = useSelector(selectOrders);
  const dispatch = useDispatch();
  const {
    auth: { isAuthenticated },
  } = useAuth();

  /**
   * Adds a new order to Firestore.
   *
   * @param {Object} order - The order to add.
   */
  const addNewOrder = async (order) => {
    try {
      if (!isAuthenticated) {
        toast.error("You must login first", { id: "error-toast" });
        return navigate("/login");
      }
      dispatch(addOrderToFirestore(order));
      toast.success("Order Confirmed", { id: "success-toast" });
    } catch (error) {
      toast.error("Order Failed", { id: "error-toast" });
      console.error("Error adding order:", error);
    }
  };

  /**
   * Adds multiple orders to Firestore.
   *
   * @param {Array} ordersData - The orders to add.
   */
  const addMultipleOrders = async (ordersData) => {
    try {
      if (!isAuthenticated) {
        toast.error("You must login first", { id: "error-toast" });
        return navigate("/login");
      }
      dispatch(addMultipleOrdersToFirestore(ordersData));
      toast.success("Orders Confirmed", { id: "success-toast" });
    } catch (error) {
      toast.error("Orders Failed", { id: "error-toast" });
      console.error("Error adding orders:", error);
    }
  };

  /**
   * Fetches all orders of the authenticated user from Firestore.
   */
  const fetchUserAllOrders = async () => {
    try {
      if (!isAuthenticated) {
        toast.error("You must login first", { id: "error-toast" });
        return navigate("/login");
      }
      dispatch(fetchUserOrders());
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const isOrderFormOpen = useSelector((state) => state.orderForm.isOpen);

  /**
   * Opens the order form by dispatching the showOrderForm action.
   */
  const openOrderForm = () => {
    if (!isAuthenticated) {
      toast.error("You must login first", { id: "error-toast" });
      return navigate("/login");
    }
    dispatch(showOrderForm());
  };

  /**
   * Closes the order form by dispatching the hideOrderForm action.
   */
  const closeOrderForm = () => {
    dispatch(hideOrderForm());
  };

  return {
    isOrderFormOpen,
    openOrderForm,
    closeOrderForm,
    orders,
    fetchingOrders,
    addingOrder,
    errorFetching,
    errorAdding,
    addNewOrder,
    addMultipleOrders,
    fetchUserAllOrders,
  };
};

export default useOrders;
