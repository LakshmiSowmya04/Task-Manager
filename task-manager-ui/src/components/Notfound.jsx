import NotFound from "../assets/not-found.png";
import { Link } from "react-router-dom";

export default function Notfound() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-gray-100">
      <img
        src={NotFound}
        alt="Not Found"
        className="w-1/2 md:w-[300px] aspect-square pointer-events-none"
      />
      <h1 className="text-2xl md:text-3xl font-semibold mt-6 text-gray-800">
        Oops! Page Not Found
      </h1>
      <p className="text-gray-600 mt-2 text-center max-w-md">
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </p>
      <Link
        to="/dashboard"
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Go Back to Dashboard
      </Link>
    </div>
  );
}
