
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 pt-12 pb-8">
      <div className="foodie-container">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          {/* Logo and description */}
          <div className="mb-6 md:mb-0 md:max-w-xs">
            <Link to="/" className="mb-4 inline-block text-xl font-semibold text-gray-900">
              Foodie<span className="text-foodie-500">Finder</span>
            </Link>
            <p className="mb-4 text-sm text-gray-600">
              Discover the best Indian restaurants in your area. FoodieFinder helps you find authentic Indian cuisine based on your preferences and location.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 transition-colors hover:text-foodie-500" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 transition-colors hover:text-foodie-500" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 transition-colors hover:text-foodie-500" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 transition-colors hover:text-foodie-500" aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Navigation links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:gap-12">
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase text-gray-500">Explore</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="text-gray-600 transition-colors hover:text-foodie-500">Home</Link></li>
                <li><Link to="/restaurants" className="text-gray-600 transition-colors hover:text-foodie-500">Restaurants</Link></li>
                <li><Link to="/favorites" className="text-gray-600 transition-colors hover:text-foodie-500">Favorites</Link></li>
                <li><Link to="/about" className="text-gray-600 transition-colors hover:text-foodie-500">About</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase text-gray-500">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="text-gray-600 transition-colors hover:text-foodie-500">About Us</Link></li>
                <li><Link to="/contact" className="text-gray-600 transition-colors hover:text-foodie-500">Contact Us</Link></li>
                <li><Link to="/restaurants" className="text-gray-600 transition-colors hover:text-foodie-500">Cuisine Types</Link></li>
                <li><a href="#" className="text-gray-600 transition-colors hover:text-foodie-500">For Restaurants</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase text-gray-500">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/terms-of-service" className="text-gray-600 transition-colors hover:text-foodie-500">Terms of Service</Link></li>
                <li><Link to="/privacy-policy" className="text-gray-600 transition-colors hover:text-foodie-500">Privacy Policy</Link></li>
                <li><Link to="/cookie-policy" className="text-gray-600 transition-colors hover:text-foodie-500">Cookie Policy</Link></li>
                <li><Link to="/contact" className="text-gray-600 transition-colors hover:text-foodie-500">Contact Us</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-200 pt-6">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} FoodieFinder. All rights reserved. Your guide to authentic Indian cuisine.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
