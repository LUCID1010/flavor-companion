
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const TermsOfService: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 py-24">
        <div className="foodie-container">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-6 text-3xl font-bold text-gray-900">Terms of Service</h1>
            
            <div className="prose prose-foodie max-w-none">
              <p>Last updated: April 13, 2023</p>
              
              <h2>1. Introduction</h2>
              <p>
                Welcome to FoodieFinder ("we," "our," or "us"). These Terms of Service ("Terms") govern your use of the FoodieFinder website, mobile applications, and services (collectively, the "Service").
              </p>
              <p>
                By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the Terms, you may not access the Service.
              </p>
              
              <h2>2. Accounts</h2>
              <p>
                When you create an account with us, you must provide accurate, complete, and up-to-date information. You are responsible for safeguarding the password you use to access the Service and for any activities or actions under your password.
              </p>
              <p>
                You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
              </p>
              
              <h2>3. User Content</h2>
              <p>
                Our Service allows you to post, link, store, share, and otherwise make available certain information, text, graphics, videos, or other material ("User Content"). You are responsible for the User Content that you post on or through the Service, including its legality, reliability, and appropriateness.
              </p>
              <p>
                By posting User Content on or through the Service, you represent and warrant that: (i) the User Content is yours or you have the right to use it and grant us the rights and license as provided in these Terms, and (ii) the posting of your User Content does not violate the privacy rights, publicity rights, copyrights, contract rights, or any other rights of any person.
              </p>
              
              <h2>4. Reviews and Ratings</h2>
              <p>
                The Service may allow users to post reviews and ratings of restaurants. You agree to provide honest, accurate reviews based on your personal experience. We reserve the right to remove reviews that we determine, in our sole discretion, to be dishonest, malicious, or in violation of our policies.
              </p>
              
              <h2>5. Restaurant Information</h2>
              <p>
                We strive to provide accurate information about restaurants, including menus, prices, hours, and locations. However, we cannot guarantee the accuracy of all information. Restaurant details may change without notice, and we recommend contacting the restaurant directly to confirm information before visiting.
              </p>
              
              <h2>6. Intellectual Property</h2>
              <p>
                The Service and its original content, features, and functionality are and will remain the exclusive property of FoodieFinder and its licensors. The Service is protected by copyright, trademark, and other laws.
              </p>
              <p>
                Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of FoodieFinder.
              </p>
              
              <h2>7. Termination</h2>
              <p>
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
              <p>
                Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service or contact us to request account deletion.
              </p>
              
              <h2>8. Limitation of Liability</h2>
              <p>
                In no event shall FoodieFinder, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
              </p>
              
              <h2>9. Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.
              </p>
              <p>
                Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
              </p>
              
              <h2>10. Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. It is your responsibility to review these Terms periodically for changes. Your continued use of the Service following the posting of any changes to these Terms constitutes acceptance of those changes.
              </p>
              
              <h2>11. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at support@foodiefinder.com.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TermsOfService;
