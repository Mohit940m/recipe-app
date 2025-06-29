
import React, { useState } from 'react';
import RecipeService from '../services/recipe.service';

const HomePage = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [saveMessage, setSaveMessage] = useState('');

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

  const handleSaveRecipe = (recipeToSave) => {
    setSaveMessage('Saving...');

    // Map the fields from the Gemini response to what the backend schema expects
    const recipeData = {
      title: recipeToSave.recipeTitle,
      preparationTime: recipeToSave.estimatedPreparationTime,
      instructions: recipeToSave.stepByStepInstructions,
      ingredients: recipeToSave.requiredIngredients,
    };

    RecipeService.saveRecipe(recipeData).then(
      () => {
        setSaveMessage(`Recipe "${recipeData.title}" saved successfully!`);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setSaveMessage(`Error saving recipe: ${resMessage}`);
      }
    );
  };


  return (
    <div>
      <form onSubmit={handleGenerate}>
        <div className="form-group">
          <label htmlFor="ingredients">Ingredients (comma separated)</label>
          <input
            type="text"
            className="form-control"
            name="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <button className="btn btn-primary btn-block" disabled={loading}>
            {loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            <span>Generate Recipes</span>
          </button>
        </div>
      </form>

      {recipes.length > 0 && (
        <div className="row">
          {recipes.map((recipe, index) => (
            <div className="col-md-6 mb-4" key={index}>
              <div className="card h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{recipe.recipeTitle}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {recipe.estimatedPreparationTime}
                  </h6>
                  <p className="card-text">
                    <strong>Instructions:</strong> {recipe.stepByStepInstructions}
                  </p>
                  <p className="card-text">
                    <strong>Ingredients:</strong> {recipe.requiredIngredients.join(', ')}
                  </p>
                  {recipe.funCookingTip && (
                    <p className="card-text"><em><strong>Tip:</strong> {recipe.funCookingTip}</em></p>
                  )}
                  <button
                    className="btn btn-success mt-auto"
                    onClick={() => handleSaveRecipe(recipe)}
                  >
                    Save Recipe
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
