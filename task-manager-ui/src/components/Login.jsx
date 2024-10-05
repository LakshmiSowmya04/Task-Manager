import { Link, useNavigate } from "react-router-dom";
import { backendApi } from "../config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login({ setToken }) {
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch(`${backendApi}/api/v1/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        console.log(data)
        toast.success("Login successful!");
        navigate("/dashboard");
      } else if (data.message) {
        toast.error(data.message);
      } else {
        toast.error(
          data.error || "Login failed. Please check your credentials."
        );
      }
    } catch (error) {
      // Handle any network or unexpected errors
      toast.error("Something went wrong. Please try again later.");
      console.error("Login error:", error);
    }
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full bg-white rounded-lg shadow-lg sm:max-w-md p-6">
        <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
          Sign in to your account
        </h1>
        <form className="mt-4 space-y-4" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              minLength={6}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Sign in
          </button>

          <p className="text-sm font-light text-gray-500">
            Don't have an account yet?{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-600 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
