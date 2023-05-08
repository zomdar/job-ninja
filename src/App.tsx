// src/App.tsx

import React from 'react';
import './tailwind.css';
import NavBar from './NavBar';
import Home from './Home';
import Compose from './Compose';
import CoverLetter from "./CoverLetter";
import Questions from "./Questions";
import Resume from "./Resume";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App bg-darkBackgroundColor text-draculaForeground min-h-screen">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/compose" element={<Compose />}>
            <Route index element={<CoverLetter />} />
            <Route path="cover-letter" element={<CoverLetter />} />
            <Route path="resume" element={<Resume />} />
            <Route path="questions" element={<Questions />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
