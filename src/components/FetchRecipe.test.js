import { renderHook, act } from '@testing-library/react-hooks';
import FetchRecipe from './FetchRecipe';

describe('FetchRecipe', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('fetches recipe data successfully', async () => {
    const mockData = { hits: [{ recipe: { label: 'Test Recipe' } }] };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const { result, waitForNextUpdate } = renderHook(() => FetchRecipe());

    act(() => {
      result.current.fetchData('rice');
    });

    expect(result.current.loading).toBeTruthy();

    await waitForNextUpdate();

    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeNull();
    expect(result.current.recipeData).toEqual(mockData);
  });

  test('handles fetch error', async () => {
    fetch.mockRejectedValueOnce(new Error('Failed to fetch'));

    const { result, waitForNextUpdate } = renderHook(() => FetchRecipe());

    act(() => {
      result.current.fetchData('rice');
    });

    expect(result.current.loading).toBeTruthy();

    await waitForNextUpdate();

    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toEqual(new Error('Failed to fetch'));
    expect(result.current.recipeData).toBeNull();
  });
});
