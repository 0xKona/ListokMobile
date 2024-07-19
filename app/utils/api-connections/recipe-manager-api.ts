import axios from 'axios';
import * as config from '@root/config/config.json';
import { unpackFetchedRecipes } from '../unpackFetchedRecipes';

const authenticatedAxios = async (
  apiURL: string,
  method: string,
  authToken: string,
  data?: string,
) => {
  try {
    const response = await axios({
      baseURL: config.serverURL,
      url: apiURL,
      data,
      method,
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('Response from API:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error making API call:', error);
  }
};

export const recipeManagerApis = {
  postNewRecipe: async (recipeData: string, authToken: string) => {
    console.log('Create new recipe api called');
    const response = await authenticatedAxios(
      '/api/recipes/create_new',
      'POST',
      authToken,
      recipeData,
    );
    console.log('Post New Recipe Response:', response);
  },
  updateExistingRecipe: async (recipeData: string, authToken: string) => {
    console.log('Edit recipe api called.');
    const response = await authenticatedAxios(
      '/api/recipes/edit_recipe',
      'PUT',
      authToken,
      recipeData,
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
