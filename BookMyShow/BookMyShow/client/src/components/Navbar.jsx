import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isLoggedin, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setLoggedIn(false);
    navigate("/login"); 
  };

  const isSignUpPage = location.pathname.includes("signup");
  const isLoginPage = location.pathname.includes("login");

  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      setLoggedIn(true);
    }
  }, [isLoggedin]);

  return (
    <nav className="bg-maroon text-white p-4 shadow-lg border-b-2 border-[#f2af08]">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link
            to="/"
            className="text-4xl font-serif font-bold text-gold hover:text-yellow-300 transition-all duration-300"
          >
            OG Movies
            <p className="text-xs">Old Gold</p>
          </Link>
        </div>
        <div className="hidden md:flex space-x-8">
          <Link
            to="/"
            className="text-white hover:text-gold transition-all duration-300 text-lg"
          >
            Home
          </Link>
          {!isLoggedin && (isSignUpPage || !isLoginPage) && (
            <Link
              to="/login"
              className="text-white hover:text-gold transition-all duration-300 text-lg"
            >
              Login
            </Link>
          )}
          {isLoggedin && (
            <div
              onClick={handleLogout}
              className="text-white hover:text-gold transition-all duration-300 text-lg"
            >
              Logout
            </div>
          )}
          {!isLoggedin && isLoginPage && (
            <Link
              to="/signup"
              className="text-white hover:text-gold transition-all duration-300 text-lg"
            >
              Sign Up
            </Link>
          )}

          <Link
            to="/profile/bookings"
            className="text-white hover:text-gold transition-all duration-300 text-lg"
          >
            Bookings
          </Link>
          <Link
            to="/admin/movies"
            className="text-white hover:text-gold transition-all duration-300 text-lg"
          >
            Movies
          </Link>
          <Link
            to="/owner/theaters"
            className="text-white hover:text-gold transition-all duration-300 text-lg"
          >
            Theaters
          </Link>
        </div>

        <div className="md:hidden flex items-center">
          <button className="text-white hover:text-gold focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
