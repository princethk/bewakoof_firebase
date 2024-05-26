import Logo from "./logo";

/**
 * Footer component represents the footer section of the application.
 * @returns {JSX.Element} The JSX element representing the footer.
 */
export default function Footer() {
  return (
    <footer className="w-full bg-[#fcd936] p-3 shadow-2xl">
      <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-[#fcd936] text-center md:justify-between">
        <Logo isLight={false} />
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
          <li>
            <p
              as="a"
              href="#"
              color="blue-gray"
              className=" transition-colors hover:text-blue-500 focus:text-blue-500 font-bold"
            >
              About Us
            </p>
          </li>
          <li>
            <p
              as="a"
              href="#"
              color="blue-gray"
              className="font-bold transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              License
            </p>
          </li>
          <li>
            <p
              as="a"
              href="#"
              color="blue-gray"
              className="font-bold transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Contribute
            </p>
          </li>
          <li>
            <p
              as="a"
              href="#"
              color="blue-gray"
              className="font-bold transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Contact Us
            </p>
          </li>
        </ul>
      </div>
      <hr className="my-8 border-blue-gray-50" />
      <p color="blue-gray" className="text-center font-bold flex items-center justify-center">
        <span>&copy; {new Date().getFullYear()} Bewakoof </span><span><img src="https://images.bewakoof.com/web/ic-web-head-bwk-primary-logo-eyes.svg" alt="Bewakoof Logo " /></span>
      </p>
    </footer>
  );
}
