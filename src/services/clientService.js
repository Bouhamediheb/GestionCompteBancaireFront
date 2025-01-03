import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/clients',
  headers: {
    'Content-Type': 'application/json',

  },
});

export default {
  findAll() {
    return apiClient.get('');
  },
  findById(id) {
    return apiClient.get(`/${id}`);
  },
  findLinkedComptes(id) {
    return apiClient.get(`/${id}/comptes`); 
  },
  save(client) {
    return apiClient.post('/save', client);
  },
  update(id, client) {
    return apiClient.put(`/${id}`, client);
  },
  delete(id) {
    return apiClient.delete(`/${id}`);
  },
  search(query) {
    return apiClient.get(`/search`, { params: { name: query } });
  },
};
