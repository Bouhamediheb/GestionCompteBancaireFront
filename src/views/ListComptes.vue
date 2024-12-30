<template>
  <div class="container mt-4">
    <!-- Header -->
    <h1 class="mb-4">Accounts</h1>
    
    <!-- Search Bar -->
    <div class="mb-4">
      <input
        v-model="searchKey"
        class="form-control"
        type="text"
        placeholder="Search accounts by RIB or client name"
        @input="searchAccounts"
      />
    </div>
    
    <!-- Accounts List -->
    <ul class="list-group" v-if="comptes.length">
      <li v-for="compte in comptes" :key="compte.rib" class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <strong>RIB:</strong> {{ compte.rib }}
          <br />
          <strong>Solde:</strong> {{ compte.solde }} €
          <br />
          <strong>Client:</strong> {{ compte.client.nom }} {{ compte.client.prenom }}
          (CIN: {{ compte.client.cin }})
        </div>
        
        <!-- Action Buttons -->
        <div>
          <button @click="editCompte(compte.rib)" class="btn btn-warning btn-sm me-2">Edit</button>
          <button @click="deleteCompte(compte.rib)" class="btn btn-danger btn-sm me-2">Delete</button>
        </div>
      </li>
    </ul>
    
    <!-- No Accounts Message -->
    <p v-else class="text-center mt-4">No accounts found.</p>
  </div>
</template>


<script>
import compteService from '../services/compteService';

export default {
  data() {
    return {
      comptes: [],
      searchKey: '',
    };
  },
  created() {
    this.fetchComptes();
  },
  methods: {
    fetchComptes() {
      compteService.findAll()
        .then(response => {
          // Assuming response.data is the array of comptes
          this.comptes = response.data;
          console.log('Comptes loaded:', this.comptes);  // Check the data in the console
        })
        .catch(err => {
          console.error('Error fetching comptes:', err);  // Log any error that occurs
        });
    },
    deleteCompte(id) {
      compteService.delete(id).then(() => {
        this.fetchComptes();  // Reload the list of comptes after deletion
      });
    },
    searchAccounts() {
      compteService.search(this.searchKey).then(response => {
        this.comptes = response.data;
      });
    },
    editCompte(id) {
      this.$router.push({ name: 'EditCompte', params: { id } }); // Navigate to edit page
    },
  },
};
</script>

