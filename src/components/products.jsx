import { Button, Tab, Tabs } from "@nextui-org/react";
import { Gem, LayoutGrid, Plug, Shirt } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useCart from "../hooks/use-cart";
import { fetchProducts, selectProducts } from "../redux/slices/product-slice";
import ErrorComponent from "./error-component";
import ProductSkeleton from "./product-skeleton";

/**
 * Component to display products categorized into tabs
 * @returns {JSX.Element} Products component JSX
 */
export default function Products() {
  const { addToCart } = useCart();
  const dispatch = useDispatch();
  const { products, isLoading, error } = useSelector(selectProducts);
  const [selectedTab, setSelectedTab] = useState("all");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  /**
   * Handles adding a product to the cart
   * @param {Object} product - Product to add to cart
   */
  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
  };

  const filteredProducts =
    selectedTab === "all"
      ? products
      : products.filter(
          (product) => product.category?.toLowerCase() === selectedTab
        );

  if (isLoading) return <ProductSkeleton />;

  if (error)
    return (
      <ErrorComponent
        errorTitle={"Error fetching products"}
        errorSubtitle={"Try after sometime"}
      />
    );

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        {/* Tabs for different product categories */}
        <div className="flex justify-center lg:overflow-hidden overflow-x-auto">
          <Tabs
            // size={window.innerWidth <= 700 ? "sm" : "lg"}
            aria-label="Options"
            color="primary"
            variant="underlined"
            classNames={{
              tabList:
                "gap-6 w-full relative rounded-none p-0 border-b border-divider",
              cursor: "w-full bg-[#1865c4]",
              tab: "max-w-fit px-0 h-12",
              tabContent: "group-data-[selected=true]:text-[#1865c4]",
            }}
            className="font-bold lg:p-0 md:p-0 pl-80 pr-10 xs:p-[26rem]"
            defaultSelectedKey={selectedTab}
            onSelectionChange={(key) => setSelectedTab(key)}
          >
            {/* Tabs for different product categories */}
            <Tab
              key="all"
              title={
                <div className="flex items-center space-x-2">
                  <LayoutGrid />
                  <span>All</span>
                </div>
              }
            />
            <Tab
              key="men's clothing"
              title={
                <div className="flex items-center space-x-2">
                  <Shirt />
                  <span>Men's Clothing</span>
                </div>
              }
            />
            <Tab
              key="women's clothing"
              title={
                <div className="flex items-center space-x-2">
                  <Shirt />
                  <span>Women's Clothing</span>
                </div>
              }
            />
            <Tab
              key="jewelery"
              title={
                <div className="flex items-center space-x-2">
                  <Gem />
                  <span>Jewelery</span>
                </div>
              }
            />
            <Tab
              key="electronics"
              title={
                <div className="flex items-center space-x-2">
                  <Plug />
                  <span>Electronics</span>
                </div>
              }
            />
          </Tabs>
        </div>
        {/* Display products */}
        <div className="mt-6 grid grid-cols-1 gap-x-2 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {filteredProducts.map((product, index) => (
            <section
              key={index}
              className="group relative cursor-pointer shadow-2xl p-4 rounded-lg flex flex-col gap-4"
            >
              {/* Link to product details page */}
              <Link to={`/product/${product.id}`}>
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.image}
                    alt={product.title?.substring(10)}
                    className="object-cover object-center lg:h-full lg:w-full transition-transform duration-500 transform hover:scale-105"
                  />
                </div>
                <div className="mt-4 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={product.href}>
                        <span className="absolute inset-0 truncate" />
                        {product.title.substring(0, 30)}...
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 capitalize">
                      {product.category}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900 ">
                    {`₹ ${product?.priceInINR}`}
                  </p>
                </div>
              </Link>
              {/* Button to add product to cart */}
              <Button
                variant="bordered"
                color="default"
                onClick={() => handleAddToCart(product)}
              >
                Add To Cart
              </Button>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
