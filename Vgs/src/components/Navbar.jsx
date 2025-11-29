import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Scale,
  Menu,
  X,
  ChevronDown,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import logo from "../assets/logo.jpg";

const Navbar = ({
  activeSection = "home",
  disabled = false,
  formData = {},
  isSubmitting = false,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isJoinUsDropdownOpen, setIsJoinUsDropdownOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const isOnJoinUsPage = location.pathname === "/JoinUs";

  // Check unsaved form data
  const hasUnsavedData = Object.values(formData).some((v) => v);

  /** 🔥 BLOCK NAVIGATION IF FORM HAS DATA OR SUBMITTING */
  const handleProtectedNavigation = (e) => {
    if (!isOnJoinUsPage) return;

    if (isSubmitting) {
      e.preventDefault();
      alert("Your application is being submitted. Please wait...");
      return;
    }

    if (hasUnsavedData) {
      const confirmLeave = window.confirm(
        "If you leave this page, all entered data will be lost. Continue?"
      );
      if (!confirmLeave) {
        e.preventDefault();
      }
    }
  };

  /** ⭐ UNIVERSAL SCROLL FUNCTION (WORKS ON JOINUS + HOME) */
  const scrollToSection = (e, sectionId) => {
    // Apply data loss protection only on JoinUs
    if (isOnJoinUsPage) {
      handleProtectedNavigation(e);
      if (e.defaultPrevented) return;
    }

    if (!isOnJoinUsPage) {
      // Already on home → just scroll
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    // If on JoinUs → first navigate Home, then scroll
    navigate("/Home");

    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 400);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-900/95 backdrop-blur-sm shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link
            to="/Home"
            onClick={(e) => handleProtectedNavigation(e)}
            className="flex items-center space-x-4 cursor-pointer"
          >
            <img src={logo} alt="VRG Legal Logo" className="h-16 w-auto" />
            <h1 className="text-3xl font-bold text-white">
              VRG Legal <span className="text-amber-400">LLP</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 text-white">
            <Link
              to="/Home"
              onClick={(e) => handleProtectedNavigation(e)}
              className="hover:text-amber-400"
            >
              Home
            </Link>

            <button
              onClick={(e) => scrollToSection(e, "about")}
              className="hover:text-amber-400"
            >
              About Us
            </button>

            <button
              onClick={(e) => scrollToSection(e, "services")}
              className="hover:text-amber-400"
            >
              Services
            </button>

            <button
              onClick={(e) => scrollToSection(e, "team")}
              className="hover:text-amber-400"
            >
              Team
            </button>

            <button
              onClick={(e) => scrollToSection(e, "contact")}
              className="hover:text-amber-400"
            >
              Contact Us
            </button>

            {/* Join Us Dropdown */}
            <div className="relative">
              <button
                className="bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 px-6 py-2 rounded-full font-bold flex items-center gap-1"
                onClick={() =>
                  setIsJoinUsDropdownOpen(!isJoinUsDropdownOpen)
                }
              >
                Join Us <ChevronDown className="h-4 w-4" />
              </button>

              {isJoinUsDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2 z-50">
                  <Link
                    to="/JoinUs?type=intern"
                    onClick={(e) => handleProtectedNavigation(e)}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-amber-50"
                  >
                    <GraduationCap className="h-5 w-5 text-amber-600" />
                    <span>As an Intern</span>
                  </Link>

                  <Link
                    to="/JoinUs?type=advocate"
                    onClick={(e) => handleProtectedNavigation(e)}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-amber-50"
                  >
                    <Briefcase className="h-5 w-5 text-amber-600" />
                    <span>As an Advocate</span>
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-t border-slate-700">
          <div className="px-4 py-4 space-y-4">
            <Link
              to="/Home"
              onClick={(e) => {
                setIsMenuOpen(false);
                handleProtectedNavigation(e);
              }}
              className="block text-white"
            >
              Home
            </Link>

            <button
              onClick={(e) => {
                scrollToSection(e, "about");
                setIsMenuOpen(false);
              }}
              className="block text-white"
            >
              About Us
            </button>

            <button
              onClick={(e) => {
                scrollToSection(e, "services");
                setIsMenuOpen(false);
              }}
              className="block text-white"
            >
              Services
            </button>

            <button
              onClick={(e) => {
                scrollToSection(e, "team");
                setIsMenuOpen(false);
              }}
              className="block text-white"
            >
              Team
            </button>

            <button
              onClick={(e) => {
                scrollToSection(e, "contact");
                setIsMenuOpen(false);
              }}
              className="block text-white"
            >
              Contact Us
            </button>

            <Link
              to="/JoinUs?type=intern"
              onClick={(e) => handleProtectedNavigation(e)}
              className="block text-white bg-slate-800 px-4 py-3 rounded"
            >
              As an Intern
            </Link>

            <Link
              to="/JoinUs?type=advocate"
              onClick={(e) => handleProtectedNavigation(e)}
              className="block text-white bg-slate-800 px-4 py-3 rounded"
            >
              As an Advocate
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
