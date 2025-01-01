<template>
    <div class="container mt-4">
      <h1 class="mb-4">Clients</h1>
      
      <div class="mb-3">
        <button @click="addNewClient" class="btn btn-primary">Add New Client</button>
      </div>
      
      <ul v-if="clients.length" class="list-group">
        <li v-for="client in clients" :key="client.id" class="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <strong> ID: </strong> {{ client.id }}
            <strong>CIN:</strong> {{ client.cin }}
            <br />
            <strong>Name:</strong> {{ client.nom }} {{ client.prenom }}
          </div>
          
          <div>
            <button @click="editClient(client.id)" class="btn btn-warning btn-sm me-2">Edit</button>
            <button @click="confirmDelete(client.id)" class="btn btn-danger btn-sm me-2">Delete</button>
            <button @click="showLinkedComptes(client.id)" class="btn btn-info btn-sm">View Comptes</button>
          </div>
        </li>
      </ul>
      
      <p v-else class="text-center mt-4">No clients available.</p>
      
      <sweet-modal ref="confirmDeleteModal" :blocking="true">
        <div class="text-center">
          <h5>Are you sure you want to delete this client?</h5>
          <div class="mt-3">
            <button @click="deleteConfirmed" class="btn btn-danger me-2">Yes, Delete</button>
            <button @click="$refs.confirmDeleteModal.close()" class="btn btn-secondary">Cancel</button>
          </div>
        </div>
      </sweet-modal>
      
      <sweet-modal icon="success" ref="deletedClientAccount">
        <div class="mt-5">
          Client deleted successfully!
        </div>
      </sweet-modal>
    </div>
  </template>
  <script>
  import clientService from '../services/clientService';
  import { SweetModal } from "sweet-modal-vue-3";
  
  export default {
    components: {
      SweetModal,
    },
    data() {
      return {
        clients: [],
        clientToDelete: null, // Temporarily holds the ID of the client to be deleted
      };
    },
    created() {
      this.fetchClients();
    },
    methods: {
      fetchClients() {
        clientService.findAll()
          .then(response => {
            this.clients = response.data;
          })
          .catch(error => {
            console.error('Error fetching clients:', error);
          });
      },
      addNewClient() {
        this.$router.push({ name: 'EditClient', params: { id: null } });
      },
      editClient(id) {
        this.$router.push({ name: 'EditClient', params: { id } });
      },
      confirmDelete(id) {
        this.clientToDelete = id; // Store the ID of the client to be deleted
        this.$refs.confirmDeleteModal.open(); // Open the confirmation modal
      },
      deleteConfirmed() {
        if (!this.clientToDelete) return;
  
        clientService.delete(this.clientToDelete)
          .then(() => {
            this.fetchClients(); // Reload the client list
            this.$refs.confirmDeleteModal.close(); // Close the confirmation modal
            this.$refs.deletedClientAccount.open(); // Show success modal
            this.clientToDelete = null; // Clear the temporary ID
          })
          .catch(error => {
            console.error('Error deleting client:', error);
            this.$refs.confirmDeleteModal.close(); // Close the modal even if there's an error
          });
      },
      showLinkedComptes(id) {
        this.$router.push({ name: 'LinkedComptes', params: { id } });
      },
    },
  };
  </script>
  