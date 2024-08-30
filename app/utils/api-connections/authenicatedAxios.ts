import axios from 'axios';
import * as config from '@root/config/config.json';
import { logout } from '@redux/slices/userSlice';
import { store } from '@redux/store';

export const authenticatedAxios = async (
  apiURL: string,
  method: string,
  authToken: string,
  data?: any
) => {

  try {
    const headers: any = {
      Authorization: `Bearer ${authToken}`,
    };

    if (data instanceof FormData) {
      headers['Content-Type'] = 'multipart/form-data';
    } else {
      headers['Content-Type'] = 'application/json';
    }

    const response = await axios({
      baseURL: config.serverURL,
      url: apiURL,
      data,
      method,
      headers,
    });

    if (response.status === 401) {
      store.dispatch(logout());
    }

    console.log('Response from API:', response.data); 
    return response.data;
  } catch (error) {
    console.error('Error making API call:', error);
    store.dispatch(logout());
    throw error; 
  }
};
