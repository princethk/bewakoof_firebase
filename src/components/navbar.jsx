import { Badge, Button, Input } from "@nextui-org/react";
import { CircleUser, Search, ShoppingBasket, ShoppingCart } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import useCart from "../hooks/use-cart";
import Logo from "./logo";
import useAuth from "../hooks/use-auth";
import { LogOut } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useModal } from "../hooks/use-modal";

/**
 * Navbar component represents the navigation bar of the application.
 * @returns {JSX.Element} The JSX element representing the navigation bar.
 */
export default function Navbar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { showCart, totalItems } = useCart();
  const {
    auth: { isAuthenticated },
    logout,
  } = useAuth();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const { openModal } = useModal();

  /**
   * Handles changes in the search input.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event object.
   */
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setSearchParams({ q: e.target.value }); // Update search params
  };

  return (
    <nav className="bg-[#fcd936] bg-opacity-90 backdrop-blur-md text-white shadow-2xl sticky top-0 z-[1000]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/">
          <Logo className="lg:w-28 w-20" />
        </Link>
        <div className="relative hidden md:block">
          <Input
            classNames={{
              base: "w-[20rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper: "h-full font-normal text-default-500",
            }}
            placeholder="Search for products"
            size="sm"
            startContent={<Search />}
            type="search"
            variant="solid"
            value={searchTerm} // Use state variable for search term
            onChange={handleSearchChange}
          />
        </div>
        <div className="">
          {isAuthenticated ? (
            <>
              <Badge
                content={totalItems}
                color="primary"
                className="border-none"
              >
                <Button
                  onClick={() => showCart()}
                  startContent={<ShoppingCart className="font-bold" />}
                  className="bg-transparent text-black rounded-sm font-semibold"
                >
                  <span className="lg:inline hidden">Cart</span>
                </Button>
              </Badge>
              <Button
                as={Link}
                to={"/orders"}
                startContent={<ShoppingBasket />}
                className="bg-transparent text-black rounded-sm font-semibold"
              >
                <span className="lg:inline hidden">Orders</span>
              </Button>
              <Button
                onClick={openModal}
                startContent={<LogOut />}
                className="bg-transparent text-black rounded-sm font-semibold"
              >
                <span className="lg:inline hidden">Logout</span>
              </Button>
            </>
          ) : (
            <Button
              as={Link}
              startContent={<CircleUser />}
              className="bg-transparent text-white rounded-sm font-semibold"
              to={"/login"}
            >
              <span className="lg:inline hidden">Login</span>
            </Button>
          )}
        </div>

        <div
          className="items-center justify-between  w-full md:flex md:w-auto md:order-1"
          id="navbar-search"
        >
          <div className="relative mt-3 md:hidden">
            <Input
              classNames={{
                base: "max-w-full h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper: "h-full font-normal text-default-500",
              }}
              placeholder="Search for products, brands and more..."
              size="sm"
              startContent={<Search />}
              type="search"
              variant="flat"
              value={searchTerm} // Use state variable for search term
              onChange={handleSearchChange}
              style={{ border: "none", outline: "none" }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
