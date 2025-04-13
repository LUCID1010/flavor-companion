
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const CookiePolicy: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 py-24">
        <div className="foodie-container">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-6 text-3xl font-bold text-gray-900">Cookie Policy</h1>
            
            <div className="prose prose-foodie max-w-none">
              <p>Last updated: April 13, 2023</p>
              
              <h2>1. Introduction</h2>
              <p>
                FoodieFinder ("we," "our," or "us") uses cookies and similar technologies on our website and mobile applications (collectively, the "Service"). By using the Service, you consent to the use of cookies as described in this Cookie Policy.
              </p>
              
              <h2>2. What Are Cookies</h2>
              <p>
                Cookies are small pieces of text sent to your browser when you visit a website. They serve a variety of functions, such as enabling us to remember certain information you provide to us as you navigate between pages on the Service.
              </p>
              <p>
                We use both session cookies and persistent cookies. Session cookies expire when you close your browser, while persistent cookies remain on your device until they expire or are deleted.
              </p>
              
              <h2>3. Types of Cookies We Use</h2>
              
              <h3>3.1 Essential Cookies</h3>
              <p>
                These cookies are necessary for the Service to function and cannot be switched off in our systems. They are usually only set in response to actions you take, such as setting your privacy preferences, logging in, or filling in forms. You can set your browser to block these cookies, but this may cause some parts of the site to not work properly.
              </p>
              
              <h3>3.2 Performance Cookies</h3>
              <p>
                These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our Service. They help us know which pages are the most and least popular and how visitors navigate around the site. All information these cookies collect is aggregated and anonymous.
              </p>
              
              <h3>3.3 Functionality Cookies</h3>
              <p>
                These cookies enable the Service to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages. If you do not allow these cookies, some or all of these services may not function properly.
              </p>
              
              <h3>3.4 Targeting Cookies</h3>
              <p>
                These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant advertisements on other sites. They do not store directly personal information but are based on uniquely identifying your browser and internet device.
              </p>
              
              <h2>4. Third-Party Cookies</h2>
              <p>
                In addition to our own cookies, we may also use various third-party cookies to report usage statistics, deliver advertisements, and so on. These cookies may include:
              </p>
              <ul>
                <li>Analytics cookies (e.g., Google Analytics) to help us understand how visitors interact with our Service</li>
                <li>Social media cookies (e.g., Facebook, Twitter) to enable you to share content on social media platforms</li>
                <li>Advertising cookies to deliver personalized advertisements</li>
              </ul>
              
              <h2>5. How to Manage Cookies</h2>
              <p>
                Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience, as it will no longer be personalized to you.
              </p>
              <p>
                Below are links to instructions on how to manage cookies in popular web browsers:
              </p>
              <ul>
                <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
                <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a></li>
                <li><a href="https://support.microsoft.com/en-us/help/17442/windows-internet-explorer-delete-manage-cookies" target="_blank" rel="noopener noreferrer">Internet Explorer</a></li>
                <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
              </ul>
              
              <h2>6. Do Not Track Signals</h2>
              <p>
                Some browsers incorporate a Do Not Track (DNT) feature that signals to websites you visit that you do not want to have your online activity tracked. Our Service does not currently respond to DNT signals. For more information about DNT signals, please visit <a href="https://allaboutdnt.com" target="_blank" rel="noopener noreferrer">All About DNT</a>.
              </p>
              
              <h2>7. Changes to This Cookie Policy</h2>
              <p>
                We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "Last updated" date.
              </p>
              <p>
                You are advised to review this Cookie Policy periodically for any changes. Changes to this Cookie Policy are effective when they are posted on this page.
              </p>
              
              <h2>8. Contact Us</h2>
              <p>
                If you have any questions about this Cookie Policy, please contact us at privacy@foodiefinder.com.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CookiePolicy;
