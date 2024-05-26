import { useEffect } from "react";
import useOrders from "../hooks/use-orders";
import LoadingComponent from "../components/loading-component";
import ErrorComponent from "../components/error-component";

/**
 * Orders component fetches and displays the user's orders along with customer information.
 *
 * @component
 * @returns {JSX.Element} The rendered Orders component.
 */
function Orders() {
  const { fetchUserAllOrders, orders, fetchingOrders, errorFetching } =
    useOrders();

  useEffect(() => {
    fetchUserAllOrders();
  }, []);

  if (fetchingOrders) return <LoadingComponent />; // Show loading component while fetching orders

  if (errorFetching || orders?.length === 0)
    return <ErrorComponent errorTitle="No orders found" />; // Show error component if there's an error fetching orders

  return (
    <section className="relative flex justify-center items-center bg-gray-50 py-8">
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-6 mx-auto">
        <h2 className="font-manrope font-semibold text-4xl mb-6 leading-10 text-black text-center">
          Orders
        </h2>
        <div className="main-box border border-gray-200 rounded-xl pt-6 px-4 md:px-6 lg:px-8 bg-white shadow-sm">
          {orders?.map((order, idx) => (
            <div
              key={idx}
              className="flex flex-col lg:flex-row items-start lg:items-center p-6 border-b border-gray-600 gap-6 w-full"
            >
              <div className="img-box w-full max-w-[140px] mx-auto lg:mx-0">
                <img
                  src={order.image}
                  alt={order.title}
                  className="aspect-square w-full rounded-lg object-cover"
                />
              </div>
              <div className="flex flex-col lg:flex-row items-start lg:items-center w-full gap-4">
                <div className="w-full">
                  <h2 className="font-semibold text-xl leading-8 text-black mb-2">
                    {order.title}
                  </h2>
                  <p className="font-normal text-md leading-8 text-gray-500 mb-2">
                    Category:{" "}
                    <span className="capitalize">{order.category}</span>
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <p className="font-medium text-lg leading-7 text-black">
                      Qty:{" "}
                      <span className="text-gray-800">{order.quantity}</span>
                    </p>
                    <p className="font-medium text-lg leading-7 text-black">
                      Price:{" "}
                      <span className="text-gray-800">{`₹ ${order.priceInINR}`}</span>
                    </p>
                  </div>
                </div>
                <div className="customer-info w-full lg:w-auto lg:ml-6 mt-4 lg:mt-0">
                  <h3 className="font-semibold text-lg mb-2">
                    Customer Information
                  </h3>
                  <p className="font-medium text-sm">
                    Name:{" "}
                    <span className="text-gray-700">
                      {order.customerDetails.name}
                    </span>
                  </p>
                  <p className="font-medium text-sm">
                    Phone:{" "}
                    <span className="text-gray-700">
                      {order.customerDetails.phone}
                    </span>
                  </p>
                  <p className="font-medium text-sm">
                    Address:{" "}
                    <span className="text-gray-700">
                      {order.customerDetails.address}
                    </span>
                  </p>
                  <p className="font-medium text-sm">
                    City:{" "}
                    <span className="text-gray-700">
                      {order.customerDetails.city}
                    </span>
                  </p>
                  <p className="font-medium text-sm">
                    Postcode:{" "}
                    <span className="text-gray-700">
                      {order.customerDetails.postcode}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Orders;
