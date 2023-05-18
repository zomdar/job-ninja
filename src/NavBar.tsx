// src/NavBar.tsx

import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Bars3Icon } from "@heroicons/react/24/outline";
import AuthButtons from './AuthButtons';
import { useAuth0 } from "@auth0/auth0-react";
import { observer } from "mobx-react-lite";
import { useStores } from './stores';

export interface SavedItem {
  label: string;
  text: string;
  _id: number;
}

const NavBar: React.FC = observer(() => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth0();
  const { userStore } = useStores();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleChoiceClick = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      event.target instanceof Element &&
      !event.target.closest(".navbar-dropdown")
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const composeSubRoutes = ["/compose", "/compose/cover-letter", "/compose/resume", "/compose/questions"];

  return (
    <nav className="bg-subText py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/">
          <div className="bg-secondaryLight w-12 h-12 flex items-center justify-center rounded-full">
            {isAuthenticated ? (
              // <img className="w-12 h-12 flex items-center justify-center rounded-full" src={user?.picture} alt={user?.name} />
              <span className="text-l font-bold text-secondaryBase">{userStore.name.substring(0, 2).toUpperCase()}</span>
            ) : (
              <span className="text-l font-bold text-secondaryBase">JN</span>
            )}
          </div>
        </Link>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="text-secondaryLight focus:outline-none hover:text-secondaryBase"
          >
            <Bars3Icon className="h-9 w-9" />
          </button>
          {isOpen && (
            <div className="navbar-dropdown absolute right-0 mt-1 py-1 w-48 bg-white rounded shadow">
              <NavLink
                onClick={handleChoiceClick}
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "block px-4 py-2 text-secondaryBase hover:bg-indigo-100 font-bold"
                    : "block px-4 py-2 text-secondaryBase hover:bg-indigo-100"
                }
              >
                Home
              </NavLink>
              <NavLink
                onClick={handleChoiceClick}
                to="/profile"
                className={({ isActive }) =>
                  isActive
                    ? "block px-4 py-2 text-secondaryBase hover:bg-indigo-100 font-bold"
                    : "block px-4 py-2 text-secondaryBase hover:bg-indigo-100"
                }
              >
                Profile
              </NavLink>
              <NavLink
                onClick={handleChoiceClick}
                to="/compose/cover-letter"
                className={({ isActive }) =>
                  isActive || composeSubRoutes.includes(location.pathname)
                    ? "block px-4 py-2 text-secondaryBase hover:bg-indigo-100 font-bold"
                    : "block px-4 py-2 text-secondaryBase hover:bg-indigo-100"
                }
              >
                Compose
              </NavLink>
              <hr />
              <AuthButtons />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
});

export default NavBar;
