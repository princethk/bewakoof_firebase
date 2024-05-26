import { useFormik } from "formik";
import useOrders from "../hooks/use-orders";
import { orderFormValidationSchema } from "../utils/validation-schemas";
import useCart from "../hooks/use-cart";

/**
 * OrderForm component represents a form for entering order details.
 * @returns {JSX.Element|null} The JSX element representing the order form.
 */
function OrderForm() {
  const { isOrderFormOpen, closeOrderForm, addMultipleOrders } = useOrders();
  const { cart, clearWholeCart } = useCart();

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      address: "",
      city: "",
      postcode: "",
    },
    validationSchema: orderFormValidationSchema,
    onSubmit: handlePlaceOrder,
  });

  function handlePlaceOrder(values) {
    // Add the form values to each item in the cart
    const ordersWithDetails = cart.map((item) => ({
      ...item,
      customerDetails: values,
    }));

    // Pass the updated array to addMultipleOrders
    addMultipleOrders(ordersWithDetails);
    closeOrderForm();
    clearWholeCart();
    formik.resetForm();
  }

  if (!isOrderFormOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[500000] bg-black bg-opacity-50">
      <div className="relative bg-white shadow-lg rounded-lg w-full max-w-lg mx-4 sm:mx-auto overflow-hidden">
        <div className="absolute top-0 right-0 p-2">
          <button
            onClick={closeOrderForm}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <form className="px-6 py-8" onSubmit={formik.handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Full Name"
              className={`w-full rounded-md border ${
                formik.touched.name && formik.errors.name
                  ? "border-red-500"
                  : "border-gray-300"
              } bg-white py-3 px-4 text-sm text-gray-700 focus:outline-none focus:border-indigo-500`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.name}
              </div>
            ) : null}
          </div>
          <div className="mb-6">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder="Phone Number"
              className={`w-full rounded-md border ${
                formik.touched.phone && formik.errors.phone
                  ? "border-red-500"
                  : "border-gray-300"
              } bg-white py-3 px-4 text-sm text-gray-700 focus:outline-none focus:border-indigo-500`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.phone}
              </div>
            ) : null}
          </div>
          <div className="mb-6">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Street address"
              className={`w-full rounded-md border ${
                formik.touched.address && formik.errors.address
                  ? "border-red-500"
                  : "border-gray-300"
              } bg-white py-3 px-4 text-sm text-gray-700 focus:outline-none focus:border-indigo-500`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
            />
            {formik.touched.address && formik.errors.address ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.address}
              </div>
            ) : null}
          </div>
          <div className="flex -mx-2 mb-6">
            <div className="w-1/2 px-2">
              <input
                type="text"
                name="city"
                id="city"
                placeholder="City"
                className={`w-full rounded-md border ${
                  formik.touched.city && formik.errors.city
                    ? "border-red-500"
                    : "border-gray-300"
                } bg-white py-3 px-4 text-sm text-gray-700 focus:outline-none focus:border-indigo-500`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
              />
              {formik.touched.city && formik.errors.city ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.city}
                </div>
              ) : null}
            </div>
            <div className="w-1/2 px-2">
              <input
                type="text"
                name="postcode"
                id="postcode"
                placeholder="Postcode"
                className={`w-full rounded-md border ${
                  formik.touched.postcode && formik.errors.postcode
                    ? "border-red-500"
                    : "border-gray-300"
                } bg-white py-3 px-4 text-sm text-gray-700 focus:outline-none focus:border-indigo-500`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.postcode}
              />
              {formik.touched.postcode && formik.errors.postcode ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.postcode}
                </div>
              ) : null}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-6 font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}

export default OrderForm;
