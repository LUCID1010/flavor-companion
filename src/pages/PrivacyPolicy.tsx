
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 py-24">
        <div className="foodie-container">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-6 text-3xl font-bold text-gray-900">Privacy Policy</h1>
            
            <div className="prose prose-foodie max-w-none">
              <p>Last updated: April 13, 2023</p>
              
              <h2>1. Introduction</h2>
              <p>
                At FoodieFinder, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, mobile application, and services (collectively, the "Service").
              </p>
              <p>
                Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the Service.
              </p>
              
              <h2>2. Information We Collect</h2>
              <h3>2.1 Personal Data</h3>
              <p>
                When you create an account or use certain features of our Service, we may collect personally identifiable information, such as:
              </p>
              <ul>
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number (optional)</li>
                <li>Profile picture (optional)</li>
                <li>Location data (when enabled)</li>
                <li>Dining preferences</li>
              </ul>
              
              <h3>2.2 Usage Data</h3>
              <p>
                We may also collect information on how the Service is accessed and used. This Usage Data may include:
              </p>
              <ul>
                <li>Your computer's Internet Protocol (IP) address</li>
                <li>Browser type and version</li>
                <li>Pages of our Service that you visit</li>
                <li>Time and date of your visit</li>
                <li>Time spent on those pages</li>
                <li>Unique device identifiers</li>
                <li>Other diagnostic data</li>
              </ul>
              
              <h3>2.3 Location Data</h3>
              <p>
                We may use and store information about your location if you give us permission to do so. We use this data to provide features such as finding nearby restaurants, calculating distance, and providing location-specific recommendations.
              </p>
              <p>
                You can enable or disable location services when you use our Service at any time through your device settings.
              </p>
              
              <h2>3. How We Use Your Information</h2>
              <p>
                We use the information we collect for various purposes, including:
              </p>
              <ul>
                <li>To provide and maintain our Service</li>
                <li>To notify you about changes to our Service</li>
                <li>To allow you to participate in interactive features when you choose to do so</li>
                <li>To provide customer support</li>
                <li>To gather analysis and valuable information to improve our Service</li>
                <li>To monitor the usage of our Service</li>
                <li>To detect, prevent, and address technical issues</li>
                <li>To provide personalized restaurant recommendations</li>
                <li>To process and manage your restaurant reviews</li>
              </ul>
              
              <h2>4. Disclosure of Your Information</h2>
              <p>
                We may disclose your information in the following situations:
              </p>
              <h3>4.1 Business Transactions</h3>
              <p>
                If we are involved in a merger, acquisition, or asset sale, your personal data may be transferred. We will provide notice before your personal data is transferred and becomes subject to a different Privacy Policy.
              </p>
              
              <h3>4.2 Law Enforcement</h3>
              <p>
                We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or a government agency).
              </p>
              
              <h3>4.3 Other Legal Requirements</h3>
              <p>
                We may disclose your information in the good faith belief that such action is necessary to:
              </p>
              <ul>
                <li>Comply with a legal obligation</li>
                <li>Protect and defend the rights or property of FoodieFinder</li>
                <li>Prevent or investigate possible wrongdoing in connection with the Service</li>
                <li>Protect the personal safety of users of the Service or the public</li>
                <li>Protect against legal liability</li>
              </ul>
              
              <h2>5. Data Security</h2>
              <p>
                The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.
              </p>
              
              <h2>6. Your Data Rights</h2>
              <p>
                You have certain rights regarding your personal data, including:
              </p>
              <ul>
                <li>The right to access, update, or delete the information we have on you</li>
                <li>The right to have your information corrected if it is inaccurate or incomplete</li>
                <li>The right to object to our processing of your personal data</li>
                <li>The right to request that we restrict the processing of your personal data</li>
                <li>The right to data portability</li>
              </ul>
              <p>
                To exercise these rights, please contact us at privacy@foodiefinder.com.
              </p>
              
              <h2>7. Children's Privacy</h2>
              <p>
                Our Service does not address anyone under the age of 18 ("Children"). We do not knowingly collect personally identifiable information from anyone under 18 years of age. If you are a parent or guardian and you are aware that your Child has provided us with personal data, please contact us. If we become aware that we have collected personal data from children without verification of parental consent, we take steps to remove that information from our servers.
              </p>
              
              <h2>8. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
              <p>
                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
              </p>
              
              <h2>9. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at privacy@foodiefinder.com.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
