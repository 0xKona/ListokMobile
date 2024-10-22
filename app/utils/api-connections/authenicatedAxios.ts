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

    // Make the API request using Axios
    const response = await axios({
      baseURL: config.serverURL,
      url: apiURL,
      data,
      method,
      headers,
    });

    // Handle specific status codes
    if (response.status === 500) {
      console.log("Authenticated Axios received response status 500");
      throw new Error('Internal Server Error'); // Explicitly throw for 500
    }

    if (response.status === 401) {
      store.dispatch(logout());  // Logout only for 401 Unauthorized
      throw new Error('Unauthorized: You have been logged out.');
    }

    console.log('Response from API:', response.data); 
    return response.data;

  } catch (error: any) {
    // Check if the error is an AxiosError and handle specific statuses
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 500) {
        console.log("Internal Server Error (500) caught.");
        return new Error('Internal Server Error: Please try again later.');
      }

      if (error.response?.status === 401) {
        console.log("Unauthorized (401) caught, logging out.");
        store.dispatch(logout());  // Only log out for 401 status
        return new Error('Unauthorized: Please log in again.');
      }
    }

    // Handle any other errors
    console.error('Error making API call:', error);
    throw error;  // Throw other errors to be handled by caller
  }
};