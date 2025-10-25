import { Link, useNavigate } from "react-router-dom";
import { backendApi } from "../config";
import { toast } from "react-toastify";
import ThemeToggle from "./ThemeToggle";

export default function Register() {
  const navigate = useNavigate();

  async function handleSignUp(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const username = e.target.username.value;

    const response = await fetch(backendApi + "/api/v1/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, username }),
    });

    if (response.ok) {
      navigate("/login");
    } else {
      const data = await response.json();
      toast.error(data.error);
    }
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-500 relative">
      <ThemeToggle />

      <div className="w-full bg-white dark:bg-gray-800 rounded-lg md:mt-0 sm:max-w-md xl:p-0 shadow-3xl transition-colors duration-500">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-2xl md:text-3xl font-semibold leading-snug text-gray-900 dark:text-gray-100 text-center transition-colors duration-500">
            Create your account
          </h1>

          <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSignUp}>
            <div>
              <input
                name="username"
                id="username"
                placeholder="Your name"
                className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-lg block w-full p-2.5 focus:ring-primary-600 focus:border-primary-600 focus:shadow-md focus:outline-none transition-all duration-300"
                required
              />
            </div>
            <div>
              <input
                name="email"
                id="email"
                placeholder="xyz@gmail.com"
                className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-lg block w-full p-2.5 focus:ring-primary-600 focus:border-primary-600 focus:shadow-md focus:outline-none transition-all duration-300"
                required
              />
            </div>
            <div>
              <input
                name="password"
                id="password"
                placeholder="Password"
                type="password"
                className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-lg block w-full p-2.5 focus:ring-primary-600 focus:border-primary-600 focus:shadow-md focus:outline-none transition-all duration-300"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow-md hover:shadow-xl transition-all duration-300 ease-in-out"
            >
              Sign Up
            </button>

            <p className="text-sm font-light text-gray-500 dark:text-gray-400 transition-colors duration-500 text-center">
              Already have an account?{" "}
              <Link
                to="/login"
                className="relative inline-block font-medium text-primary-600 dark:text-primary-400 before:content before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-[2px] before:bg-gray-500 dark:before:bg-gray-400 before:transition-all before:duration-300 hover:before:w-full"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}