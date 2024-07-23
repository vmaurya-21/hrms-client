import ErrorTest from "../Error/errorTest";

/**
 * @namespace pages
 */

/**
 * Home Component
 *
 * This is the home page of the application.
 *
 * @component
 * @memberof pages
 * @example
 * // Example usage:
 * <Home />
 *
 * @returns {JSX.Element} The rendered home page component
 */
export const Home = () => {
  return (
    <>
      <div className="text-center text-2xl">Hello world..</div>;
      {/* <ErrorTest/> */}
    </>
  )
};
