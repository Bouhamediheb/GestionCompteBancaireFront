import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/login',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  login(login) {
    return apiClient.post('', login).then(response => {
      if (response.status === 200) {
        // Assuming the API sends a token on successful login
        localStorage.setItem('isLoggedIn', true); // Save login state to localStorage
        // You can also save a token: localStorage.setItem('token', response.data.token);
      }
      return response;
    });
  },
};
