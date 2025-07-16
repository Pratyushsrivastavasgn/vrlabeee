import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, BookOpen, TestTube, Info, Home, Cable } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-blue-900'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Cable className={`h-6 w-6 ${isScrolled ? 'text-blue-800' : 'text-yellow-400'}`} />
              <span className={`ml-2 text-xl font-bold ${isScrolled ? 'text-blue-900' : 'text-white'}`}>
                Analog Electronics Lab
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" icon={<Home size={18} />} label="Home" isScrolled={isScrolled} />
            <NavLink to="/experiments" icon={<TestTube size={18} />} label="Experiments" isScrolled={isScrolled} />
            <NavLink to="/about" icon={<Info size={18} />} label="About" isScrolled={isScrolled} />
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-md ${isScrolled ? 'text-blue-900' : 'text-white'} hover:bg-blue-800 hover:bg-opacity-20 focus:outline-none`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <MobileNavLink to="/" label="Home" icon={<Home size={18} />} />
            <MobileNavLink to="/experiments" label="Experiments" icon={<TestTube size={18} />} />
            <MobileNavLink to="/theory" label="Theory" icon={<BookOpen size={18} />} />
            <MobileNavLink to="/about" label="About" icon={<Info size={18} />} />
          </div>
        </div>
      )}
    </header>
  );
};

type NavLinkProps = {
  to: string;
  label: string;
  icon?: React.ReactNode;
  isScrolled: boolean;
};

const NavLink: React.FC<NavLinkProps> = ({ to, label, icon, isScrolled }) => (
  <Link 
    to={to} 
    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      isScrolled 
        ? 'text-blue-900 hover:bg-blue-100' 
        : 'text-gray-200 hover:text-white hover:bg-blue-800 hover:bg-opacity-30'
    }`}
  >
    {icon && <span className="mr-1.5">{icon}</span>}
    {label}
  </Link>
);

type MobileNavLinkProps = {
  to: string;
  label: string;
  icon?: React.ReactNode;
};

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, label, icon }) => (
  <Link 
    to={to} 
    className="flex items-center px-3 py-3 rounded-md text-base font-medium text-blue-900 hover:bg-blue-100"
    onClick={() => setIsMenuOpen(false)}
  >
    {icon && <span className="mr-2">{icon}</span>}
    {label}
  </Link>
);

export default Header;

function setIsMenuOpen(arg0: boolean): void {
  throw new Error('Function not implemented.');
}
