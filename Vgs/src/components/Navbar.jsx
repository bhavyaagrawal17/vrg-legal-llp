import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Scale, Menu, X, ChevronDown, GraduationCap, Briefcase } from "lucide-react";
import logo from "../assets/logo.jpg";

const Navbar = ({ activeSection = 'home', disabled = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isJoinUsDropdownOpen, setIsJoinUsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent all interactions when disabled
  const handleClick = (callback) => {
    if (disabled) return;
    callback();
  };

  const handleLinkClick = (e) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
  };

  // Dynamic classes based on disabled state
  const getNavLinkClass = (isActive) => {
    const baseClass = "relative font-medium transition-colors";
    const activeClass = isActive ? "text-amber-400 border-b-2 border-amber-400 pb-1" : "text-white hover:text-amber-400";
    const disabledClass = disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "";
    return `${baseClass} ${activeClass} ${disabledClass}`;
  };

  const getMobileLinkClass = (isActive) => {
    const baseClass = "block font-medium transition-colors";
    const activeClass = isActive ? "text-amber-400 border-l-4 border-amber-400 pl-3" : "text-white hover:text-amber-400";
    const disabledClass = disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "";
    return `${baseClass} ${activeClass} ${disabledClass}`;
  };

  const getJoinUsButtonClass = () => {
    const baseClass = "bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 px-6 py-2 rounded-full font-bold hover:from-amber-500 hover:to-amber-600 transition-all duration-300 transform hover:scale-105 flex items-center space-x-1";
    const disabledClass = disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "";
    return `${baseClass} ${disabledClass}`;
  };

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
          <div className={`flex items-center space-x-4 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
  <img src={logo} alt="VRG Legal Logo" className="h-16 w-auto object-contain" />
  <h1 className="text-3xl font-bold text-white">
    VRG Legal <span className="text-amber-400">LLP</span>
  </h1>
</div>


          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              to="/Home"
              onClick={handleLinkClick}
              className={getNavLinkClass(activeSection === 'home')}
            >
              Home
            </Link>
             <a
  href="#about"
  onClick={(e) => {
    e.preventDefault();
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  }}
  className={getNavLinkClass(activeSection === 'about')}
>
About Us
</a>
            
            <a
  href="#services"
  onClick={(e) => {
    e.preventDefault();
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  }}
  className={getNavLinkClass(activeSection === 'practice')}
>
  Services
</a>
            <a
  href="#team"
  onClick={(e) => {
    e.preventDefault();
    document.getElementById("team")?.scrollIntoView({ behavior: "smooth" });
  }}
  className={getNavLinkClass(activeSection === 'team')}
>
  Team
</a>
  <a
  href="#testimonials"
  onClick={(e) => {
    e.preventDefault();
    document.getElementById("testimonials")?.scrollIntoView({ behavior: "smooth" });
  }}
  className={getNavLinkClass(activeSection === 'testimonials')}
>
  Testimonials
</a>
            <a
  href="#contact"
  onClick={(e) => {
    e.preventDefault();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }}
  className={getNavLinkClass(activeSection === 'contact')}
>
  Contact Us
</a>
            {/* Join Us Dropdown */}
            <div className="relative">
              <button
                className={getJoinUsButtonClass()}
                onClick={() => handleClick(() =>
  setIsJoinUsDropdownOpen(!isJoinUsDropdownOpen)
)}

                disabled={disabled}
              >
                <span>Join Us</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {/* Dropdown Menu */}
              {isJoinUsDropdownOpen && !disabled && (
                <div 
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                  onMouseEnter={() => setIsJoinUsDropdownOpen(true)}
                  onMouseLeave={() => setIsJoinUsDropdownOpen(false)}
                >
                  <Link
                    to="/JoinUs?type=intern"
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                  >
                    <GraduationCap className="h-5 w-5 text-amber-600" />
                    <span>As an Intern</span>
                  </Link>
                  <Link
                    to="/JoinUs?type=advocate"
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                  >
                    <Briefcase className="h-5 w-5 text-amber-600" />
                    <span>As an Advocate</span>
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            className={`lg:hidden text-white p-2 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => handleClick(() => setIsMenuOpen(!isMenuOpen))}
            disabled={disabled}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && !disabled && (
        <div className="lg:hidden bg-slate-900 border-t border-slate-700">
          <div className="px-4 py-4 space-y-4">
            <Link
              to="/Home"
              className={getMobileLinkClass(activeSection === 'home')}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <a
              href="#about"
              className={getMobileLinkClass(activeSection === 'about')}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a
  href="#services"
  onClick={(e) => {
    e.preventDefault();
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  }}
  className={getNavLinkClass(activeSection === 'practice')}
>
  Services
</a>

            <a
              href="#attorneys"
              className={getMobileLinkClass(activeSection === 'attorneys')}
              onClick={() => setIsMenuOpen(false)}
            >
              Team
            </a>
            <a
              href="#contact"
              className={getMobileLinkClass(activeSection === 'contact')}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
            {/* Mobile Join Us Dropdown */}
            <div className="w-full">
              <button
                className={`w-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 px-6 py-3 rounded-full font-bold hover:from-amber-500 hover:to-amber-600 transition-all duration-300 flex items-center justify-center space-x-2 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => handleClick(() => setIsJoinUsDropdownOpen(!isJoinUsDropdownOpen))}
                disabled={disabled}
              >
                <span>Join Us</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {/* Mobile Dropdown Menu */}
              {isJoinUsDropdownOpen && !disabled && (
                <div className="mt-2 space-y-2">
                  <Link
                    to="/JoinUs?type=intern"
                    className="flex items-center space-x-3 px-4 py-3 text-white bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsJoinUsDropdownOpen(false);
                    }}
                  >
                    <GraduationCap className="h-5 w-5 text-amber-400" />
                    <span>As an Intern</span>
                  </Link>
                  <Link
                    to="/JoinUs?type=advocate"
                    className="flex items-center space-x-3 px-4 py-3 text-white bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsJoinUsDropdownOpen(false);
                    }}
                  >
                    <Briefcase className="h-5 w-5 text-amber-600" />
                    <span>As an Advocate</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;