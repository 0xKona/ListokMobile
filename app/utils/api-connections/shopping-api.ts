import { authenticatedAxios } from './authenicatedAxios';

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
    console.log('Fetch Shopping List:', response);
  },
};
