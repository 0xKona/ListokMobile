import { authenticatedAxios } from './authenicatedAxios';

export const imageApis = {
    uploadImage: async (formData: FormData, authToken: string) => {
      try {
        const response = await authenticatedAxios(
          '/api/images/upload', // Adjust the URL to match your backend route
          'POST',
          authToken,
          formData
        );
        return response; // Assuming the backend returns the image URL
      } catch (error) {
        console.error('Failed to upload image:', error);
        throw error;
      }
    },
  
    deleteImage: async (imageUrl: string, authToken: string) => {
      try {
        const response = await authenticatedAxios(
          '/api/images/delete', // Adjust the URL to match your backend route
          'DELETE',
          authToken,
          JSON.stringify({ imageUrl })
        );
        return response;
      } catch (error) {
        console.error('Failed to delete image:', error);
        throw error;
      }
    }
  };
