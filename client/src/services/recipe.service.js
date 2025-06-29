
import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:5000/recipes/';

const generateRecipe = (ingredients) => {
  return axios.post(API_URL + 'generate', { ingredients }, { headers: authHeader() });
};

const saveRecipe = (recipe) => {
  return axios.post(API_URL, recipe, { headers: authHeader() });
};

const getSavedRecipes = () => {
  return axios.get(API_URL, { headers: authHeader() });
};

export default {
  generateRecipe,
  saveRecipe,
  getSavedRecipes,
};
