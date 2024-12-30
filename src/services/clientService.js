import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/clients',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  async findAll() {
    try {
            const response = await apiClient.get() // Ensure this returns the list of comptes
                ;
            console.log('response.data', response.data); // Log the response data
            return response.data;
        } catch (error) {
            console.error('Error fetching comptes:', error); // Log the error for better debugging
            throw error;
        }
  },
  
};
