import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import { Toaster } from "react-hot-toast";
import {
  Outlet,
  ScrollRestoration,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import LogoutConfirmationModal from "./components/confirm-logout-modal";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import OrderForm from "./components/order-form";
import SearchResult from "./components/search-result";
import ShoppingCart from "./components/shopping-cart";

/**
 * Main application component.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 */
function App() {
  const [searchParams] = useSearchParams();

  /**
   * Gets the search term from URL search parameters.
   *
   * @type {string|null}
   */
  const searchTerm = searchParams.get("q");

  /**
   * Hook to navigate programmatically.
   *
   * @type {function}
   */
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate}>
      <Navbar />
      <main className="p-4">
        {searchTerm?.trim?.() && <SearchResult />}
        <Outlet />
        <ShoppingCart />
      </main>
      <Footer />
      <ScrollRestoration />
      <Toaster />
      <OrderForm />
      <LogoutConfirmationModal />
    </NextUIProvider>
  );
}

export default App;
