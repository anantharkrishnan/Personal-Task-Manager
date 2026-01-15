import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../services/axiosInstance";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await axiosInstance.get("user/logout");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
     
      <h1 className="text-xl font-bold">
        <Link to="/">Task Manager</Link>
      </h1>

      
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

     
      <div
        className={`flex-col md:flex-row md:flex gap-4 items-center ${
          isOpen ? "flex" : "hidden"
        } md:flex`}
      >
        <Link to="/" className="hover:text-gray-300">
          Dashboard
        </Link>
        <Link to="/tasks" className="hover:text-gray-300">
          Task
        </Link>
        <Link to="/login" className="hover:text-gray-300">
          Login
        </Link>
        <Link to="/signup" className="hover:text-gray-300">
          Register
        </Link>
        <button
          onClick={logoutHandler}
          className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

