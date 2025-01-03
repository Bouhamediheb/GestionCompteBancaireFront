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
    <sweet-modal icon="success" ref="updatedClientAccount">
      <div class="mt-5">
        Client updated successfully!
      </div>
    </sweet-modal>
  </div>
</template>

<script>
import clientService from '../services/clientService';
import { SweetModal } from "sweet-modal-vue-3";
import Client from '../models/Client';


export default {
  components: {
    SweetModal,
  },
  data() {
    return {
      client: new Client(null, '', '', ''),
    };
  },
  created() {
    const id = this.$route.params.id;
    if (id) {
      this.fetchClient(id);
    }
  },
  methods: {
    // Fetch client data based on the provided ID from the route parameters
    fetchClient(id) {
      clientService.findById(id)
        .then(response => {
          this.client = response.data; // Set the client data into the local state
        })
        .catch(error => {
          console.error('Error fetching client:', error);
        });
    },
    
    // Handle client update by sending the updated data to the backend
    updateClient() {
      clientService.update(this.client.id, this.client)
        .then(() => {
          // Show the success modal after updating the client
          this.$refs.updatedClientAccount.open();
          
          // Close the modal after 2 seconds and redirect to the clients list
          setTimeout(() => {
            this.$refs.updatedClientAccount.close();
          }, 2000);
          
          // Redirect to the clients list after the modal closes
          setTimeout(() => {
            this.$router.push({ name: 'ListClients' });
          }, 2500);
        })
        .catch(error => {
          console.error('Error updating client:', error);
        });
    },
  },
};
</script>
