<template>
    <div class="container mt-4">
      <h1 class="mb-4">Clients</h1>
  
      <!-- Add New Client Button -->
      <div class="mb-3">
        <button @click="addNewClient" class="btn btn-primary">Add New Client</button>
      </div>
  
      <!-- Clients List -->
      <ul v-if="clients.length" class="list-group">
        <li v-for="client in clients" :key="client.id" class="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <strong> ID: </strong> {{ client.id }}
            <strong>CIN:</strong> {{ client.cin }}
            <br />
            <strong>Name:</strong> {{ client.nom }} {{ client.prenom }}
          </div>
  
          <!-- Action Buttons -->
          <div>
            <button @click="editClient(client.id)" class="btn btn-warning btn-sm me-2">Edit</button>
            <button @click="deleteClient(client.id)" class="btn btn-danger btn-sm me-2">Delete</button>
            <button @click="showLinkedComptes(client.id)" class="btn btn-info btn-sm">View Comptes</button>
          </div>
        </li>
      </ul>
  
      <!-- No Clients Message -->
      <p v-else class="text-center mt-4">No clients available.</p>
    </div>
  </template>
  
  <script>
  import clientService from '../services/clientService';
  
  export default {
    data() {
      return {
        clients: [],  // List of clients to display
      };
    },
    created() {
      this.fetchClients();  // Fetch clients when component is created
    },
    methods: {
      // Fetch all clients from the server
      fetchClients() {
        clientService.findAll()
          .then(response => {
            this.clients = response;  // Set the response to the clients array
            console.log(this.clients);  // Debug: check if clients are loaded properly
          })
          .catch(error => {
            console.error('Error fetching clients:', error);  // Log any error
          });
      },
  
      // Add a new client (navigate to the edit page)
      addNewClient() {
        this.$router.push({ name: 'EditClient', params: { id: null } });
      },
  
      // Edit an existing client (navigate to the edit page for that client)
      editClient(id) {
        this.$router.push({ name: 'EditClient', params: { id } });
      },
  
      // Delete a client
      deleteClient(id) {
        clientService.delete(id)
          .then(() => {
            this.fetchClients();  // Reload the list of clients after deletion
          })
          .catch(error => {
            console.error('Error deleting client:', error);  // Log any error
          });
      },
  
      // Show linked comptes for the selected client
      showLinkedComptes(id) {
        this.$router.push({ name: 'LinkedComptes', params: { id } });
      },
    },
  };
  </script>
  