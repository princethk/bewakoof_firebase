import { Carousel } from "@material-tailwind/react";

/**
 * Component for displaying a carousel with custom navigation.
 * @returns {JSX.Element} The JSX element for the CarouselCustomNavigation component.
 */
export default function CarouselCustomNavigation() {
  // Array of carousel images
  const carouselImages = [
    "/b-1.webp",
    "/b-2.webp",
    "/b-3.webp",
    "/b-4.webp",
  ];

  return (
    // Carousel component from Material Tailwind
    <Carousel loop autoplay className="rounded-xl lg:h-60 h-36">
      {/* Mapping through carousel images and rendering them */}
      {carouselImages.map((image, index) => (
        <img
          key={index}
          src={`/image/carousel/${image}`}
          alt={`${image}-${index}`}
          className="h-full w-full object-cover"
        />
      ))}
    </Carousel>
  );
}
