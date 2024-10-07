import { Link } from "react-router-dom";
import { FaTachometerAlt, FaProjectDiagram, FaTasks, FaSignOutAlt } from "react-icons/fa"; // Import the icons

export default function Navbar({ token, setToken }) {
  return (
    <nav className="md:text-3xl p-8 text-gray-700 rounded-md shadow-md flex flex-col items-start fixed z-50 top-0 left-0 h-full w-72 bg-white backdrop-blur-md">
      <p className="font-bold text-black mb-4">Task Manager</p> {/* Font thinner */}
      
      {token ? (
         frontend_branch_issue#1
        <div className="flex flex-col space-y-4">
          <hr className="border-black w-full block " />
          <br />
          <Link to="/dashboard" className="font-light flex items-center  transition-transform duration-300 hover:scale-105">
            <FaTachometerAlt className="mr-2" /> {/* Dashboard icon */}
            Dashboard
          </Link> <br />
          <Link to="/projects" className="font-light flex items-center  transition-transform duration-300 hover:scale-105">
            <FaProjectDiagram className="mr-2" /> {/* Projects icon */}
            Projects
          </Link> <br />
          <Link to="/tasks" className="font-light flex items-center transition-transform duration-300 hover:scale-105">
            <FaTasks className="mr-2" /> {/* Tasks icon */}
            Tasks
          </Link><br />
          <div className="mt-auto flex items-center "> {/* This will push the logout to the bottom */}
            <p
              className="font-light cursor-pointer flex items-center  transition-transform duration-300 hover:scale-105" // Font thinner for Logout
              onClick={() => {
                setToken(null);
                console.log(token);
                localStorage.removeItem("token");
              }}
            >
              <FaSignOutAlt className="mr-2" /> {/* Logout icon */}
              Logout
            </p>
          </div>
=======
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
 main
        </div>
      ) : (
        <div className="flex flex-col space-y-4">
          <Link to={"/login"} className="font-light">
            Login
          </Link>
          <Link to={"/signup"} className="font-light">
            Signup
          </Link>
        </div>
      )}
    </nav>
  );
}
