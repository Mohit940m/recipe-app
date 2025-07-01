import React from 'react';

const Card = ({ recipe, onClick, showDetails = false, onDelete }) => {
  return (
    <div
      className={`recipe-card${showDetails ? ' active' : ''}`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {/* Title Section */}
      <div className="card-title-section">
        <h5 className="card-title">{recipe.title}</h5>
      </div>
      {/* Grid Mode: Show summary */}
      {!showDetails && (
        <div className="card-summary">
          <div className="card-time">
            <span role="img" aria-label="clock">⏱️</span> {recipe.preparationTime} min
          </div>
          <div className="card-ingredients">
            <span className="card-ingredients-label">Ingredients:</span>
            <ul>
              {recipe.ingredients.slice(0, 3).map((ingredient, i) => (
                <li key={i}>{ingredient}</li>
              ))}
              {recipe.ingredients.length > 3 && <li>...</li>}
            </ul>
          </div>
        </div>
      )}
      {/* Details Mode: Show full details */}
      {showDetails && (
        <>
          <p><strong>Preparation Time:</strong> {recipe.preparationTime} minutes</p>
          <h6>Instructions</h6>
          <p>{recipe.instructions}</p>
          <h6>Ingredients</h6>
          <ul>
            {recipe.ingredients.map((ingredient, i) => (
              <li key={i}>{ingredient}</li>
            ))}
          </ul>
          {onDelete && (
            <button
              onClick={e => { e.stopPropagation(); onDelete(recipe._id); }}
              className="btn btn-danger"
            >Delete</button>
          )}
        </>
      )}
    </div>
  );
};

export default Card;
