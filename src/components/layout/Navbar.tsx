
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Heart, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  // Close mobile menu when changing routes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);
  
  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'Restaurants', path: '/restaurants' },
    { name: 'About', path: '/about' },
  ];
  
  return (
    <header 
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled 
          ? "glass-nav py-3 lg:py-4" 
          : "bg-transparent py-5 lg:py-6"
      )}
    >
      <div className="foodie-container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center transition-opacity hover:opacity-80">
          <span className="text-xl font-semibold text-gray-900 md:text-2xl">
            Foodie<span className="text-foodie-500">Finder</span>
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex lg:items-center lg:space-x-8">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "text-sm font-medium transition-colors",
                location.pathname === item.path
                  ? "text-foodie-600"
                  : "text-gray-700 hover:text-foodie-500"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        
        {/* Auth Desktop */}
        <div className="hidden items-center space-x-4 lg:flex">
          <Link
            to="/favorites"
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-foodie-600"
          >
            <Heart size={18} />
            <span>Favorites</span>
          </Link>
          
          <Link
            to="/auth"
            className="flex items-center gap-1.5 rounded-lg bg-foodie-500 px-4 py-2 text-sm font-medium text-white shadow-button transition-all hover:bg-foodie-600 active:bg-foodie-700"
          >
            <User size={18} />
            <span>Sign In</span>
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button
          className="flex items-center lg:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X size={24} className="text-gray-900" />
          ) : (
            <Menu size={24} className="text-gray-900" />
          )}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed bottom-0 right-0 top-0 z-40 w-full max-w-xs transform bg-white p-6 shadow-elevated transition-transform duration-300 ease-in-out lg:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          <div className="mb-8 flex items-center justify-between">
            <Link to="/" className="text-xl font-semibold" onClick={() => setIsOpen(false)}>
              Foodie<span className="text-foodie-500">Finder</span>
            </Link>
            <button onClick={toggleMenu} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
          
          <nav className="flex-1">
            <ul className="space-y-4">
              {navigationItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={cn(
                      "block py-2 text-base font-medium transition-colors",
                      location.pathname === item.path
                        ? "text-foodie-600"
                        : "text-gray-700 hover:text-foodie-500"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="space-y-3 pt-6">
            <Link
              to="/favorites"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-800 shadow-sm transition-colors hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              <Heart size={18} />
              <span>My Favorites</span>
            </Link>
            
            <Link
              to="/auth"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-foodie-500 px-4 py-2.5 text-sm font-medium text-white shadow-button transition-colors hover:bg-foodie-600"
              onClick={() => setIsOpen(false)}
            >
              <User size={18} />
              <span>Sign In</span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </header>
  );
};

export default Navbar;
