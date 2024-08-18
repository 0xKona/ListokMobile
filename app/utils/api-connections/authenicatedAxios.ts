import axios from 'axios';
import * as config from '@root/config/config.json';

export const authenticatedAxios = async (
  apiURL: string,
  method: string,
  authToken: string,
  data?: any,
  contentType: string = 'application/json',
) => {
  try {
    console.log(
      'authenticatedAxios call with following: ',
      `${JSON.stringify({
        baseURL: config.serverURL,
        url: apiURL,
        method,
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': contentType,
        },
      })}`
    );
    const response = await axios({
      baseURL: config.serverURL,
      url: apiURL,
      data,
      method,
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': contentType,
      },
    });
    console.log('Response from API:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error making API call:', error);
  }
};
