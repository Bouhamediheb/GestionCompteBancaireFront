<template>
    <div class="container mt-4">
      <h1 class="mb-4">Create Client</h1>
      <form @submit.prevent="createClient" class="border p-4 rounded shadow-sm">
        
        <div class="mb-3">
          <label for="cin" class="form-label">CIN:</label>
          <input
            v-model="client.cin"
            id="cin"
            class="form-control"
            placeholder="Enter Client CIN"
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
          <button type="submit" class="btn btn-primary">Create Client</button>
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
    methods: {
      createClient() {
        clientService.save(this.client)
          .then(() => {
            this.$router.push({ name: 'ListClients' });
          })
          .catch(error => {
            console.error('Error creating client:', error);
          });
      },
    },
  };
  </script>
  