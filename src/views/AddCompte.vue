<template>
  <div class="container mt-4">
    <h1 class="mb-4">Créer un compte bancaire pour un client</h1>
    <form @submit.prevent="createCompte" class="border p-4 rounded shadow-sm">
      
      <div class="mb-3">
        <label for="solde" class="form-label">Solde:</label>
        <input
          type="number"
          v-model="compte.solde"
          class="form-control"
          id="solde"
          placeholder="Entrez le solde du compte"
          required
        />
      </div>

      <div class="mb-3">
        <label for="client" class="form-label">Sélectionner un client:</label>
        <select v-model="compte.client" class="form-select" id="client" required>
          <option v-for="client in clients" :key="client.id" :value="client">
            {{ client.nom }} {{ client.prenom }} (ID: {{ client.id }})
          </option>
        </select>
      </div>

      <div class="text-center">
        <button type="submit" class="btn btn-primary">Ajouter le compte</button>
      </div>
    </form>

    <!-- Success Modal -->
    <sweet-modal ref="successModal" icon="success">
      <div class="mt-5">
        <h5>Compte bancaire créé avec succès !</h5>
      </div>
    </sweet-modal>
  </div>
</template>

<script>
import clientService from '../services/clientService';
import compteService from '../services/compteService';
import { SweetModal } from 'sweet-modal-vue-3';
import Compte from '../models/Compte';

export default {
  components: {
    SweetModal,
  },
  data() {
    return {
      compte: new Compte(null, 0, null),  // Initializing with an empty compte object
      clients: [],
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

    createCompte() {
      const newCompte = {
        solde: this.compte.solde,
        client: this.compte.client,
      };

      compteService.save(newCompte)
        .then(() => {
          this.$refs.successModal.open();
          setTimeout(() => {
            this.$refs.successModal.close();
          }, 2000);
          setTimeout(() => {
            this.$router.push({ name: 'ListComptes' });
          }, 2000);
        })
        .catch(error => {
          console.error('Error creating compte:', error);
        });
    },

    closeSuccessModal() {
      this.$refs.successModal.close();
      this.$router.push({ name: 'ListComptes' });
    }
  }
};
</script>
