import { Link, useNavigate } from "react-router-dom";
import { backendApi } from "../config";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();

  async function handleSignUp(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const username = e.target.username.value;

    if (!email || !password || !username) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch(`${backendApi}/api/v1/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, username }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Registration successful! Please log in.");
        navigate("/login");
      } else if (data.message) {
        //fix backend user unique email or unique username
        if (data.message.includes("E11000") && data.message.includes("email")) {
          toast.error("User with this email already exists.");
        }
      }
    } catch (error) {
      // Handlin network errors or other unexpected issues
      toast.error("Something went wrong. Please try again later.");
      console.error("Sign-up error:", error);
    }
  }
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="w-full bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0 shadow-3xl">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Create a new account
          </h1>
          <form
            className="space-y-4 md:space-y-6"
            action="#"
            onSubmit={handleSignUp}
          >
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your username
              </label>
              <input
                type="username"
                name="username"
                id="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="username"
                required=""
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="name@company.com"
                required=""
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                minLength={6}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required=""
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-400 hover:bg-blue-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Sign Up
            </button>
            <p className="text-sm font-light text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-primary-600 hover:underline"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
