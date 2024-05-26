import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Button } from "@nextui-org/react";
import { X, Plus, Minus } from "lucide-react";
import { Fragment } from "react";
import useCart from "../hooks/use-cart";
import useOrders from "../hooks/use-orders";
import { DialogTitle } from "@mui/material";

/**
 * Component for displaying the shopping cart with options to checkout and clear cart
 * @returns {JSX.Element} ShoppingCart component JSX
 */
export default function ShoppingCart() {
  const {
    cart,
    cartModalVisible,
    hideCart,
    removeFromCart,
    totalPrice,
    clearWholeCart,
    updateCartItemQuantity,
  } = useCart();

  const { openOrderForm } = useOrders();

  /**
   * Handles the checkout process by adding orders to the cart and clearing it
   */
  function handleCheckout() {
    openOrderForm();
    hideCart();
  }

  /**
   * Increases the quantity of a cart item
   * @param {string} itemId - The ID of the item to increase the quantity of
   * @param {number} currentQuantity - The current quantity of the item
   */
  function increaseQuantity(itemId, currentQuantity) {
    if (currentQuantity < 5) {
      updateCartItemQuantity(itemId, currentQuantity + 1);
    }
  }

  /**
   * Decreases the quantity of a cart item
   * @param {string} itemId - The ID of the item to decrease the quantity of
   * @param {number} currentQuantity - The current quantity of the item
   */
  function decreaseQuantity(itemId, currentQuantity) {
    currentQuantity > 1
      ? updateCartItemQuantity(itemId, currentQuantity - 1)
      : removeFromCart(itemId);
  }

  return (
    <Transition show={cartModalVisible} as={Fragment}>
      <Dialog className="relative z-[100000]" onClose={hideCart}>
        <TransitionChild
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <TransitionChild
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <DialogTitle className="text-lg font-medium text-gray-900">
                          Shopping cart
                        </DialogTitle>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => hideCart()}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <X className="h-6 w-6" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        {cart?.length === 0 ? (
                          <p className="text-center text-gray-500">
                            Your cart is empty.
                          </p>
                        ) : (
                          <div className="flow-root">
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
                              {cart?.map((product) => (
                                <li key={product.id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={product.image}
                                      alt={product.title}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>{product.title}</h3>
                                        <p className="ml-4">
                                          {`₹ ${product?.priceInINR}`}
                                        </p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">
                                        {product.color}
                                      </p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="flex items-center">
                                        <button
                                          type="button"
                                          className="flex items-center justify-center w-8 h-8 border rounded-full text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white"
                                          onClick={() =>
                                            decreaseQuantity(
                                              product.id,
                                              product.quantity
                                            )
                                          }
                                        >
                                          <Minus className="w-5 h-5" />
                                        </button>
                                        <p className="mx-4 text-gray-500">
                                          Qty {product.quantity}
                                        </p>
                                        <button
                                          type="button"
                                          className="flex items-center justify-center w-8 h-8 border rounded-full text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white"
                                          onClick={() =>
                                            increaseQuantity(
                                              product.id,
                                              product.quantity
                                            )
                                          }
                                        >
                                          <Plus className="w-5 h-5" />
                                        </button>
                                      </div>
                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                          onClick={() =>
                                            removeFromCart(product.id)
                                          }
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      {cart.length > 0 && (
                        <>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Subtotal</p>
                            <p> {`₹ ${totalPrice}`}</p>{" "}
                          </div>
                          <div className="mt-6 flex justify-evenly">
                            <Button
                              size="lg"
                              color="primary"
                              onClick={handleCheckout}
                              className="rounded-md"
                            >
                              Checkout
                            </Button>
                            <Button
                              onClick={clearWholeCart}
                              size="lg"
                              color="danger"
                              className="rounded-md"
                            >
                              Clear Cart
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
