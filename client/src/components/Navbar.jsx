import { useState, useEffect } from "react";
import { Menu, X, AlertTriangle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-lg shadow-md"
          : "bg-gray-900/70 backdrop-blur-md"
      }`}
    >
      {/* MAIN NAVBAR CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center space-x-2"
          onClick={() => setIsOpen(false)}
        >
          <AlertTriangle
            className={`h-8 w-8 ${
              isScrolled ? "text-yellow-500" : "text-yellow-400"
            }`}
          />
          <span
            className={`text-xl font-bold ${
              isScrolled ? "text-gray-900" : "text-white"
            }`}
          >
            RescueApp!
          </span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center space-x-8">
          {[
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "About", path: "/about" },
            { name: "Contact", path: "/contact" },
          ].map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`${
                isScrolled
                  ? "text-gray-800 hover:text-yellow-500"
                  : "text-white hover:text-yellow-400"
              } font-medium transition-colors`}
            >
              {link.name}
            </Link>
          ))}

          {!isHome && (
            <Link to="/login">
              <button className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-md hover:bg-yellow-400 font-semibold transition-colors">
                Get Access
              </button>
            </Link>
          )}
        </div>

        {/* MOBILE MENU TOGGLE */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`${
              isScrolled ? "text-gray-900" : "text-white"
            } p-2 transition-colors`}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN (below navbar) */}
      <div
        className={`md:hidden absolute top-16 left-0 w-full bg-gray-900/95 backdrop-blur-md transform origin-top transition-all duration-300 ${
          isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
        }`}
        style={{ transformOrigin: "top" }}
      >
        <div className="flex flex-col py-4 space-y-2 text-white">
          {[
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "About", path: "/about" },
            { name: "Contact", path: "/contact" },
          ].map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block w-full text-left px-6 py-2 hover:bg-gray-800 transition-colors"
            >
              {link.name}
            </Link>
          ))}

          {!isHome && (
            <Link to="/login" onClick={() => setIsOpen(false)}>
              <span className="block w-32 mx-auto mt-2 px-4 py-2 bg-yellow-500 text-gray-900 font-semibold rounded-md hover:bg-yellow-400 transition-colors">
                Get Access
              </span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
