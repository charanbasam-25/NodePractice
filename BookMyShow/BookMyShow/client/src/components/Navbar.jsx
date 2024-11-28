import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SignUp from "../pages/SignUp";

const Navbar = () => {
  const [isLoggedin, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setLoggedIn(false);
    navigate("/signup");
  };
  const isSignUpPage = location.pathname.includes("signup");
  useEffect(()=>{
    if(localStorage.getItem("jwtToken")){
      setLoggedIn(true);
    }
    
  },[isLoggedin]);
  console.log(isLoggedin,isSignUpPage,"logined, signuppage------")
  return (
    <nav className="bg-maroon text-white p-4 shadow-lg border-b-2 border-[#f2af08]">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Text-based Logo */}
        <div className="flex items-center">
          <Link
            to="/"
            className="text-4xl font-serif font-bold text-gold hover:text-yellow-300 transition-all duration-300"
          >
           OG Movies
           <p className="text-xs">Old Glod</p>
          </Link>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex space-x-8">
          <Link
            to="/"
            className="text-white hover:text-gold transition-all duration-300 text-lg"
          >
            Home
          </Link>
          {!isLoggedin && (
            <Link
              to="/login"
              className="text-white hover:text-gold transition-all duration-300 text-lg"
            >
              Login
            </Link>
          )}
          {(isLoggedin && !isSignUpPage) && (
            <div
              onClick={handleLogout}
              className="text-white hover:text-gold transition-all duration-300 text-lg"
            >
              Logout
            </div>
          )}
          {!isSignUpPage && (
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
            Admin Movies
          </Link>
          <Link
            to="/owner/theaters"
            className="text-white hover:text-gold transition-all duration-300 text-lg"
          >
            Owner Theaters
          </Link>
        </div>

        {/* Mobile Menu Button */}
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
