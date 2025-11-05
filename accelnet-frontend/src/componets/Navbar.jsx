import { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Menu, Search } from "lucide-react";
import { useAuthStore } from "../store/authUser";
// Removed useContentStore as it's no longer used

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    // Added sticky, top-0, z-50 for a modern sticky header
    <header className="bg-white/80 backdrop-blur-sm shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 relative">
        <div className="flex items-center justify-between">
          
          {/* Logo and Brand Name */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/brain.svg"
              alt='logo'
              className="h-12 w-12"
            />
            <h1 className="text-2xl font-bold text-blue-900">AccelNet</h1>
          </Link>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <a href="#about" className="text-blue-800 hover:text-blue-600 font-medium transition">About</a>
            <a href="#structure" className="text-blue-800 hover:text-blue-600 font-medium transition">Structure</a>
            <a href="#working-groups" className="text-blue-800 hover:text-blue-600 font-medium transition">Working Groups</a>
            <a href="#activities" className="text-blue-800 hover:text-blue-600 font-medium transition">Activities</a>
            <a href="#news" className="text-blue-800 hover:text-blue-600 font-medium transition">News</a>
          </div>

          {/* Search, Auth, and Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            <Link to={"/search"} className="text-blue-800 hover:text-blue-600">
              <Search className='size-6 cursor-pointer' />
            </Link>

            {user ? (
              // Show Avatar and Logout if user is logged in
              <>
                <img src={user.image} alt='Avatar' className='h-8 w-8 rounded-full cursor-pointer' />
                <LogOut className='size-6 cursor-pointer text-blue-800' onClick={logout} />
              </>
            ) : (
              // Show Login and Sign Up if user is logged out (on desktop)
              <>
                <Link to="/login" className="text-blue-800 hover:text-blue-600 font-medium transition hidden md:block">
                  Login
                </Link>
                <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg hidden md:block">
                  Sign Up
                </Link>
              </>
            )}
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Menu className="size-6 cursor-pointer text-blue-800" onClick={toggleMobileMenu} />
            </div>
          </div>
        </div>

        {/* Mobile Menu (Dropdown) */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 w-full bg-white shadow-lg md:hidden flex flex-col p-4 space-y-2 border-t border-gray-200">
            <a href="#about" className="text-blue-800 hover:text-blue-600 p-2 rounded" onClick={toggleMobileMenu}>About</a>
            <a href="#structure" className="text-blue-800 hover:text-blue-600 p-2 rounded" onClick={toggleMobileMenu}>Structure</a>
            <a href="#working-groups" className="text-blue-800 hover:text-blue-600 p-2 rounded" onClick={toggleMobileMenu}>Working Groups</a>
            <a href="#activities" className="text-blue-800 hover:text-blue-600 p-2 rounded" onClick={toggleMobileMenu}>Activities</a>
            <a href="#news" className="text-blue-800 hover:text-blue-600 p-2 rounded" onClick={toggleMobileMenu}>News</a>
            
            {/* Mobile Auth Links */}
            <div className="border-t border-gray-200 pt-2 space-y-2">
              {!user && (
                <>
                  <Link to="/login" className="block text-blue-800 hover:text-blue-600 p-2 rounded" onClick={toggleMobileMenu}>
                    Login
                  </Link>
                  <Link to="/signup" className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-center" onClick={toggleMobileMenu}>
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;