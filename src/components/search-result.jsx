import { Button } from "@nextui-org/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import useCart from "../hooks/use-cart";
import { fetchProducts, selectProducts } from "../redux/slices/product-slice";
import ErrorComponent from "./error-component";
import ProductSkeleton from "./product-skeleton";

/**
 * Component to display search results based on the query parameter 'q'
 * @returns {JSX.Element} SearchResult component JSX
 */
function SearchResult() {
  const [searchParams] = useSearchParams();
  const { addToCart } = useCart();
  const dispatch = useDispatch();
  const { products, isLoading, error } = useSelector(selectProducts);
  const searchTerm = searchParams.get("q");
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm)
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
  };

  if (isLoading)
    return (
      <div className="py-4">
        <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl text-center">
          Search Results
        </h1>
        <ProductSkeleton />
      </div>
    );

  if (error) {
    return (
      <ErrorComponent
        errorTitle={"Error fetching products"}
        errorSubtitle={"Try after sometime"}
      />
    );
  }

  return (
    <section className="mb-6">
      <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl text-center">
        Search Results
      </h1>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filteredProducts?.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredProducts.map((product, index) => (
                <section
                  key={index}
                  className="group relative cursor-pointer shadow-2xl p-4 rounded-lg flex flex-col gap-4"
                >
                  <Link to={`/product/${product.id}`} reloadDocument>
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
                        <p className="mt-1 text-sm text-gray-500">
                          {product.category}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-gray-900 ">
                        {`₹ ${product?.priceInINR}`}
                      </p>
                    </div>
                  </Link>
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
          ) : (
            <div className="flex justify-center items-center">
              <ErrorComponent errorTitle={"No search results found"} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default SearchResult;
