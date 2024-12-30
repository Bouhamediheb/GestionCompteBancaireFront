import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/comptes',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  findAll() {
    return apiClient.get();
  },
  findByClientCin(clientCin) {
    return apiClient.get(`/client/${clientCin}`); // Adjust endpoint if needed
  },
  save(compte) {
    return apiClient.post('/saveCompte', compte, {
      headers: {
        'Content-Type': 'application/json',  // Ensure this header is set
      },
    });
  },
  
  delete(rib) {
    return apiClient.delete(`/${rib}`);
  },
};
