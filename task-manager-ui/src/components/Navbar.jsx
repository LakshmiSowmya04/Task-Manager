import { NavLink } from 'react-router-dom'
import {
  FaTachometerAlt,
  FaProjectDiagram,
  FaTasks,
  FaSignOutAlt,
} from 'react-icons/fa'
import Dashboard_icon from '../assets/icons/dashboard-icon.svg'
import Project_icon from '../assets/icons/project-icon.svg'
import Task_icon from '../assets/icons/task-icon.svg'
import Notification_icon from '../assets/icons/notification-icon.svg'
import Logout_icon from '../assets/icons/logout-icon.svg'
import useResponsive from '../hooks/useResponsive'
import { MdMenu } from 'react-icons/md'
import ThemeToggle from './ThemeToggle'

export default function Navbar({ token, setToken }) {
  const { isMobile } = useResponsive()
  const handleLogout = () => {
    setToken(null)
    localStorage.removeItem('token')
  }

  return (
    <nav className="mt-6 ml-6 flex flex-col h-full bg-white dark:bg-gray-800 shadow-lg p-4 rounded-lg w-64">
      {/* Top section with title and theme toggle */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {isMobile ? <MdMenu /> : 'Task Manager'}
        </p>
        <ThemeToggle />
      </div>

      {/* Navigation Links */}
      {token ? (
        <div className="flex flex-col space-y-4">
          {/* Dashboard Link */}
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${isActive ? 'bg-blue-500 text-white' : 'text-gray-700 dark:text-gray-200'} p-3 rounded-lg flex items-center gap-3 hover:bg-blue-200 dark:hover:bg-blue-600 transition-colors duration-200`
            }
          >
            <img
              src={Dashboard_icon}
              className="w-6 h-6"
              alt="dashboard icon"
            />
            <span>Dashboard</span>
          </NavLink>

          {/* Project Link */}
          <NavLink
            to="/project"
            className={({ isActive }) =>
              `${isActive ? 'bg-blue-500 text-white' : 'text-gray-700 dark:text-gray-200'} p-3 rounded-lg flex items-center gap-3 hover:bg-blue-200 dark:hover:bg-blue-600 transition-colors duration-200`
            }
          >
            <img src={Project_icon} className="w-6 h-6" alt="project icon" />
            <span>Project</span>
          </NavLink>

          {/* Task Link */}
          <NavLink
            to="/task"
            className={({ isActive }) =>
              `${isActive ? 'bg-blue-500 text-white' : 'text-gray-700 dark:text-gray-200'} p-3 rounded-lg flex items-center gap-3 hover:bg-blue-200 dark:hover:bg-blue-600 transition-colors duration-200`
            }
          >
            <img src={Task_icon} className="w-6 h-6" alt="task icon" />
            <span>Task</span>
          </NavLink>

          {/* Notification Link */}
          <NavLink
            to="/notification"
            className={({ isActive }) =>
              `${isActive ? 'bg-blue-500 text-white' : 'text-gray-700 dark:text-gray-200'} p-3 rounded-lg flex items-center gap-3 hover:bg-blue-200 dark:hover:bg-blue-600 transition-colors duration-200`
            }
          >
            <img
              src={Notification_icon}
              className="w-6 h-6"
              alt="notification icon"
            />
            <span>Notification</span>
          </NavLink>
        </div>
      ) : (
        <div className="flex flex-col space-y-4">
          {/* Login and Signup Links */}
          <NavLink
            to="/login"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-500 transition-colors duration-200"
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-500 transition-colors duration-200"
          >
            Signup
          </NavLink>
        </div>
      )}
    </nav>
  )
}
