// src/App.tsx

import React from 'react';
import './tailwind.css';
import NavBar from './NavBar';
import Home from './Home';
import Compose from './Compose';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App bg-draculaBackground text-draculaForeground min-h-screen">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/compose" element={<Compose />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
