import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Search } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const navLinks = [
    { 
      path: "/about", 
      label: "About", 
      dropdown: true,
      items: [
        { path: "/vision-mission", label: "Vision and Mission" },
        { path: "/background", label: "Background" },
        { path: "/scientific-program", label: "Scientific Program" }
      ]
    },
    { 
      path: "/structure", 
      label: "Structure", 
      dropdown: true,
      items: [
        { path: "/steering-committee", label: "Steering Committee" },
        { path: "/advisory-board", label: "Advisory Board" },
        { path: "/student-network", label: "AccelNet Student Network" },
        { path: "/interactive-map", label: "Interactive Map" },
        { 
          path: "/participants", 
          label: "Participants",
          subItems: [
            "Science",
            "Engineering", 
            "Art",
            "Humanities",
            "Industry",
            "Government", 
            "Media"
          ]
        }
      ]
    },
    { path: "/working-groups", label: "Working Groups" },
    { path: "/activities", label: "Activities" },
    { path: "/news", label: "News" },
    { path: "/events", label: "Events" },
  ];

  const renderDropdown = (link) => (
    <div key={link.path} className="relative group">
      <button className="flex items-center space-x-1 text-blue-800 hover:text-blue-600 font-semibold transition-colors">
        <span>{link.label}</span>
        <i className="fa fa-caret-down text-sm"></i>
      </button>
      <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-100 z-50">
        <div className="py-2">
          {link.items.map((item) => (
            item.subItems ? (
              <div key={item.path} className="relative sub-dropdown group">
                <Link 
                  to={item.path} 
                  className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                >
                  <span>{item.label}</span>
                  <i className="fa fa-caret-right text-xs"></i>
                </Link>
                <div className="absolute left-full top-0 ml-1 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-100">
                  <div className="py-2">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem}
                        to={`/participants/${subItem.toLowerCase()}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                      >
                        {subItem}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
              >
                {item.label}
              </Link>
            )
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <img 
              src="/brain.svg"
              alt="AccelNet Logo"
              className="h-10 w-10 md:h-12 md:w-12"
            />
            <h1 className="text-xl md:text-2xl font-bold text-blue-900">AccelNet</h1>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              link.dropdown ? (
                renderDropdown(link)
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-blue-800 hover:text-blue-600 font-semibold transition-colors"
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/search" 
              className="text-blue-800 hover:text-blue-600 transition-colors"
              aria-label="Search"
            >
              <Search className="size-6" />
            </Link>

            {/* Auth Links */}
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/login" className="text-blue-800 hover:text-blue-600 font-medium transition-colors">
                Login
              </Link>
              <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow hover:shadow-lg">
                Sign Up
              </Link>
            </div>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-1 text-blue-800 hover:text-blue-600 transition-colors"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <Menu className="size-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 w-full bg-white shadow-lg border-t border-gray-200 md:hidden">
            <div className="container mx-auto px-6 py-4 space-y-3">
              {navLinks.map((link) => (
                link.dropdown ? (
                  <div key={link.path} className="space-y-2">
                    <div className="font-semibold text-blue-800 py-2">{link.label}</div>
                    <div className="pl-4 space-y-2 border-l-2 border-blue-100">
                      {link.items.map((item) => (
                        item.subItems ? (
                          <div key={item.path} className="space-y-2">
                            <Link
                              to={item.path}
                              className="block py-2 text-blue-700 font-medium"
                              onClick={closeMobileMenu}
                            >
                              {item.label}
                            </Link>
                            <div className="pl-4 space-y-1 border-l-2 border-blue-50">
                              {item.subItems.map((subItem) => (
                                <Link
                                  key={subItem}
                                  to={`/participants/${subItem.toLowerCase()}`}
                                  className="block py-1 text-sm text-gray-600 hover:text-blue-600"
                                  onClick={closeMobileMenu}
                                >
                                  {subItem}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <Link
                            key={item.path}
                            to={item.path}
                            className="block py-2 text-gray-600 hover:text-blue-600 transition-colors"
                            onClick={closeMobileMenu}
                          >
                            {item.label}
                          </Link>
                        )
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="block py-2 text-blue-800 hover:text-blue-600 font-medium transition-colors"
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </Link>
                )
              ))}
              
              {/* Mobile Auth Links */}
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <Link 
                  to="/login" 
                  className="block py-2 text-blue-800 hover:text-blue-600 font-medium transition-colors"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg text-center transition-colors"
                  onClick={closeMobileMenu}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;