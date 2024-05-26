import { useDispatch, useSelector } from "react-redux";
import { showModal, hideModal } from "../redux/slices/modal-slice";

/**
 * Custom hook to manage modal visibility.
 *
 * @returns {Object} Object containing the modal state and functions to open and close the modal.
 */
export const useModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.isOpen);

  /**
   * Opens the modal by dispatching the showModal action.
   */
  const openModal = () => {
    dispatch(showModal());
  };

  /**
   * Closes the modal by dispatching the hideModal action.
   */
  const closeModal = () => {
    dispatch(hideModal());
  };

  return { isOpen, openModal, closeModal };
};
