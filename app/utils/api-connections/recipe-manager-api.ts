import { unpackFetchedRecipes } from '../unpackFetched';
import { authenticatedAxios } from './authenicatedAxios';

export const recipeManagerApis = {
  postNewRecipe: async (recipeData: FormData, authToken: string) => {
    console.log('Create new recipe API called with: ', recipeData);
    const response = await authenticatedAxios(
      '/api/recipes/create_new',
      'POST',
      authToken,
      recipeData,
      'multipart/form-data' // Updated content type
    );
    console.log('Post New Recipe Response:', response);
  },
  updateExistingRecipe: async (recipeData: FormData, authToken: string) => {
    console.log('Edit recipe API called with: ', recipeData);
    const response = await authenticatedAxios(
      '/api/recipes/edit_recipe',
      'PUT',
      authToken,
      recipeData,
      'multipart/form-data' // Updated content type
    );
    console.log('Edit Existing Recipe Response: ', response);
  },
  getUserRecipes: async (userId: string, authToken: string) => {
    console.log('Fetch user recipes api called');
    try {
      const response = await authenticatedAxios(
        `api/recipes/recipes_by_user/${userId}`,
        'GET',
        authToken,
      );
      console.log('Get Recipes response: ', response);
      const unpackedRecipes = await unpackFetchedRecipes(response);
      return unpackedRecipes;
    } catch (error) {
      return error;
    }
  },
  deleteRecipe: async (recipeId: string, authToken: string) => {
    console.log('Delete recipe api called for recipe id: ', recipeId);
    const response = await authenticatedAxios(
      `api/recipes/delete_recipe/${recipeId}`,
      'DELETE',
      authToken,
    );
    console.log('Delete recipe response: ', response);
  },
};
