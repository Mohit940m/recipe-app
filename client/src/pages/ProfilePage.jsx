
import React, { useState, useEffect } from 'react';
import RecipeService from '../services/recipe.service';

const ProfilePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    RecipeService.getSavedRecipes().then(
      (response) => {
        setRecipes(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <div>
      <h3>My Saved Recipes</h3>
      {recipes.length > 0 ? (
        <div className="row">
          {recipes.map((recipe, index) => (
            <div className="col-md-6 mb-4" key={index}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{recipe.title}</h5>
                  <p className="card-text">
                    <strong>Preparation Time:</strong> {recipe.preparationTime}
                  </p>
                  <h6>Instructions</h6>
                  <p className="card-text">{recipe.instructions}</p>
                  <h6>Ingredients</h6>
                  <ul>
                    {recipe.ingredients.map((ingredient, i) => (
                      <li key={i}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
              </div>
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
