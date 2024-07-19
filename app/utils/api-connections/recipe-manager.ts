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
    throw error;
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
  getUserRecipes: async (userId: string, authToken: string) => {
    console.log('Fetch user recipes api called');
    const response = await authenticatedAxios(
      `api/recipes/recipes_by_user/${userId}`,
      'GET',
      authToken,
    );
    console.log('Get Recipes response: ', response);
    const unpackedRecipes = unpackFetchedRecipes(response);
    return unpackedRecipes;
  },
};
