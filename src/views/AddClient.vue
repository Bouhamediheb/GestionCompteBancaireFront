<template>
  <div class="container mt-4">
    <h1 class="mb-4">Créer un client</h1>
    <form @submit.prevent="createClient" class="border p-4 rounded shadow-sm">
      <div class="mb-3">
        <label for="cin" class="form-label">CIN :</label>
        <input
          v-model="client.cin"
          id="cin"
          class="form-control"
          placeholder="Entrez le CIN du client"
          required
        />
      </div>
      <div class="mb-3">
        <label for="nom" class="form-label">Prénom :</label>
        <input
          v-model="client.nom"
          id="nom"
          class="form-control"
          placeholder="Entrez le prénom"
          required
        />
      </div>
      <div class="mb-3">
        <label for="prenom" class="form-label">Nom :</label>
        <input
          v-model="client.prenom"
          id="prenom"
          class="form-control"
          placeholder="Entrez le nom"
          required
        />
      </div>
      <div class="text-center">
        <button type="submit" class="btn btn-primary">Créer le client</button>
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
