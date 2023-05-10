// src/Compose.tsx

import React, { useState } from 'react';
import { NavLink, Route, Routes, Outlet, useLocation } from 'react-router-dom';

const Compose: React.FC = () => {
  const location = useLocation();
  

  return (
    <div className="container mx-auto flex-col p-4">
      <div className="hero-text py-4">
        <h1
          className="text-4xl text-primaryBase font-extrabold"
          style={{
            textShadow:
              "0.000em 0.075em #7B66FA, 0.029em 0.069em #7B66FA, 0.053em 0.053em #7B66FA, 0.069em 0.029em #7B66FA, 0.075em 0.000em #7B66FA, 0.069em -0.029em #7B66FA, 0.053em -0.053em #7B66FA, 0.029em -0.069em #7B66FA, 0.000em -0.075em #7B66FA, -0.029em -0.069em #7B66FA, -0.053em -0.053em #7B66FA, -0.069em -0.029em #7B66FA, -0.075em -0.000em #7B66FA, -0.069em 0.029em #7B66FA, -0.053em 0.053em #7B66FA, -0.029em 0.069em #7B66FA",
          }}
        >
          Compose
        </h1>
      </div>
      <div className="flex font-bold text-sm">
        <NavLink
          to="cover-letter"
          className={({ isActive }) =>
            isActive || location.pathname === "/compose/cover-letter"
              ? "bg-secondaryBase text-white px-4 py-2 rounded-l-md"
              : "bg-secondaryLight text-secondaryBase px-4 py-2 rounded-l-md hover:bg-secondaryLightHover"
          }
        >
          COVER LETTER
        </NavLink>
        <NavLink
          to="resume"
          className={({ isActive }) =>
            isActive
              ? "bg-secondaryBase text-white px-4 py-2"
              : "bg-secondaryLight text-secondaryBase px-4 py-2 hover:bg-secondaryLightHover"
          }
        >
          RESUME
        </NavLink>
        <NavLink
          to="questions"
          className={({ isActive }) =>
            isActive
              ? "bg-secondaryBase text-white px-4 py-2 rounded-r-md"
              : "bg-secondaryLight text-secondaryBase px-4 py-2 rounded-r-md hover:bg-secondaryLightHover"
          }
        >
          QUESTIONS
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default Compose;
