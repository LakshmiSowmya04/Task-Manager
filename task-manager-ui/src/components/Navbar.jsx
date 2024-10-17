import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaProjectDiagram, FaTasks, FaSignOutAlt } from "react-icons/fa"; // Import the icons
import Dashboard_icon from ".././assets/icons/dashboard-icon.svg"
import Project_icon from ".././assets/icons/project-icon.svg"
import Task_icon from ".././assets/icons/task-icon.svg"
import Notification_icon from ".././assets/icons/notification-icon.svg"
import Logout_icon from ".././assets/icons/logout-icon.svg"
import useResponsive from "../hooks/useResponsive";
import { MdMenu } from "react-icons/md";


export default function Navbar({ token, setToken }) {
  const {isMobile} = useResponsive();
  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <nav className="md:text-3xl  text-gray-700 rounded-lg shadow-md flex flex-col gap-3 items-start w-max min-w-[14vw] h-full bg-white backdrop-blur-md lg:ml-0  sm: ml-20vw">
      <p className=" text-black p-2 text-2xl w-full font-inria-serif flex justify-center border-bottom-black">{isMobile ? <MdMenu /> : "Task Manager"}</p>
      
      {token ? (
        <div className="flex flex-col justify-between h-full w-full py-2 space-y-4 font-inria-serif">
          <div className="flex flex-col gap-3">
          <NavLink to="/dashboard"  className={({isActive})=>`${isActive && "link active"} p-2 font-light flex w-full text-base items-center gap-2 `}>
           <img src={Dashboard_icon} className="aspect-square w-6" alt="dashboard icon" /> <span>Dashboard</span> 
          </NavLink>
          <NavLink to="/project" className={({isActive})=>`${isActive && "link active"} p-2 font-light flex w-full text-base items-center gap-2 `}>
           <img src={Project_icon} className="aspect-square w-6" alt="project icon" /> <span>Project</span> 
          </NavLink>
           <NavLink to="/task" className={({isActive})=>`${isActive && "link active"} p-2 font-light flex w-full text-base items-center gap-2 `}>
           <img src={Task_icon} className="aspect-square w-6" alt="task icon" /> <span>Task</span> 
          </NavLink>
           <NavLink to="/notification" className={({isActive})=>`${isActive && "link active"} p-2 font-light flex w-full text-base items-center gap-2 `}>
           <img src={Notification_icon} className="aspect-square w-6" alt="notification icon" /> <span>Notification</span> 
          </NavLink>
          </div>
          <div className="border-top-black w-full flex items-center p-2">
            <p
              className="flex text-base justify-center gap-3 cursor-pointer"
              onClick={handleLogout}
            >
              <img src={Logout_icon} className="aspect-square w-6" alt="logout icon" /> <span> Logout </span>
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col space-y-4">
          <NavLink to="/login" className="font-light">Login</NavLink>
          <NavLink to="/signup" className="font-light">Signup</NavLink>
        </div>
      )}
    </nav>
  );
}
