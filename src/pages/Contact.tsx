
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { toast } from 'sonner';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success('Thank you for your message! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-foodie-50 to-white py-16">
          <div className="foodie-container text-center">
            <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Contact Us
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Have questions, feedback, or want to partner with us? We'd love to hear from you. Get in touch with our team.
            </p>
          </div>
        </section>
        
        {/* Contact Information */}
        <section className="py-12">
          <div className="foodie-container">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm">
                <div className="mb-4 rounded-full bg-foodie-100 p-3">
                  <Mail className="h-6 w-6 text-foodie-600" />
                </div>
                <h3 className="mb-2 font-semibold">Email Us</h3>
                <p className="text-gray-600">
                  contact@foodiefinder.com<br />
                  support@foodiefinder.com
                </p>
              </div>
              
              <div className="flex flex-col items-center rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm">
                <div className="mb-4 rounded-full bg-foodie-100 p-3">
                  <Phone className="h-6 w-6 text-foodie-600" />
                </div>
                <h3 className="mb-2 font-semibold">Call Us</h3>
                <p className="text-gray-600">
                  +91 11 2345 6789<br />
                  Mon-Fri, 9:00 AM - 6:00 PM IST
                </p>
              </div>
              
              <div className="flex flex-col items-center rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm">
                <div className="mb-4 rounded-full bg-foodie-100 p-3">
                  <MapPin className="h-6 w-6 text-foodie-600" />
                </div>
                <h3 className="mb-2 font-semibold">Visit Us</h3>
                <p className="text-gray-600">
                  123 Food Street, Tech Park<br />
                  Bengaluru, Karnataka 560001<br />
                  India
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Form */}
        <section className="py-12">
          <div className="foodie-container">
            <div className="mx-auto max-w-2xl rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:p-8">
              <h2 className="mb-6 text-center text-2xl font-semibold text-gray-900">
                Send Us a Message
              </h2>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-foodie-500 focus:outline-none focus:ring-1 focus:ring-foodie-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-foodie-500 focus:outline-none focus:ring-1 focus:ring-foodie-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="mb-1 block text-sm font-medium text-gray-700">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-foodie-500 focus:outline-none focus:ring-1 focus:ring-foodie-500"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Customer Support</option>
                    <option value="business">Business Partnership</option>
                    <option value="feedback">Feedback</option>
                    <option value="bug">Report a Bug</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="mb-1 block text-sm font-medium text-gray-700">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-foodie-500 focus:outline-none focus:ring-1 focus:ring-foodie-500"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-foodie-500 px-6 py-3 font-medium text-white shadow-md transition-colors hover:bg-foodie-600 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>Processing</>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>
        
        {/* Map Section */}
        <section className="py-12">
          <div className="foodie-container">
            <div className="overflow-hidden rounded-lg border border-gray-200 h-96">
              {/* Placeholder for a real map */}
              <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                <p className="text-gray-600">Map would be displayed here in production</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
