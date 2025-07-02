import axios from 'axios';

// ✅ Ensure base URL has no trailing slash, then add /users/
const API_URL = import.meta.env.VITE_API_URL.replace(/\/+$/, '') + '/users/';

/**
 * Register a new user
 * @param {string} username 
 * @param {string} email 
 * @param {string} password 
 */
const register = (username, email, password) => {
  return axios.post(API_URL + 'register', {
    username,
    email,
    password,
  });
};

/**
 * Login user and store token
 * @param {string} email 
 * @param {string} password 
 */
const login = (email, password) => {
  return axios
    .post(API_URL + 'login', {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    });
};

/**
 * Logout user by removing from localStorage
 */
const logout = () => {
  localStorage.removeItem('user');
};

/**
 * Get the currently logged in user from localStorage
 */
const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
