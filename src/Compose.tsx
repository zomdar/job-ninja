// src/Compose.tsx

import React, { useState } from 'react';
import { NavLink, Route, Routes, Outlet } from 'react-router-dom';
import axios from 'axios';

const Compose: React.FC = () => {
    
    return (
        <div className="container flex-col p-4">
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
            <div className="flex space-x-4">
                <NavLink
                    to="cover-letter"
                    className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
                >
                    Cover Letter
                </NavLink>
                <NavLink
                    to="resume"
                    className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
                >
                    Resume
                </NavLink>
                <NavLink
                    to="questions"
                    className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
                >
                    Questions
                </NavLink>
            </div>
            <Outlet />
        </div>
    );
};

export default Compose;
