import { Link, useNavigate } from 'react-router-dom'
import { backendApi } from '../config'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login_hero from '../assets/login-hero.svg'
import { useState } from 'react'
import ThemeToggle from './ThemeToggle'
// import { set } from "mongoose";

export default function Login({ setToken }) {
  const navigate = useNavigate()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleLogin(e) {
    e.preventDefault()
    setError(false)
    setLoading(true)
    const email = e.target.email.value
    const password = e.target.password.value

    try {
      const response = await fetch(backendApi + '/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const Data = await response.json()
      console.log(response)

      if (response.ok) {
        let { data } = Data
        setToken(data.token)
        localStorage.setItem('token', data.token)
        toast.success('Login successful!')
        navigate('/dashboard')
      } else {
        setError(true)
        toast.error(Data.error || 'Login failed. Please try again.')
      }
    } catch (err) {
      setError(true)
      toast.error('Network error. Please try again later.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-w-screen h-screen flex w-full bg-white dark:bg-gray-900 transition-colors duration-500">
      <ThemeToggle />
      <div className="min-w-[50%] bg-secondary-dark dark:bg-primary hidden items-center justify-center lg:flex transition-colors duration-500">
        <div className="min-w-max text-center">
          <picture>
            <img src={Login_hero} alt="login img" className="drop-shadow-lg" />
          </picture>
          <h1 className="text-4xl font-bold text-white mt-6">
            Get organized and stay focused
          </h1>
          <h2 className="text-2xl text-gray-200 mt-2">
            Log in to manage your time like a pro!
          </h2>
        </div>
      </div>
      <div className="flex items-center justify-center w-full bg-white dark:bg-gray-900 transition-colors duration-500">
        <div className="md:mt-0 lg:min-w-[75%] sm:min-w-full">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-3xl mb-10 font-bold text-center font-inria-serif leading-tight tracking-tight text-gray-900 dark:text-gray-100 md:text-3xl lg:mb-0 transition-colors duration-500">
              Welcome Back!
            </h1>

            {error && (
              <div className="bg-red-100 dark:bg-red-900 border-l-4 border-red-500 text-red-700 dark:text-red-200 px-4 py-2 rounded-md shadow-sm">
                Please check email or password
              </div>
            )}

            <form
              className="space-y-5 md:space-y-4"
              action="#"
              onSubmit={handleLogin}
            >
              <div>
                <input
                  name="email"
                  id="email"
                  type="email"
                  autoFocus
                  className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-xl block w-full px-4 py-2 focus:ring-primary-600 focus:border-primary-600 focus:shadow-md focus:outline-none transition-all duration-300 ease-in-out"
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <input
                  name="password"
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-xl block w-full px-4 py-2 focus:ring-primary-600 focus:border-primary-600 focus:shadow-md focus:outline-none transition-all duration-300 ease-in-out"
                  required={true}
                />
              </div>

              <div>
                <Link
                  to="/reset-password"
                  className="relative inline-block text-blue-500 dark:text-blue-400 mt-3 before:content-[''] before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-[2px] before:bg-blue-400 dark:before:bg-blue-500 before:transition-all before:duration-300 hover:before:w-full"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className={`w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium rounded-3xl text-sm px-5 py-2 text-center transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-300 ${
                  loading
                    ? 'bg-blue-400 cursor-not-allowed opacity-70'
                    : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="w-4 h-4 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    Logging in...
                  </span>
                ) : (
                  'Login'
                )}
              </button>

              <p className="text-sm font-light text-center text-gray-500 dark:text-gray-400 transition-colors duration-500">
                Don't have an account yet?{' '}
                <Link
                  to="/signup"
                  className="relative inline-block font-medium text-primary-600 dark:text-primary-400 before:content before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-[2px] before:bg-gray-500 dark:before:bg-gray-400 before:transition-all before:duration-300 hover:before:w-full"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
