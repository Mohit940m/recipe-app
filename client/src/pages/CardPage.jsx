import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import RecipeService from '../services/recipe.service';
import Card from '../components/Card';
import ConfirmDialog from '../components/ConfirmDialog';
import './CardPage.css';

const CardPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      // Reset states on new fetch
      setLoading(true);
      setError(null);
      try {
        const response = await RecipeService.getRecipeById(id);
        setRecipe(response.data);
      } catch (err) {
        console.error('Failed to fetch recipe:', err);
        const errorMessage =
          err.response?.status === 404
            ? 'Recipe not found.'
            : 'An error occurred while fetching the recipe.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  return (
    <div className="card-page-container"> 
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24, position: 'relative' }}>
        <button
          className="back-btn"
          onClick={() => navigate(-1)}
          aria-label="Back"
          style={{ position: 'static', marginRight: 16 }}
          onMouseEnter={() => document.body.classList.add('back-btn-glow')}
          onMouseLeave={() => document.body.classList.remove('back-btn-glow')}
        >
          <IoArrowBack />
        </button>
        <span style={{ flex: 1 }}></span>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : recipe ? (
        <div className={`card-wrapper${showConfirm ? ' blurred-bg' : ''}`} style={{ position: 'relative', transition: 'filter 0.2s', paddingTop: 0 }}>
          <Card recipe={recipe} showDetails={true} />
          <button
            className="delete-btn"
            style={{
              position: 'fixed',
              right: 32,
              bottom: 32,
              background: '#e53e3e',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '14px 28px',
              fontSize: '1.1rem',
              fontWeight: 600,
              boxShadow: '0 4px 16px rgba(229,62,62,0.18)',
              cursor: 'pointer',
              zIndex: 2000
            }}
            onClick={() => setShowConfirm(true)}
          >
            Delete
          </button>
        </div>
      ) : (
        <p>No recipe data available.</p>
      )}
      <ConfirmDialog
        open={showConfirm}
        title="Delete Recipe"
        message="Are you sure to delete the recipe?"
        onConfirm={() => {
          setShowConfirm(false);
          RecipeService.deleteRecipe(recipe._id).then(() => {
            navigate('/profile');
          });
        }}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
};

export default CardPage;
