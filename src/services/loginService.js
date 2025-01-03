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
        localStorage.setItem('isLoggedIn', true); 
      }
      return response;
    });
  },
};
