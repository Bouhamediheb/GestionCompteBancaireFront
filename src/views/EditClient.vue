<template>
  <div class="container mt-4">
    <h1 class="mb-4">Edit Client</h1>
    <form @submit.prevent="updateClient" class="border p-4 rounded shadow-sm">
      
      <div class="mb-3">
        <label for="cin" class="form-label">CIN:</label>
        <input
          v-model="client.cin"
          id="cin"
          class="form-control"
          :disabled="true"
          placeholder="Client CIN"
          required
        />
      </div>
      
      <div class="mb-3">
        <label for="nom" class="form-label">First Name:</label>
        <input
          v-model="client.nom"
          id="nom"
          class="form-control"
          placeholder="Enter First Name"
          required
        />
      </div>

      <div class="mb-3">
        <label for="prenom" class="form-label">Last Name:</label>
        <input
          v-model="client.prenom"
          id="prenom"
          class="form-control"
          placeholder="Enter Last Name"
          required
        />
      </div>

      <div class="text-center">
        <button type="submit" class="btn btn-primary">Update Client</button>
      </div>
    </form>
  </div>
</template>

<script>
import clientService from '../services/clientService';

export default {
  data() {
    return {
      client: {
        cin: '',
        nom: '',
        prenom: '',
      },
    };
  },
  created() {
    const id = this.$route.params.id;
    if (id) {
      this.fetchClient(id);
    }
  },
  methods: {
    fetchClient(id) {
      clientService.findById(id)
        .then(response => {
          this.client = response.data;
        })
        .catch(error => {
          console.error('Error fetching client:', error);
        });
    },
    updateClient() {
      clientService.update(this.client.id, this.client)
        .then(() => {
          this.$router.push({ name: 'ListClients' });
        })
        .catch(error => {
          console.error('Error updating client:', error);
        });
    },
  },
};
</script>
