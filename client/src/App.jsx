import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

import AuthService from './services/auth.service';

import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import HomePage from './pages/HomePage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

const AppContent = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const location = useLocation();

  // This effect runs when the component mounts and whenever the URL changes.
  // After a successful login, the navigation to '/profile' will trigger this
  // effect, which re-reads the user from localStorage and updates the state.
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
  }, [location]); // The dependency on `location` makes this reactive to navigation

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(null);
  };

  return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={'/'} className="navbar-brand">
            Recipe App
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={'/home'} className="nav-link">
                Home
              </Link>
            </li>

            {currentUser && (
              <li className="nav-item">
                <Link to={'/profile'} className="nav-link">
                  Profile
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/login" className="nav-link" onClick={logOut}>
                  Logout
                </Link>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to={'/login'} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={'/register'} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
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