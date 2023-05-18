// src/App.tsx

import React from 'react';
import './tailwind.css';
import NavBar from './NavBar';
import Home from './Home';
import Profile from './Profile';
import Compose from './Compose';
import CoverLetter from "./CoverLetter";
import Questions from "./Questions";
import Resume from "./Resume";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { StoreProvider } from './stores';
import RootComponent from './RootComponent';

const App: React.FC = () => {
  return (
    <StoreProvider>
      <Router>
        <div className="App bg-darkBackgroundColor text-draculaForeground min-h-screen">
          <RootComponent>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path='/profile' element={<Profile />} />
              <Route path="/compose" element={<Compose />}>
                <Route index element={<CoverLetter />} />
                <Route path="cover-letter" element={<CoverLetter />} />
                <Route path="resume" element={<Resume />} />
                <Route path="questions" element={<Questions />} />
              </Route>
            </Routes>
          </RootComponent>
        </div>
      </Router>
    </StoreProvider>
  );
};

export default App;
