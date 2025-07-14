import React from 'react';
import { Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>© 2025 Thévenin's Theorem Simulator</p>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href="#" 
              className="hover:text-white transition-colors duration-200 flex items-center"
            >
              <Github className="h-5 w-5 mr-1" />
              <span>Source</span>
            </a>
            <a href="#" className="hover:text-white transition-colors duration-200">
              References
            </a>
            <a href="#" className="hover:text-white transition-colors duration-200">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;