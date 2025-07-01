import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeService from '../services/recipe.service';
import Card from '../components/Card';
import './ProfilePage.css';

const ProfilePage = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user's saved recipes on mount
    RecipeService.getSavedRecipes().then(
      (response) => {
        setRecipes(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const handleDelete = (id) => {
    RecipeService.deleteRecipe(id).then(
      () => {
        setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe._id !== id));
        if (activeCard === id) setActiveCard(null);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <div className="profile-container">
      <h3>My Saved Recipes</h3>
      {recipes.length > 0 ? (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center items-start">
          {recipes.map((recipe) => (
            <Card
              key={recipe._id}
              recipe={recipe}
              onClick={() => navigate(`/card/${recipe._id}`)}
              showDetails={false}
              onDelete={id => handleDelete(id)}
            />
          ))}
        </div>
      ) : (
        <p>You have no saved recipes.</p>
      )}
    </div>
  );
};

export default ProfilePage;