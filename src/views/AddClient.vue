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
    <sweet-modal ref="successModal" icon="success">
      <div class="mt-5">
        <h5>Compte client créé avec succès !</h5>
      </div>
    </sweet-modal>
  </div>
</template>
<script>
import Client from '../models/Client';
import clientService from '../services/clientService';
import { SweetModal } from 'sweet-modal-vue-3';

export default {
  components: {
    SweetModal,
  },
  data() {
    return {
      client: new Client(null, '', '', ''),
    };
  },
  methods: {
    createClient() {
      const newClient = {
        cin: this.client.cin,
        nom: this.client.nom,
        prenom: this.client.prenom,
      };

      clientService.save(newClient)
        .then(() => {
          this.$refs.successModal.open();
          setTimeout(() => {
            this.$refs.successModal.close();
            this.$router.push({ name: 'ListClients' });
          }, 2000);
        })
        .catch(error => {
          console.error('Error creating client:', error);
        });
    },
  },
};
</script>
