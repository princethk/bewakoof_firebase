/**
 * ProductSkeleton component represents a skeleton placeholder for product items.
 * @returns {JSX.Element} The JSX element representing the product skeleton.
 */
function ProductSkeleton() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-2 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {[1, 2, 3, 4].map((_, index) => (
            <div
              key={index}
              className="animate-pulse group relative cursor-pointer shadow-2xl p-4 rounded-lg"
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80"></div>
              <div className="mt-4 flex flex-col justify-between gap-2">
                <div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductSkeleton;
