import { Link } from "react-router-dom";

export default function Navbar({ token, setToken }) {
  return (
    <nav className="md:text-3xl p-6 text-white bg-black rounded-md shadow-md flex items-center justify-between fixed z-50 top-16 w-[90vw] right-[50%] translate-x-[50%]">
      <p className="font-bold">✅ Task Management App</p>
      {token ? (
        <div className="flex text-xl">
          <p
            className="font-bold cursor-pointer"
            onClick={() => {
              setToken(null);
              console.log(token);
              
              localStorage.removeItem("token");
            }}
          >
            Logout
          </p>
        </div>
      ) : (
        <div className="flex text-xl">
          <Link to={"/login"} className="font-bold">
            Login
          </Link>
          <p className="font-bold mx-1">|</p>
          <Link to={"/signup"} className="font-bold">
            Signup
          </Link>
        </div>
      )}
    </nav>
  );
}
