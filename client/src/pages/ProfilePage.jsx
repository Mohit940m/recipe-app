import React, { useState, useEffect } from 'react';
import RecipeService from '../services/recipe.service';
import './ProfilePage.css';

const ProfilePage = () => {
  const [recipes, setRecipes] = useState([]);

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
        <div className="recipes-grid">
          {recipes.map((recipe) => (
            <div className="recipe-card" key={recipe._id}>
              <h5>{recipe.title}</h5>
              <p><strong>Preparation Time:</strong> {recipe.preparationTime} minutes</p>
              <h6>Instructions</h6>
              <p>{recipe.instructions}</p>
              <h6>Ingredients</h6>
              <ul>
                {recipe.ingredients.map((ingredient, i) => (
                  <li key={i}>{ingredient}</li>
                ))}
              </ul>
              <button onClick={() => handleDelete(recipe._id)} className="btn btn-danger">Delete</button>
            </div>
          ))}
        </div>
      ) : (
        <p>You have no saved recipes.</p>
      )}
    </div>
  );
};

export default ProfilePage;