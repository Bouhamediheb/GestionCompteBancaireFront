<template>
  <div class="container mt-4">
    <h1 class="mb-4">Comptes Linked to Client</h1>
    
    <div class="mb-3">
      <button @click="$router.push({ name: 'ListClients' })" class="btn btn-secondary">
        Back to Clients
      </button>
    </div>

    <ul v-if="comptes.length" class="list-group">
      <li v-for="compte in comptes" :key="compte.rib" class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <strong>RIB:</strong> {{ compte.rib }}
        </div>
        <div>
          <strong>Solde:</strong> {{ compte.solde }} TND
        </div>
      </li>
    </ul>
    
    <p v-else class="text-center mt-4">No comptes linked to this client.</p>
  </div>
</template>

<script>
import compteService from '../services/compteService';
import clientService from '../services/clientService';

export default {
  data() {
    return {
      comptes: [], 
    };
  },
  created() {
    const clientId = this.$route.params.id; 
    this.fetchComptes(clientId); 
  },
  methods: {
    fetchComptes(clientId) {
      clientService.findLinkedComptes(clientId) // Call the service to fetch linked comptes for the client
        .then(response => {
          this.comptes = response.data;  // Set the fetched comptes data
          console.log('Fetched comptes:', this.comptes);  
        })
        .catch(error => {
          console.error('Error fetching comptes:', error); 
        });
    },
  },
};
</script>
