import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-linear-to-tr from-[#005c97] to-[#00cdac] flex items-center justify-center shadow-md">
                <span className="text-white font-extrabold text-lg">M</span>
              </div>
              <h2 className="text-2xl font-bold bg-linear-to-r from-[#005c97] to-[#00cdac] bg-clip-text text-transparent">
                MarketingPro
              </h2>
            </div>
          </Link>


          <ul className="hidden md:flex gap-8 items-center">
            <li>
              <Link
                to="/"
                className={`font-semibold transition duration-300 ${isActive("/")
                  ? "text-[#0083b0] border-b-2 border-[#0083b0] pb-1"
                  : "text-gray-700 hover:text-[#0083b0]"
                  }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className={`font-semibold transition duration-300 ${isActive("/services")
                  ? "text-[#0083b0] border-b-2 border-[#0083b0] pb-1"
                  : "text-gray-700 hover:text-[#0083b0]"
                  }`}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className={`font-semibold transition duration-300 ${isActive("/blog")
                  ? "text-[#0083b0] border-b-2 border-[#0083b0] pb-1"
                  : "text-gray-700 hover:text-[#0083b0]"
                  }`}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={`font-semibold transition duration-300 ${isActive("/contact")
                  ? "text-[#0083b0] border-b-2 border-[#0083b0] pb-1"
                  : "text-gray-700 hover:text-[#0083b0]"
                  }`}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className={`font-semibold transition duration-300 ${isActive("/login")
                  ? "text-[#0083b0] border-b-2 border-[#0083b0] pb-1"
                  : "text-gray-700 hover:text-[#0083b0]"
                  }`}
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="bg-linear-to-r from-[#005c97] to-[#00cdac] text-white px-6 py-2 rounded-lg font-semibold hover:from-[#004e80] hover:to-[#00b396] transition duration-300 shadow-md"
              >
                Get Started
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  className={`block font-semibold ${isActive("/") ? "text-[#0083b0]" : "text-gray-700"
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className={`block font-semibold ${isActive("/services") ? "text-[#0083b0]" : "text-gray-700"
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className={`block font-semibold ${isActive("/blog") ? "text-[#0083b0]" : "text-gray-700"
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={`block font-semibold ${isActive("/contact") ? "text-[#0083b0]" : "text-gray-700"
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="block bg-linear-to-r from-[#005c97] to-[#00cdac] text-white px-6 py-2 rounded-lg font-semibold text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className={`block font-semibold ${isActive("/login") ? "text-blue-600" : "text-gray-700"
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
