
// components/Navbar.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import { NAV_LINKS } from '../constants';
import { User } from '../types';

interface NavbarProps {
  currentUser: User | null;
  onLoginClick: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser, onLoginClick, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-700 p-4 fixed w-full z-40 shadow-lg">
      <div className="container mx-auto flex justify-between items-center flex-wrap">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold hover:text-blue-100 transition-colors duration-300">
          StudentPortal
        </Link>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex flex-grow justify-center">
          <ul className="flex space-x-6">
            {NAV_LINKS.map((link) => (
              (link.name === 'Profil' && !currentUser) ? null : (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-white hover:text-blue-100 transition-colors duration-300 text-lg font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              )
            ))}
          </ul>
        </div>

        {/* Auth/Search (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher..."
              className="pl-10 pr-4 py-2 rounded-full bg-blue-600 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300"
            />
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-blue-200"></i>
          </div>
          {currentUser ? (
            <div className="flex items-center space-x-2">
              <span className="text-white font-medium">Salut, {currentUser.name.split(' ')[0]}!</span>
              <Button onClick={onLogout} variant="secondary" size="sm" className="bg-blue-800 hover:bg-blue-900 text-white">
                Déconnexion
              </Button>
            </div>
          ) : (
            <Button onClick={onLoginClick} variant="secondary" size="sm">
              Connexion / Inscription
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-blue-700 shadow-lg py-4 transition-all duration-300 ease-in-out">
          <ul className="flex flex-col items-center space-y-4">
            {NAV_LINKS.map((link) => (
              (link.name === 'Profil' && !currentUser) ? null : (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-white hover:text-blue-100 transition-colors duration-300 text-lg font-medium"
                    onClick={toggleMenu}
                  >
                    {link.name}
                  </Link>
                </li>
              )
            ))}
            <li className="w-full px-4 pt-2">
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-blue-600 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <i className="fas fa-search absolute left-7 top-1/2 -translate-y-1/2 text-blue-200"></i>
            </li>
            <li className="w-full px-4 pb-2">
              {currentUser ? (
                <div className="flex flex-col items-center space-y-2">
                  <span className="text-white font-medium">Salut, {currentUser.name.split(' ')[0]}!</span>
                  <Button onClick={onLogout} variant="secondary" size="md" className="w-full bg-blue-800 hover:bg-blue-900 text-white">
                    Déconnexion
                  </Button>
                </div>
              ) : (
                <Button onClick={() => { onLoginClick(); toggleMenu(); }} variant="secondary" size="md" className="w-full">
                  Connexion / Inscription
                </Button>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
