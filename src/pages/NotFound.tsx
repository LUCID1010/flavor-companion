
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const NotFound: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex flex-1 items-center justify-center">
        <div className="foodie-container py-16 text-center">
          <div className="mx-auto max-w-lg">
            <h1 className="mb-6 text-6xl font-bold text-foodie-500">404</h1>
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">Page Not Found</h2>
            <p className="mb-8 text-gray-600">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/"
                className="rounded-lg bg-foodie-500 px-5 py-2.5 font-medium text-white shadow-button transition-all hover:bg-foodie-600 active:bg-foodie-700"
              >
                Go to Homepage
              </Link>
              <Link
                to="/restaurants"
                className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50"
              >
                Browse Restaurants
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
