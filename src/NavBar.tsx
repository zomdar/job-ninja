// src/NavBar.tsx

import React from 'react';

const NavBar: React.FC = () => {
  return (
    <nav className="bg-draculaBackground p-4 shadow-md">
      <div className="container mx-auto flex items-center">
      <img
          src={`${process.env.PUBLIC_URL}/images/ninja_logo.png`}
          alt="Ninja Logo"
          className="h-10 w-10"
        />
        <span className="text-draculaForeground text-xl font-bold ml-4">Job Ninja</span>
      </div>
    </nav>
  );
};

export default NavBar;
