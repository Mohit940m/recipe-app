import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import AuthService from './services/auth.service';

import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import HomePage from './pages/HomePage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import CardPage from './pages/CardPage.jsx';

const AppContent = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const location = useLocation();

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
  }, [location]);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(null);
  };

  return (
    <div className="fullscreen">
      <Navbar currentUser={currentUser} logOut={logOut} />
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/card/:id" element={<CardPage />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;