/**
 * Logo component displays the logo of the application.
 * @param {Object} props - The properties passed to the Logo component.
 * @param {string} [props.className="w-28"] - The CSS classes to apply to the logo image.
 * @param {boolean} [props.isLight=true] - A boolean indicating whether to use the light or dark version of the logo.
 * @returns {JSX.Element} The JSX element representing the logo.
 */
function Logo({ className = "w-28", isLight = true }) {
  return (
    <img
      src={isLight ? "/image/logo/logo-light.png" : "/image/logo/logo.png"}
      alt="smart-kart"
      className={className} u
    />
  );
}

export default Logo;
