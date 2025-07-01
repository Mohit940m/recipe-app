import React, { useState } from 'react';
import RecipeService from '../services/recipe.service';
import './HomePage.css';
import { GiChickenOven, GiWheat, GiCheeseWedge, GiTomato, GiCarrot, GiFishCooked, GiMilkCarton } from 'react-icons/gi';
import { FaEgg } from 'react-icons/fa';
import { IoArrowBack } from 'react-icons/io5';

const HomePage = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saveMessages, setSaveMessages] = useState({});
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const frequentIngredients = [
    { label: 'Chicken', icon: <GiChickenOven /> },
    { label: 'Rice', icon: <GiWheat /> },
    { label: 'Cheese', icon: <GiCheeseWedge /> },
    { label: 'Tomato', icon: <GiTomato /> },
    { label: 'Carrot', icon: <GiCarrot /> },
    { label: 'Fish', icon: <GiFishCooked /> },
    { label: 'Eggs', icon: <FaEgg /> },
    { label: 'Milk', icon: <GiMilkCarton /> },
  ];

  const handleChipClick = (ingredient) => {
    let current = ingredients.trim();
    if (current.length === 0) {
      setIngredients(ingredient);
    } else {
      // Avoid duplicate commas and spaces
      const arr = current.split(',').map(s => s.trim()).filter(Boolean);
      if (!arr.includes(ingredient)) {
        setIngredients(arr.join(', ') + ', ' + ingredient);
      }
    }
  };

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
    <div className="homepage glass">
      <header className="hero-section glass">
        <h1>Find Your Next Favorite Recipe</h1>
        <p>Discover amazing recipes based on the ingredients you have.</p>
        <div className="frequent-ingredients">
          {frequentIngredients.map((item) => (
            <button
              type="button"
              className="ingredient-chip"
              key={item.label}
              onClick={() => handleChipClick(item.label)}
              tabIndex={0}
            >
              <span className="chip-icon">{item.icon}</span>
              <span className="chip-label">{item.label}</span>
            </button>
          ))}
        </div>
        <form onSubmit={handleGenerate} className="recipe-form">
          <input
            type="text"
            className="ingredient-input text-gray-800"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Enter ingredients (e.g., chicken, rice, broccoli)"
            required
          />
          <button type="submit" className="generate-btn glass" disabled={loading}>
            {loading ? 'Generating...' : 'Generate Recipes'}
          </button>
        </form>
      </header>

      {loading && <div className="loading-indicator"><h3>Generating delicious recipes...</h3></div>}
      
      {recipes.length > 0 && (
        <div className="recipes-grid">
          {recipes.map((recipe, index) => (
            <div
              className="recipe-card glass cursor-pointer hover:shadow-xl transition-shadow duration-200"
              key={index}
              onClick={() => { setSelectedRecipe(recipe); setSelectedIndex(index); }}
            >
              <h3>{recipe.recipeTitle}</h3>
              <p><strong>Prep time:</strong> {recipe.estimatedPreparationTime}</p>
              <p className="truncate"><strong>Instructions:</strong> {recipe.stepByStepInstructions}</p>
              <p><strong>Ingredients:</strong> {recipe.requiredIngredients.join(', ')}</p>
              {recipe.funCookingTip && (
                <p className="fun-tip"><strong>Tip:</strong> {recipe.funCookingTip}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Fullscreen Modal for Recipe */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-white/30">
          <div className="relative w-full max-w-2xl h-[90vh] mx-2 my-8 flex flex-col rounded-2xl shadow-2xl bg-white/70 backdrop-blur-lg border border-white/30 overflow-y-auto">
            {/* Back button always visible, top left, circular */}
            <button
              className="absolute top-20 left-4 text-gray-800 bg-gray-200 hover:bg-gray-300 rounded-full p-2 shadow-md focus:outline-none z-50 w-11 h-11 flex items-center justify-center"
              onClick={() => setSelectedRecipe(null)}
              aria-label="Back"
            >
              <IoArrowBack size={24} />
            </button>
            <div className="p-6 pt-28 flex-1 flex flex-col">
              <h2 className="text-2xl font-bold mb-2 text-gray-900">{selectedRecipe.recipeTitle}</h2>
              <p className="mb-2 text-gray-700"><strong>Prep time:</strong> {selectedRecipe.estimatedPreparationTime}</p>
              <div className="mb-2 text-gray-700">
                <strong>Instructions:</strong>
                <div className="whitespace-pre-line break-words mt-1">{selectedRecipe.stepByStepInstructions}</div>
              </div>
              <div className="mb-2 text-gray-700">
                <strong>Ingredients:</strong>
                <div>{selectedRecipe.requiredIngredients.join(', ')}</div>
              </div>
              {selectedRecipe.funCookingTip && (
                <div className="italic text-green-700 mb-2"><strong>Tip:</strong> {selectedRecipe.funCookingTip}</div>
              )}
              <button
                className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow"
                onClick={() => handleSaveRecipe(selectedRecipe, selectedIndex)}
                disabled={saveMessages[selectedIndex]}
              >
                {saveMessages[selectedIndex] || 'Save Recipe'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
