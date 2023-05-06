// src/NavBar.tsx

import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Bars3Icon } from '@heroicons/react/24/outline';

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleChoiceClick = () => {
    setIsOpen(false);
  };

  const getNavLinkClass = (isActive: boolean) => {
    return isActive ? 'block px-4 py-2 text-indigo-500 hover:bg-indigo-100 font-bold' : 'block px-4 py-2 text-indigo-500 hover:bg-indigo-100';
  };

  return (
    <nav className="bg-draculaSelection py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <div className="bg-white bg-indigo-300 w-12 h-12 flex items-center justify-center rounded-full">
            <span className="text-l font-bold text-indigo-600">WC</span>
          </div>
        </Link>
        <ul className="flex space-x-4">
          <li className="relative">
            <button
              onClick={toggleDropdown}
              className="text-indigo-500 focus:outline-none"
            >
              <Bars3Icon className='h-6 w-6'></Bars3Icon>
            </button>
            {isOpen && (
              <ul className="absolute right-0 mt-1 py-1 w-48 bg-white rounded shadow">
                <li>
                  <Link
                    onClick={handleChoiceClick}
                    to="/" 
                    className="block px-4 py-2 text-indigo-500 hover:bg-indigo-100">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={handleChoiceClick}
                    to="/compose"
                    className="block px-4 py-2 text-indigo-500 hover:bg-indigo-100"
                  >
                    Compose
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
