/**
 * LoadingComponent displays a loading indicator while content is being loaded.
 * @returns {JSX.Element} The JSX element representing the loading indicator.
 */
function LoadingComponent() {
  return (
    <section className="min-h-screen min-w-[100vw] grid place-items-center">
      <div className="loader"></div>
    </section>
  );
}

export default LoadingComponent;
