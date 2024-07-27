import axios from 'axios';
import * as config from '@root/config/config.json';

export const authenticatedAxios = async (
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
