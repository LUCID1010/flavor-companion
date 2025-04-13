
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { MapPin, Utensils, Star, Users, Globe, Shield } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-foodie-50 to-white pt-32 pb-16">
          <div className="foodie-container text-center">
            <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
              About FoodieFinder
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Your ultimate guide to discovering authentic Indian restaurants across the country. From traditional thalis to modern fusion cuisine.
            </p>
          </div>
        </section>
        
        {/* Mission Section */}
        <section className="py-16">
          <div className="foodie-container">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <div>
                <span className="mb-2 inline-block rounded-full bg-foodie-100 px-3 py-1 text-sm font-medium text-foodie-800">
                  Our Mission
                </span>
                <h2 className="mb-6 text-2xl font-semibold text-gray-900 sm:text-3xl">
                  Connecting Food Lovers with Authentic Indian Cuisine
                </h2>
                <p className="mb-4 text-gray-600">
                  FoodieFinder was created with a simple mission: to help people discover and enjoy the rich, diverse world of Indian cuisine. We believe that food is not just sustenance—it's culture, tradition, and a way to bring people together.
                </p>
                <p className="text-gray-600">
                  Whether you're craving the spicy street food of Mumbai, the rich curries of Punjab, or the delicate flavors of South Indian dosas, our platform helps you find authentic restaurants that serve the real taste of India.
                </p>
              </div>
              <div className="relative rounded-lg overflow-hidden h-80 md:h-96">
                <img 
                  src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2036&q=80" 
                  alt="Indian cuisine" 
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="bg-gray-50 py-16">
          <div className="foodie-container">
            <div className="mb-12 text-center">
              <span className="mb-2 inline-block rounded-full bg-foodie-100 px-3 py-1 text-sm font-medium text-foodie-800">
                What We Offer
              </span>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900 sm:text-3xl">
                Features That Make Us Special
              </h2>
              <p className="mx-auto max-w-2xl text-gray-600">
                FoodieFinder provides a comprehensive platform to discover, explore, and enjoy Indian restaurants across the country.
              </p>
            </div>
            
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <MapPin className="mb-4 h-8 w-8 text-foodie-500" />
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Location-Based Search</h3>
                <p className="text-gray-600">
                  Find Indian restaurants near you with our advanced geolocation technology. Filter by distance to discover hidden gems in your neighborhood.
                </p>
              </div>
              
              <div className="rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <Utensils className="mb-4 h-8 w-8 text-foodie-500" />
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Regional Cuisine Filters</h3>
                <p className="text-gray-600">
                  Explore the diverse culinary landscape of India with our detailed regional cuisine filters, from North Indian to South Indian and everything in between.
                </p>
              </div>
              
              <div className="rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <Star className="mb-4 h-8 w-8 text-foodie-500" />
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Verified Reviews</h3>
                <p className="text-gray-600">
                  Make informed decisions with authentic reviews from real customers. Our community shares honest feedback about their dining experiences.
                </p>
              </div>
              
              <div className="rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <Users className="mb-4 h-8 w-8 text-foodie-500" />
                <h3 className="mb-2 text-lg font-semibold text-gray-900">User Profiles</h3>
                <p className="text-gray-600">
                  Create a personalized account to save your favorite restaurants, track your dining history, and get recommendations based on your preferences.
                </p>
              </div>
              
              <div className="rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <Globe className="mb-4 h-8 w-8 text-foodie-500" />
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Nationwide Coverage</h3>
                <p className="text-gray-600">
                  Our platform features restaurants from major cities across India, making it easy to discover Indian cuisine wherever you are.
                </p>
              </div>
              
              <div className="rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <Shield className="mb-4 h-8 w-8 text-foodie-500" />
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Quality Assurance</h3>
                <p className="text-gray-600">
                  We verify restaurant information and monitor reviews to ensure you get accurate, helpful information about each establishment.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Story Section */}
        <section className="py-16">
          <div className="foodie-container">
            <div className="mb-10 text-center">
              <span className="mb-2 inline-block rounded-full bg-foodie-100 px-3 py-1 text-sm font-medium text-foodie-800">
                Our Story
              </span>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900 sm:text-3xl">
                How FoodieFinder Began
              </h2>
            </div>
            
            <div className="mx-auto max-w-3xl">
              <p className="mb-4 text-gray-600">
                FoodieFinder was born out of a passion for Indian cuisine and a frustration with the lack of specialized platforms for finding authentic Indian restaurants. Our founder, a food enthusiast who traveled extensively across India, wanted to create a way for people to discover the incredible diversity of Indian cooking.
              </p>
              <p className="mb-4 text-gray-600">
                Starting in 2022 with just a handful of restaurant listings in major cities, we've grown to become India's largest database of Indian restaurants. Our team personally visits many of the restaurants we feature to ensure we're recommending places that truly represent the essence of Indian hospitality and culinary traditions.
              </p>
              <p className="mb-4 text-gray-600">
                Today, FoodieFinder helps thousands of people every day discover the perfect place for their next Indian meal. Whether you're a longtime lover of Indian food or trying it for the first time, our platform is designed to guide you to an unforgettable culinary experience.
              </p>
              <p className="text-gray-600">
                We remain committed to our original mission: celebrating the rich tapestry of Indian cuisine and making it accessible to everyone.
              </p>
            </div>
          </div>
        </section>
        
        {/* Join Us CTA */}
        <section className="bg-foodie-500 py-16 text-white">
          <div className="foodie-container text-center">
            <h2 className="mb-4 text-2xl font-semibold sm:text-3xl">
              Join Our Community of Food Lovers
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-white/90">
              Create an account to start discovering the best Indian restaurants, save your favorites, and share your experiences with fellow food enthusiasts.
            </p>
            <a 
              href="/auth" 
              className="inline-flex items-center rounded-lg bg-white px-6 py-3 font-medium text-foodie-600 shadow-sm transition-all hover:bg-gray-100"
            >
              Sign Up Now
            </a>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
