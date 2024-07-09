import axios from 'axios';
import config from '@root/config/config.json';

const authenticatedAxios = async (
  apiURL: string,
  method: string,
  data: string,
  authToken: string,
) => {
  await axios({
    baseURL: config.serverURL,
    url: apiURL,
    data,
    method,
    headers: { authToken },
  });
};

export const recipeManagerApis = {
  postNewRecipe: async (recipeData: string, authToken: string) => {
    await authenticatedAxios(
      '/api/recipes/create_new',
      'POST',
      recipeData,
      authToken,
    );
  },
};
