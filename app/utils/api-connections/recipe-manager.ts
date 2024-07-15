import axios from 'axios';
import * as config from '@root/config/config.json';

const authenticatedAxios = async (
  apiURL: string,
  method: string,
  data: string,
  authToken: string,
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
    console.log('create new api called');
    const response = await authenticatedAxios(
      '/api/recipes/create_new',
      'POST',
      recipeData,
      authToken,
    );
    console.log('Post New Recipe Response:', response);
  },
};
