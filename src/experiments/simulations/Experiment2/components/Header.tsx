import React from 'react';
import { Zap } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-5 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Zap className="h-8 w-8 text-yellow-300" />
          <h1 className="text-2xl font-bold tracking-tight">Thévenin's Theorem Simulator</h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="#" className="hover:text-blue-200 transition-colors duration-200">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-200 transition-colors duration-200">
                Theory
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-200 transition-colors duration-200">
                Examples
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;