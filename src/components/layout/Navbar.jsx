import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

/* ---------- SVG Icons (inherit color) ---------- */
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
       viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
       viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
       viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6"  x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
       viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

/* ---------- Nav Data ---------- */
const navItems = [
  {
    name: 'AccelNet',
    dropdown: [
      { name: 'What is AccelNet?', path: '/AccelNet' },
      { name: 'Advisory Board', path: '/advisory-board' },
      { name: 'Interactive Map', path: '/interactive-map' },
      { name: 'Participants', path: '/participants' },
    ],
  },
  {
    name: 'Working Groups',
    dropdown: [
      { name: 'Brain Computer Interfaces (BCI)', path: '/bci' },
      { name: 'How to get funding', path: '/get-funding' },
      { name: 'Other Working Groups', path: '/working-groups' },
    ],
  },
  {
    name: 'About',
    dropdown: [
      { name: 'Vision and Mission', path: '/about' },
      { name: 'Scientific Program', path: '/structure' },
      { name: 'Contact Us', path: '/contact' },
    ],
  },
];

/* ---------- Component ---------- */
const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [hiddenOnScroll, setHiddenOnScroll] = useState(false);
  const lastY = useRef(0);
  const navRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      const delta = y - (lastY.current || 0);
      // small threshold to avoid jitter
      if (Math.abs(delta) > 4) {
        setHiddenOnScroll(delta > 0 && y > 60); // hide when scrolling down past 60px
        lastY.current = y;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleMouseEnter = (i) => { if (window.innerWidth > 1024) setActiveDropdown(i); };
  const handleMouseLeave = () => { if (window.innerWidth > 1024) setActiveDropdown(null); };
  const handleLinkClick  = (i) => setActiveDropdown(prev => prev === i ? null : i);

  return (
    // FIXED, FULL-BLEED HEADER (no white space)
    <header
      ref={navRef}
      className={[
        "fixed top-0 left-0 right-0 w-screen z-50",
        "bg-gradient-to-b from-gray-800 to-blue-800",
        "transform transition-transform duration-300",     // for slide hide/show
        hiddenOnScroll ? "-translate-y-[110%]" : "translate-y-0"
      ].join(' ')}
    >
      <div className="max-w-7xl mx-auto px-8">
        {/* Bar height defines the header height */}
        <div className="h-24 flex items-center justify-between">
          {/* LEFT: wordmark */}
          <Link to="/" className="flex flex-col leading-tight text-white">
            <span className="font-bold text-lg tracking-wide">AccelNet</span>
            <span className="text-xs text-gray-200">Accelerating Research Collaboration</span>
          </Link>

          {/* CENTER: nav (keeps your gray hover) */}
          <nav className="hidden lg:flex items-center space-x-12 text-white font-semibold uppercase tracking-wide">
            {navItems.map((item, index) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => (item.path ? null : handleLinkClick(index))}
                  className="flex items-center space-x-1 py-8 hover:text-gray-500 transition-colors"
                >
                  <span>{item.name}</span>
                  {item.dropdown && <ChevronDownIcon />}
                </button>

                {item.dropdown && activeDropdown === index && (
                  <div className="absolute left-0 top-full w-64 bg-blue-400 text-white rounded-b-lg shadow-lg py-3 z-50">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.path}
                        className="block px-5 py-2 hover:bg-gray-300/30"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <span className="mr-2 font-serif text-lg">&rsaquo;</span>
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* RIGHT: icons — white by default, darken on hover */}
          <div className="flex items-center space-x-8">
            <button className="hidden lg:flex flex-col items-center text-white hover:text-gray-500 transition-colors">
              <SearchIcon />
              <span className="text-xs mt-1">SEARCH</span>
            </button>
            <Link to="/login" className="hidden lg:flex flex-col items-center text-white hover:text-gray-500 transition-colors" aria-label='Login'>
              <UserIcon />
              <span className="text-xs mt-1">Join Us!</span>
            </Link>
            {/* Mobile toggle */}
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="lg:hidden flex flex-col items-center text-white hover:text-gray-500 transition-colors"
            >
              <MenuIcon />
              <span className="text-xs mt-1">MENU</span>
            </button>
            {/* Desktop MENU icon (optional) */}
            <button className="hidden lg:flex flex-col items-center text-white hover:text-gray-500 transition-colors">
              <MenuIcon />
              <span className="text-xs mt-1">MENU</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#222] text-white">
          <nav className="flex flex-col p-4 space-y-2">
            {navItems.map((item, index) => (
              <div key={item.name}>
                <button
                  onClick={() => handleLinkClick(index)}
                  className="w-full text-left flex justify-between items-center py-2 hover:text-blue-400"
                >
                  <span>{item.name}</span>
                  {item.dropdown && <ChevronDownIcon />}
                </button>
                {item.dropdown && activeDropdown === index && (
                  <div className="pl-4 pt-2 flex flex-col space-y-2">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.path}
                        className="block py-1 hover:text-blue-400"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;