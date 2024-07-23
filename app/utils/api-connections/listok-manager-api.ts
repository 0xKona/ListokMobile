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
};
