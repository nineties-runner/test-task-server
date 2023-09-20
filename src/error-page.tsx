import { Link, useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      className="flex flex-col m-auto h-screen justify-center align-middle w-fit text-lg"
    >
      <h1 className="text-red-600 font-bold text-4xl">Oops!</h1>
      <p>404, page not found. :(</p>
      <Link
        to="/"
        type="button"
        className="mt-2 cursor-pointer bg-blue-600 text-white rounded-md w-fit py-1 px-4 font-bold italic"
      >
        Go back?
      </Link>
    </div>
  );
};

export default ErrorPage;
