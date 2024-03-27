import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import Dashboard from './Dashboard';

// Mock the FetchRecipe component
jest.mock('./FetchRecipe', () => () => ({
  recipeData: null,
  loading: false,
  error: null,
  fetchData: jest.fn(),
}));

describe('Dashboard', () => {
  test('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<Dashboard />);
    expect(getByText('Recipe Dashboard')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter Ingredient name')).toBeInTheDocument();
  });

  test('searches for recipes', async () => {
    const { getByText, getByPlaceholderText } = render(<Dashboard />);
    const searchInput = getByPlaceholderText('Enter Ingredient name');
    const searchButton = getByText('Search');

    await act(async () => {
      fireEvent.change(searchInput, { target: { value: 'chicken' } });
      fireEvent.click(searchButton);
    });

    await waitFor(() => expect(getByText('Loading...')).toBeInTheDocument());
  });

  test('adds ingredient to search history when searched', async () => {
    const { getByText, getByPlaceholderText } = render(<Dashboard />);
    const searchInput = getByPlaceholderText('Enter Ingredient name');
    const searchButton = getByText('Search');

    await act(async () => {
      fireEvent.change(searchInput, { target: { value: 'tomato' } });
      fireEvent.click(searchButton);
    });

    expect(getByText('tomato')).toBeInTheDocument();
  });

  test('shows favorites when "Show Favorites" button is clicked', async () => {
    const { getByText, queryByText } = render(<Dashboard />);
    const showFavoritesButton = getByText('Show Favorites');

    fireEvent.click(showFavoritesButton);
    expect(getByText('Hide Favorites')).toBeInTheDocument();

    // Check if favorites are displayed
    expect(queryByText('Favorite Recipes:')).toBeInTheDocument();
  });

  test('toggles recipe details when "View More" button is clicked', async () => {
    const { getByText } = render(<Dashboard />);
    const viewMoreButton = getByText('View More');

    fireEvent.click(viewMoreButton);
    expect(getByText('View Less')).toBeInTheDocument();

    // Check if recipe details are displayed
    expect(getByText('Ingredients:')).toBeInTheDocument();
    expect(getByText('Total Time:')).toBeInTheDocument();
    expect(getByText('Servings:')).toBeInTheDocument();
    expect(getByText('Full Recipe')).toBeInTheDocument();

    fireEvent.click(getByText('View Less'));
    expect(getByText('View More')).toBeInTheDocument();
  });
});
