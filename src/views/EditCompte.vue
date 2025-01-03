<template>
  <div class="container mt-4">
    <h1 class="mb-4">Edit Account</h1>
    <form @submit.prevent="submitForm" class="border p-4 rounded shadow-sm">
      
      <div class="mb-3">
        <label for="rib" class="form-label">RIB:</label>
        <input
          v-model="compte.rib"
          id="rib"
          class="form-control"
          disabled
          placeholder="Enter RIB"
          required
        />
      </div>

      <div class="mb-3">
        <label for="solde" class="form-label">Solde:</label>
        <input
          v-model="compte.solde"
          id="solde"
          class="form-control"
          type="number"
          placeholder="Enter Solde"
          required
        />
      </div>

      <div class="mb-3" >
        <label for="client" class="form-label">Select Client:</label>
        <select v-model="compte.client" class="form-select" id="client" required disabled>
          <option v-for="client in clients" :key="client.id" :value="client">
            {{ client.nom }} {{ client.prenom }} (ID: {{ client.id }})
          </option>
        </select>
      </div>

      <div class="text-center">
        <button type="submit" class="btn btn-primary">
          {{ isEditMode ? 'Update Account' : 'Create Account' }}
        </button>
      </div>
    </form>

    <sweet-modal icon="success" ref="updatedCompte">
      <div class="mt-5">
        Account updated successfully!
      </div>
    </sweet-modal>
  </div>
</template>

<script>
import compteService from '../services/compteService';
import clientService from '../services/clientService';
import { SweetModal } from 'sweet-modal-vue-3';
import Compte from '../models/Compte';

export default {
  components: {
    SweetModal,
  },
  data() {
    return {
      compte: new Compte(null, 0, null),
      clients: [],
      isEditMode: false,
    };
  },
  created() {
    const id = this.$route.params.id;
    
      this.fetchCompte(id);
    
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
    fetchCompte(id) {
      compteService.findById(id)
        .then(response => {
          this.compte = response.data;
        })
        .catch(error => {
          console.error('Error fetching compte:', error);
        });
    },
    submitForm() {
      if (this.isEditMode) {
        compteService.update(this.compte.rib, this.compte)
          .then(() => {
            this.$refs.updatedCompte.open();
            setTimeout(() => {
              this.$refs.updatedCompte.close();
            }, 2000);
            setTimeout(() => {
              this.$router.push({ name: 'ListComptes' });
            }, 2000);
          })
          .catch(error => {
            console.error('Error updating compte:', error);
          });
      } else {
        compteService.save(this.compte)
          .then(() => {
            this.$refs.updatedCompte.open();
            setTimeout(() => {
              this.$refs.updatedCompte.close();
            }, 2000);
            setTimeout(() => {
              this.$router.push({ name: 'ListComptes' });
            }, 2000);
          })
          .catch(error => {
            console.error('Error creating compte:', error);
          });
      }
    },
  },
};
</script>
