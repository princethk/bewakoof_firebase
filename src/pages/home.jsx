import Carousel from "../components/carousel";
import Products from "../components/products";

/**
 * HomePage component renders the main content for the home page.
 * It includes a carousel, product listings, and an order form.
 *
 * @component
 * @returns {JSX.Element} The rendered HomePage component.
 */
function HomePage() {
  return (
    <section>
      <Carousel /> {/* Renders the carousel component */}
      <Products /> {/* Renders the products component */}
    </section>
  );
}

export default HomePage;
