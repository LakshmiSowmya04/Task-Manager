import { Link } from "react-router-dom";
import { FaTachometerAlt, FaProjectDiagram, FaTasks, FaSignOutAlt } from "react-icons/fa"; // Import the icons

export default function Navbar({ token, setToken }) {
  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <nav className="md:text-3xl p-8 text-gray-700 rounded-md shadow-md flex flex-col items-start fixed z-50 top-0 left-0 h-full w-72 bg-white backdrop-blur-md">
      <p className="font-bold text-black mb-4">Task Manager</p>
      
      {token ? (
        <div className="flex flex-col space-y-4">
          <hr className="border-black w-full block" />
          <Link to="/dashboard" className="font-light flex items-center transition-transform duration-300 hover:scale-105">
            <FaTachometerAlt className="mr-2" /> Dashboard
          </Link>
          <Link to="/projects" className="font-light flex items-center transition-transform duration-300 hover:scale-105">
            <FaProjectDiagram className="mr-2" /> Projects
          </Link>
          <Link to="/tasks" className="font-light flex items-center transition-transform duration-300 hover:scale-105">
            <FaTasks className="mr-2" /> Tasks
          </Link>
          <div className="mt-auto flex items-center">
            <p
              className="font-light cursor-pointer flex items-center transition-transform duration-300 hover:scale-105"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col space-y-4">
          <Link to="/login" className="font-light">Login</Link>
          <Link to="/signup" className="font-light">Signup</Link>
        </div>
      )}
    </nav>
  );
}
