import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-yellow-400" />
                <span>
                  Department of EEE<br />
                  SRM Institute of Science and Technology<br />
                  Kattankulathur, Chennai
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-yellow-400" />
                <span>+91 9791005919</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-yellow-400" />
                <span>eee.virtuallab@srm.edu.in</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-yellow-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/experiments" className="hover:text-yellow-400 transition-colors">Experiments</Link>
              </li>
                <li>
                <Link to="/about" className="hover:text-yellow-400 transition-colors">About Us</Link>
              </li>
              <li>
                <a href="https://srmist.edu.in" className="hover:text-yellow-400 transition-colors">SRM University</a>
              </li>
            </ul>
          </div>

          {/* About the Lab */}
          <div>
            <h3 className="text-lg font-bold mb-4">About Virtual Lab</h3>
            <p className="text-gray-300 mb-4">
              The Virtual Lab provides remote-access to simulations in various disciplines of 
              Electrical and Electronics Engineering. These simulations are designed for enhanced 
              learning and conceptual understanding.
            </p>
            <div className="flex items-center">
              <Globe className="h-5 w-5 mr-2 text-yellow-400" />
              <a href="https://srmist.edu.in" className="hover:text-yellow-400 transition-colors">Visit Main Website</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-blue-800 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} SRM Institute of Science and Technology. All rights reserved.</p>
          <p className="mt-2 text-xs">
            Need help? Contact us at{' '}
            <a href="mailto:eee.virtuallab@srm.edu.in" className="text-yellow-400 hover:text-yellow-300">
              eee.virtuallab@srm.edu.in
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;