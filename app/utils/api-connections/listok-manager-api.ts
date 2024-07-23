import { unpackFetchedListoks } from '../unpackFetched';
import { authenticatedAxios } from './authenicatedAxios';

export const listokManagerApis = {
  postNewListok: async (listokData: string, authToken: string) => {
    console.log('Create new listok api called');
    const response = await authenticatedAxios(
      '/api/listoks/create_new_listok',
      'POST',
      authToken,
      listokData,
    );
    console.log('Post New Listok Response:', response);
  },
  updateExistingListok: async (listokData: string, authToken: string) => {
    console.log('Edit listok api called.');
    const response = await authenticatedAxios(
      '/api/listoks/edit_listok',
      'PUT',
      authToken,
      listokData,
    );
    console.log('Edit Existing Listok Response: ', response);
  },
  getUserListoks: async (userId: string, authToken: string) => {
    console.log('Fetch user listoks api called');
    try {
      const response = await authenticatedAxios(
        `api/listoks/get_listoks/user=${userId}`,
        'GET',
        authToken,
      );
      console.log('Get Listoks response: ', response);
      const unpackedRecipes = await unpackFetchedListoks(response);
      return unpackedRecipes;
    } catch (error) {
      return error;
    }
  },
  deleteListok: async (listokId: string, authToken: string) => {
    console.log('Delete listok api called for listok id: ', listokId);
    const response = await authenticatedAxios(
      `api/listoks/delete_listok/listok=${listokId}`,
      'DELETE',
      authToken,
    );
    console.log('Delete listok response: ', response);
  },
};
