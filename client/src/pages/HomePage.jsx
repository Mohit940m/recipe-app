import React, { useState } from 'react';
import RecipeService from '../services/recipe.service';
import './HomePage.css';

const HomePage = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saveMessages, setSaveMessages] = useState({});

  const handleGenerate = (e) => {
    e.preventDefault();
    setLoading(true);
    RecipeService.generateRecipe(ingredients.split(',')).then(
      (response) => {
        setRecipes(response.data);
        setLoading(false);
      },
      (error) => {
        console.log(error);
        setLoading(false);
      }
    );
  };

  const handleSaveRecipe = (recipeToSave, index) => {
    setSaveMessages(prev => ({ ...prev, [index]: 'Saving...' }));
    
    const recipeData = {
      title: recipeToSave.recipeTitle,
      preparationTime: recipeToSave.estimatedPreparationTime,
      instructions: recipeToSave.stepByStepInstructions,
      ingredients: recipeToSave.requiredIngredients,
    };

    RecipeService.saveRecipe(recipeData).then(
      () => {
        setSaveMessages(prev => ({ ...prev, [index]: `Saved!` }));
        setTimeout(() => setSaveMessages(prev => ({ ...prev, [index]: null })), 3000);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setSaveMessages(prev => ({ ...prev, [index]: `Error: ${resMessage}` }));
        setTimeout(() => setSaveMessages(prev => ({ ...prev, [index]: null })), 5000);
      }
    );
  };

  return (
    <div className="homepage">
      <header className="hero-section">
        <h1>Find Your Next Favorite Recipe</h1>
        <p>Discover amazing recipes based on the ingredients you have.</p>
        <form onSubmit={handleGenerate} className="recipe-form">
          <input
            type="text"
            className="ingredient-input"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Enter ingredients (e.g., chicken, rice, broccoli)"
            required
          />
          <button type="submit" className="generate-btn" disabled={loading}>
            {loading ? 'Generating...' : 'Generate Recipes'}
          </button>
        </form>
      </header>

      {loading && <div className="loading-indicator"><h3>Generating delicious recipes...</h3></div>}
      
      {recipes.length > 0 && (
        <div className="recipes-grid">
          {recipes.map((recipe, index) => (
            <div className="recipe-card" key={index}>
              <h3>{recipe.recipeTitle}</h3>
              <p><strong>Prep time:</strong> {recipe.estimatedPreparationTime}</p>
              <p><strong>Instructions:</strong> {recipe.stepByStepInstructions}</p>
              <p><strong>Ingredients:</strong> {recipe.requiredIngredients.join(', ')}</p>
              {recipe.funCookingTip && (
                <p className="fun-tip"><strong>Tip:</strong> {recipe.funCookingTip}</p>
              )}
              <button
                className="save-btn"
                onClick={() => handleSaveRecipe(recipe, index)}
                disabled={saveMessages[index]}
              >
                {saveMessages[index] || 'Save Recipe'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;

