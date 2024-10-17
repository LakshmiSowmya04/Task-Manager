import { Link, useNavigate } from "react-router-dom";
import { backendApi } from "../config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login_hero from "../assets/login-hero.svg";
import { useState } from "react";

export default function Login({ setToken }) {
  const navigate = useNavigate();
  const [error, setError] = useState(false)
  
  async function handleLogin(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const response = await fetch(backendApi + "/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const Data = await response.json();
    console.log(response)
    if (response.ok) {
      let {data} = Data;
      console.log('data', data)
      setToken(data.token);
      localStorage.setItem("token", data.token);
      navigate("/");
    } else {
      console.log("data", Data);
      setError(true)
      toast.error(Data.error);
    }
  }
  return (
    <div className="min-w-screen h-screen flex w-full">
      <div className="min-w-[50%] bg-secondary-dark hidden items-center justify-center lg:flex">
        <div className="min-w-max">
          <picture>
            <img src={Login_hero} alt="login img" />
          </picture>
          <h1 className="text-4xl font-bold text-white">
            Get organized and stay focused
          </h1>
          <h1 className="text-2xl text-gray-100">
            log in to manage your time like a pro!
          </h1>
        </div>
      </div>
      <div className="flex items-center justify-center w-full bg-white">
      <div className="  md:mt-0 lg:min-w-[75%] sm: min-w-full">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-3xl mb-10 font-bold text-center font-inria-serif leading-tight tracking-tight text-gray-900 md:text-3xl lg:mb-0">
            Welcome Back!
          </h1>

          {error && <div className="error bg-red-200 p-1 border-l-red-500 border-s-4">Please check email or password</div>}
          
          <form
            className="space-y-5 md:space-y-4"
            action="#"
            onSubmit={handleLogin}
          >
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-primary-600 focus:border-primary-600 block w-full px-4 py-2"
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
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-primary-600 focus:border-primary-600 block w-full px-4 py-2"
                required=""
              />
            </div>
            <div className="text-blue-400 mt-3">
            <Link to={"/reset-password"}>Forgot password?</Link>
            </div>
            
            <button
              type="submit"
              className="w-full bg-primary hover:bg-blue-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-3xl text-sm px-5 py-2 text-center"
            >
              Login
            </button>
            <p className="text-sm font-light text-center text-gray-500">
              Don't have an account yet?{" "}
              <Link
                to="/signup"
                className="font-medium text-primary-600 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>

      </div>
    </div>
  );
}
