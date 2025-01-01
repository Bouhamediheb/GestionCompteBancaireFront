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
  findById(id) {
    return apiClient.get(`/${id}`);
  },
  save(compte) {
    return apiClient.post('/saveCompte', compte, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  update(rib, compte) {
    return apiClient.put(`/${rib}`, compte);
  },
  delete(rib) {
    return apiClient.delete(`/${rib}`);
  },
  update(rib, compte) {
    return apiClient.put(`/${rib}`, compte);
  },
};
