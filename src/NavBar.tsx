// src/NavBar.tsx

import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <nav className="bg-draculaSelection py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/">
          <img
            src={`${process.env.PUBLIC_URL}/images/ninja_logo.png`}
            alt="Ninja Logo"
            className="w-10 h-10"
          />
        </Link>
        <ul className="flex">
          <li className="mx-2">
            <Link to="/" className="text-draculaForeground font-semibold">
              Home
            </Link>
          </li>
          <li className="mx-2">
            <Link
              to="/other-page"
              className="text-draculaForeground font-semibold"
            >
              Compose
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
