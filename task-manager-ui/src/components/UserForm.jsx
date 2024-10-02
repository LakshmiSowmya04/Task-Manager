// UserForm.js
import React, { useState } from "react";
import { backendApi } from "../config.js";
const UserForm = ({ setShowUser }) => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and sign up
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState(""); // For sign up
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    //user is trying to register
    if (!isLogin) {
      const userData = {
        username,
        email,
        password,
      };

      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/user/register",
          {
            method: "POST", // Use POST method for registration
            headers: {
              "Content-Type": "application/json", // Indicate that we are sending JSON
            },
            body: JSON.stringify(userData), // Convert userData to JSON string
          },
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json(); // Parse the response JSON
        console.log("User registered successfully:", data);
      } catch (error) {
        console.error("Registration failed:", error);
      }
      setPassword("");
      setUsername("");
      setEmail("");
      setIsLogin(!isLogin);
      return;
    } else {
      const credentials = {
        email,
        password,
      };

      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/user/login",
          {
            method: "POST", // Use POST method for login
            headers: {
              "Content-Type": "application/json", // Indicate that we are sending JSON
            },
            body: JSON.stringify(credentials), // Convert credentials to JSON string
          },
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json(); // Parse the response JSON
        console.log("User logged in successfully:", data);

        // You can save the token or user info to local storage or state here
        localStorage.setItem("token", data.token); // Assuming your API returns a token
      } catch (error) {
        console.error("Login failed:", error);
      }
    }
    setShowUser(false); // Hide the user form after successful login/signup
  };

  return (
    <div className="user-form">
      <h2 className="text-2xl font-semibold text-gray-800">
        {isLogin ? "Login" : "Sign Up"}
      </h2>
      <form onSubmit={handleSubmit} className="mt-4">
        {!isLogin && (
          <input
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded-md p-2 mb-2"
          />
        )}
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded-md p-2 mb-2"
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded-md p-2 mb-2"
        />
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white rounded-md p-2"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>
      <button
        onClick={() => setIsLogin(!isLogin)} // Toggle between login and signup
        className="mt-4 text-blue-500 underline"
      >
        {isLogin
          ? "Need an account? Sign Up"
          : "Already have an account? Login"}
      </button>
    </div>
  );
};

export default UserForm;
