import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isLoggedin, setLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu visibility
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu visibility
  };

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

        {/* Desktop menu */}
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

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu} // Toggle the menu on button click
            className="text-white hover:text-gold focus:outline-none"
          >
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

      {/* Slide-out menu for mobile */}
      <div
        className={`md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 transition-transform transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="bg-maroon text-white p-6 w-64 h-full">
          <button
            onClick={toggleMenu}
            className="text-white hover:text-gold mb-4"
          >
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
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>

          <Link
            to="/"
            className="block text-white hover:text-gold transition-all duration-300 text-lg mb-4"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>

          {!isLoggedin && (isSignUpPage || !isLoginPage) && (
            <Link
              to="/login"
              className="block text-white hover:text-gold transition-all duration-300 text-lg mb-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          )}
          {isLoggedin && (
            <div
              onClick={handleLogout}
              className="block text-white hover:text-gold transition-all duration-300 text-lg mb-4"
            >
              Logout
            </div>
          )}
          {!isLoggedin && isLoginPage && (
            <Link
              to="/signup"
              className="block text-white hover:text-gold transition-all duration-300 text-lg mb-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign Up
            </Link>
          )}

          <Link
            to="/profile/bookings"
            className="block text-white hover:text-gold transition-all duration-300 text-lg mb-4"
            onClick={() => setIsMenuOpen(false)}
          >
            Bookings
          </Link>
          <Link
            to="/admin/movies"
            className="block text-white hover:text-gold transition-all duration-300 text-lg mb-4"
            onClick={() => setIsMenuOpen(false)}
          >
            Movies
          </Link>
          <Link
            to="/owner/theaters"
            className="block text-white hover:text-gold transition-all duration-300 text-lg mb-4"
            onClick={() => setIsMenuOpen(false)}
          >
            Theaters
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
