<template>
    <div class="container mt-4">
      <h1 class="mb-4">Comptes Linked to Client</h1>
      
      <!-- Back Button -->
      <div class="mb-3">
        <button @click="$router.push({ name: 'ListClients' })" class="btn btn-secondary">
          Back to Clients
        </button>
      </div>
  
      <!-- List of Comptes -->
      <ul v-if="comptes.length" class="list-group">
        <li v-for="compte in comptes" :key="compte.rib" class="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <strong>RIB:</strong> {{ compte.rib }}
          </div>
          <div>
            <strong>Solde:</strong> {{ compte.solde }}
          </div>
        </li>
      </ul>
      
      <!-- No Comptes Message -->
      <p v-else class="text-center mt-4">No comptes linked to this client.</p>
    </div>
</template>

<script>
import compteService from '../services/compteService';

export default {
  data() {
    return {
      comptes: [], // List of comptes linked to the client
    };
  },
  created() {
    const clientId = this.$route.params.id; // Use the id from route parameters, not cin
    this.fetchComptes(clientId);  // Fetch comptes based on client id
  },
  methods: {
    fetchComptes(id) {
      compteService.findByClientId(id)
        .then(response => {
          this.comptes = response;  // Assign the returned data to comptes
        })
        .catch(error => {
          console.error('Error fetching comptes:', error);  // Handle errors
        });
    },
  },
};
</script>
