import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// --- SVG Icons ---
const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
);

const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
);


// --- Navigation Data ---
const navItems = [
    {
        name: 'AccelNet',
        dropdown: [
            { name: 'What is AccelNet?', path: '/AccelNet' },
            { name: 'Browse Actions', path: '/browse-actions' },
            { name: 'Participate', path: '/participate' },
        ],
    },
    {
        name: 'Funding',
        dropdown: [
            { name: 'Our Funding Model', path: '/funding-model' },
            { name: 'How to get funding', path: '/get-funding' },
        ],
    },
    { name: 'AccelNet', path: '/AccelNet' },
    {
        name: 'About',
        dropdown: [
            { name: 'What is AccelNet?', path: '/about' },
            { name: 'Structure', path: '/structure' },
            { name: 'Contact Us', path: '/contact' },
        ],
    },
];

// --- Navbar Component ---
const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const navRef = useRef(null);

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleMouseEnter = (index) => {
        if (window.innerWidth > 1024) { // Only on desktop
            setActiveDropdown(index);
        }
    };
    
    const handleMouseLeave = () => {
        if (window.innerWidth > 1024) {
            setActiveDropdown(null);
        }
    };

    const handleLinkClick = (index) => {
        if (activeDropdown === index) {
            setActiveDropdown(null);
        } else {
            setActiveDropdown(index);
        }
    };

    return (
        <div ref={navRef} className="w-full">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
                {navItems.map((item, index) => (
                    <div
                        key={item.name}
                        className="relative"
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <button onClick={() => item.path ? null : handleLinkClick(index)} className="flex items-center space-x-1 hover:text-teal-400 transition-colors duration-300 py-6">
                            <span>{item.name}</span>
                            {item.dropdown && <ChevronDownIcon />}
                        </button>
                        {item.dropdown && activeDropdown === index && (
                            <div className="absolute top-full left-0 bg-teal-500 text-black w-64 shadow-lg rounded-b-md py-2">
                                {item.dropdown.map((subItem) => (
                                    <Link
                                        key={subItem.name}
                                        to={subItem.path}
                                        className="block px-4 py-3 text-sm hover:bg-teal-600 hover:text-white transition-colors duration-200"
                                        onClick={() => setActiveDropdown(null)}
                                    >
                                        <span className="font-serif italic mr-2">&rsaquo;</span> {subItem.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </nav>
            
            <div className="hidden lg:flex items-center h-full">
                <Link to="/fund-your-network" className="bg-teal-500 text-black h-24 flex items-center px-6 hover:bg-teal-600 transition-colors duration-300 -mr-4">
                    <div>
                        <p className="font-bold">Open call</p>
                        <p className="text-sm">Fund your network</p>
                    </div>
                </Link>
            </div>

            {/* Icons and Mobile Menu Toggle */}
            <div className="flex items-center space-x-4">
                <button className="hidden lg:flex flex-col items-center hover:text-teal-400 transition-colors">
                    <SearchIcon />
                    <span className="text-xs mt-1">SEARCH</span>
                </button>
                <button className="hidden lg:flex flex-col items-center hover:text-teal-400 transition-colors">
                    <UserIcon />
                    <span className="text-xs mt-1">e-COST</span>
                </button>
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden flex flex-col items-center hover:text-teal-400 transition-colors">
                     <MenuIcon />
                     <span className="text-xs mt-1">MENU</span>
                </button>
            </div>

            {/* Mobile Navigation Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden bg-[#222] absolute top-24 left-0 w-full">
                    <nav className="flex flex-col p-4 space-y-2">
                         {navItems.map((item, index) => (
                            <div key={item.name}>
                                <button onClick={() => handleLinkClick(index)} className="w-full text-left flex justify-between items-center py-2 hover:text-teal-400">
                                   <span>{item.name}</span>
                                   {item.dropdown && <ChevronDownIcon />}
                                </button>
                                {item.dropdown && activeDropdown === index && (
                                     <div className="pl-4 pt-2 flex flex-col space-y-2">
                                        {item.dropdown.map(subItem => (
                                            <Link key={subItem.name} to={subItem.path} className="block py-1 hover:text-teal-400" onClick={() => setMobileMenuOpen(false)}>
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
        </div>
    );
};

export default Navbar;