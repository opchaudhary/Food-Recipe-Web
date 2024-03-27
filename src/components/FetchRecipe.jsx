import { useState, useEffect } from 'react';

const FetchRecipe = () => {
    const [recipeData, setrecipeData] = useState(null);
    // const [ingredient, setIngredient] = useState('rice');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const BaseUrl = "https://api.edamam.com/api/recipes/v2";
    const token = "07beda73b72b13f86602bcb115347266";

    const fetchData = async (ingredient) => {
        try {
            setLoading(true);
            const response = await fetch(`${BaseUrl}?type=public&app_id=582e62db&app_key=${token}&q=${ingredient}`);
            const data = await response.json();
            setrecipeData(data);
            console.log("data", data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };
    return { recipeData, loading, error, fetchData };
};

export default FetchRecipe;