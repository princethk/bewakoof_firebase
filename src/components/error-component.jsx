/**
 * ErrorComponent displays an error message with a title, subtitle, and description.
 * @param {Object} props - The properties passed to the ErrorComponent.
 * @param {string} props.errorTitle - The title of the error.
 * @param {string} props.errorSubtitle - The subtitle or additional information about the error.
 * @param {string} props.errorDescription - The detailed description of the error.
 * @returns {JSX.Element} The JSX element representing the error component.
 */
function ErrorComponent({ errorTitle, errorSubtitle, errorDescription }) {
  return (
    <section className="grid place-items-center">
      <div className="items-center min-h-screen px-6 py-12 grid place-items-center">
        <div className="flex flex-col items-center max-w-sm mx-auto text-center">
          <p className="p-3 text-sm font-medium text-blue-500 rounded-full bg-blue-50 dark:bg-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
            {errorTitle}
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            {errorSubtitle}
          </p>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            {errorDescription}
          </p>
        </div>
      </div>
    </section>
  );
}

export default ErrorComponent;
