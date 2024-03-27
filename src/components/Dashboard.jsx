import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import FetchRecipe from './FetchRecipe';
import './Dashboard.css';

function Dashboard() {
  const { recipeData, loading, error, fetchData } = FetchRecipe();
  const [ingredient, setIngredient] = useState("walnut");
  const [searchHistory, setSearchHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const handleSearch = () => {
    fetchData(ingredient);
    setSearchHistory([...searchHistory, ingredient]);
  };

  useEffect(() => {
    fetchData(ingredient);
  }, [ingredient]);

  const addToFavorite = (recipe) => {
    if (!favorites.some((fav) => fav.label === recipe.label)) {
      setFavorites([...favorites, recipe]);
    }
  };

  const removeFromFavorite = (recipeLabel) => {
    setFavorites(favorites.filter((fav) => fav.label !== recipeLabel));
  };

  const handleSearchHistoryClick = (item) => {
    setIngredient(item);
    handleSearch();
  };

  return (
    <div className="dashboard-container">
      <Link to="/" className="home-link">Home</Link> {/* Home button */}
      <h1>Recipe Dashboard</h1>
      <div className="search-history">
        <h2>Search History:</h2>
        <ul>
          {searchHistory.map((item, index) => (
            <li key={index} onClick={() => handleSearchHistoryClick(item)}>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={() => setShowFavorites(!showFavorites)}>{showFavorites ? "Hide Favorites" : "Show Favorites"}</button>
      {showFavorites && favorites.length > 0 && (
        <div className="favorites">
          <h2>Favorite Recipes:</h2>
          <ul>
            {favorites.map((recipe, index) => (
              <li key={index}>
                {recipe.label}
                <button onClick={() => removeFromFavorite(recipe.label)}>Remove from Favorites</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {recipeData && (
        <div className="recipe-container">
          <RecipeCardList recipes={recipeData} ingredient={ingredient} setIngredient={setIngredient} handleSearch={handleSearch} addToFavorite={addToFavorite} />
        </div>
      )}
    </div>
  );
}

function RecipeCardList({ recipes, ingredient, setIngredient, handleSearch, addToFavorite }) {
  return (
    <div className='dashboard'>
      <div className='dashboard-search'>
        <input
          type="text"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          placeholder="Enter Ingredient name"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="recipe-cards">
        {recipes.hits.map((hit, index) => (
          <RecipeCard key={index} recipe={hit.recipe} addToFavorite={addToFavorite} />
        ))}
      </div>
    </div>
  );
}

function RecipeCard({ recipe, addToFavorite }) {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="recipe-card">
      <img src={recipe.image} alt={recipe.label} />
      <h2>{recipe.label}</h2>
      <p>Health Labels: {recipe.healthLabels.join(', ').substring(1)}</p>
      <button onClick={toggleDetails}>{showDetails ? "View Less" : "View More"}</button>
      <button onClick={() => addToFavorite(recipe)}>Add to Favorite</button>
      {showDetails && (
        <div className="popup-overlay">
          <span className="close-btn" onClick={toggleDetails}>X</span>
          <div>
            <h3>Ingredients:</h3>
            <ul>
              {recipe.ingredientLines.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <p>Total Time: {recipe.totalTime}</p>
            <p>Servings: {recipe.yield}</p>
            <a href={recipe.url} target="_blank" rel="noopener noreferrer">Full Recipe</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
