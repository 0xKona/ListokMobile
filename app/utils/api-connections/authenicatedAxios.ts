import axios from 'axios';
import * as config from '@root/config/config.json';

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

    // Set the correct content-type based on the data type
    if (data instanceof FormData) {
      headers['Content-Type'] = 'multipart/form-data';
    } else {
      headers['Content-Type'] = 'application/json';
    }

    const response = await axios({
      baseURL: config.serverURL, // Ensure this is correctly pointing to your server URL
      url: apiURL,
      data,
      method,
      headers,
    });

    console.log('Response from API:', response.data); // Optional: Log the response for debugging
    return response.data;
  } catch (error) {
    console.error('Error making API call:', error);
    throw error; // Re-throw the error to be handled by the calling function
  }
};
