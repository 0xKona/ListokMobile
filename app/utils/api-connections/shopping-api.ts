import { IngredientType } from '@typed/recipe-types';
import { authenticatedAxios } from './authenicatedAxios';
import { fetchAdditionalItemsList } from '@redux/slices/shoppingManagerSlice';

export const shoppingListApis = {
  getIngredientsList: async (listokId: string, authToken: string) => {
    console.log(
      'Fetch ingredients list called with: ',
      `[${listokId}, ${authToken}]`,
    );
    const response = await authenticatedAxios(
      '/api/shopping/getlist',
      'POST',
      authToken,
      JSON.stringify({ listokId }),
    );
    return response.ingredients;
  },
  updateAdditionalItemsList: async (itemsList: IngredientType[], authToken: string) => {
    console.log('updateAdditionalItemsList API Called with token: ', authToken);
    const response = await authenticatedAxios(
      '/api/shopping/updateAdditionalItems',
      'POST',
      authToken,
      itemsList
    );
    return response;
  },
  fetchAdditionalItemsList: async (authToken: string) => {
    console.log('fetchAdditionalItemsList API Called with token: ', authToken);
    const response = await authenticatedAxios(
      '/api/shopping/fetchAdditionalItems',
      'GET',
      authToken
    );
    return response;
  },
};
